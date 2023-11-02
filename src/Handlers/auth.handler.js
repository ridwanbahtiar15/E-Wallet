const {register, selectUsers, activating, blacklistToken, pin, createBalance, changePwd} = require("../Models/auth.model")
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const {jwtKey, issuerWho} = require("../Configs/environtment")
const {activateMail} = require("../Utils/activateMail")
const {resetPwdMail} = require("../Utils/forgetPasswordMail")
const db = require("../Configs/postgre");


const registerUser = async (req, res) => {
  const client = await db.connect();
    try {
      await client.query("begin");
        const {body} = req;
        const otp = Math.floor(100000 + Math.random() * 900000);
        const hashedPassword = await argon.hash(body.password);
        const data = await register(body, hashedPassword, otp);
        const createdUser = data.rows[0];
        const dataBalance = await createBalance(createdUser.id)
        const info = await activateMail({
          to: body.email,
          subject: "Email Activation",
          data: {
            username: body.name,
            activationLink: `https://e-wallet-by-fwg-16.vercel.app/auth?email=${body.email}&otp=${otp}`,
          }
        });
        await client.query("commit");
        res.status(201).json({
            msg: `User successfully created. Your ID = ${createdUser.id} with full name : ${createdUser.full_name}`,
            check: "Please check E-mail and activated"
          });
    } catch (error) {
    console.error(error);
    await client.query("rollback");
        res.status(500).json({
        msg: "Internal server error",
    });
  } finally {
    client.release();
  }
}
const activateUser = async (req, res) => {
  try {
    const {query} = req;
    const otp = parseInt(query.otp)
    const verif = await selectUsers(query.email)
    if (otp !== verif.rows[0].otp) {
      return res.status(404).json({
      msg: "Incorrect OTP",
    })};
    const success = await activating(query.email)
    res.status(201).json({
      msg: "Activation completed"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Internal Server Error"
    });
  };
}
const loginUser = async (req, res) => {
  try {
    const {body} = req;
    const result = await selectUsers(body.email)
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Invalid data"
      });
    };
    if (result.rows[0].isactivate === false)
    return res.status(400).json({
      msg: "Please activate email first"
    });
    const {pwd, id, full_name} = result.rows[0];
    if (!await argon.verify(pwd, body.password)) {
      return res.status(401).json({
        msg: "Invalid E-mail or Password"
      });
    };
    const payload = {
      id, full_name, 
    };
    jwt.sign(payload, jwtKey,{
      expiresIn: '30m',
      issuer: issuerWho,
    }, (error, token) => {
      if (error) throw error;
      res.status(200).json({
        msg: "Successfully Login",
        data: {
          token,
          id,
          full_name,
        },
      });
    });
    // res.status(200).json({
    //   msg: "succes",
    //   data: result.rows[0]
    // })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Internal Server Error"
    });
  }
}
const logOutUser = async (req, res) => {
  try {
    const bearer = req.header("Authorization");
    const token = bearer.split(" ")[1];
    const logout = await blacklistToken(token);
    res.status(200).json({
      msg: "Log Out success. Thank You"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Internal Server Error"
    })
  }
}
const createPin = async (req, res) => {
  try {
    const {id} = req.userInfo;
    const {body} = req;
    const data= await pin(body.userPin, id)
    res.status(201).json({
      msg: "Success Create PIN"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Internal Server Error"
    })
  }
}
const forgotPasswordUser = async (req, res) => {
  try {
    const {body} = req;
    const result = await selectUsers(body.email)
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Your Account not Found"
      });
    };
    const info = await resetPwdMail({
      to: body.email,
      subject: "Reset Password",
      data: {
        username: result.rows[0].full_name,
        activationLink: `https://e-wallet-by-fwg-16.vercel.app/auth/password?email=${body.email}&otp=${result.rows[0].otp}`,
      }
    });
    res.status(200).json({
      msg: `Please check E-mail reset password`,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Internal Server Error"
    })
  }
}
const newPasswordUser = async (req, res) => {
  try {
    const {body, query} = req;
    const data = await selectUsers(query.email)
    if (data.rows[0].otp !== parseInt(query.otp)) 
      return res.status(401).json({
        msg: "Your otp is wrong",
        data: data.rows[0].otp,
      })
      const hashedPwd = await argon.hash(body.password);
      const result = await changePwd(hashedPwd, query.email)
      res.status(201).json({
        msg: `Password for ${query.email} complete updating `
      })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Internal Server Error"
    })
  }
}
module.exports = {registerUser,loginUser, activateUser, logOutUser, createPin, forgotPasswordUser, newPasswordUser}
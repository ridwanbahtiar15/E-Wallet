const {register, selectUsers, activating} = require("../Models/auth.model")
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const {jwtKey, issuerWho} = require("../Configs/environtment")
const {activateMail} = require("../Utils/activateMail")


const registerUser = async (req, res) => {
    try {
        const {body} = req;
        const otp = Math.floor(100000 + Math.random() * 900000);
        const hashedPassword = await argon.hash(body.password);
        const data = await register(body, hashedPassword, otp);
        const createdUser = data.rows[0];
        const info = await activateMail({
          to: body.email,
          subject: "Email Activation",
          data: {
            username: body.name,
            activationLink: `http://localhost:1600/auth/activate?email=${body.email}&otp=${otp}`,
          }
        });
        res.status(201).json({
            msg: `User successfully created. Your ID = ${createdUser.id} with full name : ${createdUser.user_name}`,
            check: "Please check E-mail and activated"
          });
    } catch (error) {
    console.error(error);
        res.status(500).json({
        msg: "Internal server error",
    });
  }
}
const activateUser = async (req, res) => {
  try {
    const {query} = req;
    const otp = parseInt(query.otp)
    const verif = await selectUsers(query.email)
    if (otp !== verif.rows[0].user_otp) {
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
    if (result.rows[0].user_activated === false)
    return res.status(400).json({
      msg: "Please activate email first"
    });
    const {user_password, id, user_name} = result.rows[0];
    if (!await argon.verify(user_password, body.password)) {
      return res.status(401).json({
        msg: "Invalid E-mail or Password"
      });
    };
    const payload = {
      id, user_name, 
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
    const logout = await out(token);
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

module.exports = {registerUser,loginUser, activateUser}
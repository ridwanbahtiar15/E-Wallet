const {readUsers, totalData, readProfile, sensitiveProfile, updateProfile, updatePin} = require("../Models/users.model")
const argon = require("argon2");
const {uploader} = require("../Utils/cloudUploader")

const searchUser = async (req, res) => {
    try {
    const {query} = req;
    const data = await readUsers(query);
    const muchData = await totalData(query);
    if (data.rowCount === 0) {
        return res.status(404).json({
          msg: "Data not found",
          data: body.phone
        });
      };
    let pages = 1;
    if (query.page) {
        pages = parseInt(query.page)
    }
    const totalUser = parseInt(muchData.rows[0].total_user);
    const nextPage = pages + 1;
    const prevPage = pages - 1;
    const lastPage = Math.ceil(totalUser / 8) <= pages;
    const meta = {
        page: pages,
        totalUser: totalUser,
        next: lastPage ? null : `http://localhost:1600?${query.email && "email="+query.email+"&"}${query.phone && "phone="+query.phone+"&"}page=${nextPage}` ,
        prev: pages === 1 || (!query.page) ? null : `http://localhost:1600?${query.email && "email="+query.email+"&"}${query.phone && "phone="+query.phone+"&"}page=${prevPage}`
    };
    res.status(200).json({
        msg: "Success",
        result: data.rows,
        meta
    })
    } catch (error) {
    console.log(error);
      res.status(500).json({
          msg: "Internal Server Error",
      })
    }
}

const getUserProfile = async (req, res) => {
    try {
    const {id} = req.userInfo
    const result = await readProfile(id)
    // const data = {
    //     No: result.rows[0].No,
    //     photo_profile: result.rows[0].photo_profile,
    //     full_name: result.rows[0].full_name,
    //     phone_number: result.rows[0].phone_number
    // }
    res.status(200).json({
      msg:"Success",
      res: result.rows[0]
    })
    } catch (error) {
    console.log(error);
    res.status(500).json({
      msg:"Internal Error",
    })
    }
}

const updateUser = async (req, res) => {
    try {
    const {id} = req.userInfo;
    const {body} = req;
    const { data, err } = await uploader(req, "photo_profile", id);
    if (err) throw err
    let hashedPwd = null;
    if (body.new_password || body.last_password) {
      if (!body.new_password || !body.last_password)
      return res.status(400).json({
        msg: "Both New Password and last password must be filled"
      })
        const data = await sensitiveProfile(id);
        const password_user = data.rows[0].password
        if (!await argon.verify(password_user, body.last_password))
        return res.status(404).json({
          msg: "Password Unmatched"
        });
        hashedPwd = await argon.hash(body.new_password);
      };
    const result = await updateProfile(id, body, hashedPwd, data && data.secure_url);
    res.status(201).json({
        msg: `Successfully update data for ${result.rows[0].full_name}`,
        data: body,
    });
    } catch (err) {
        if (err.code === "23505" ) {
            if (err.constraint === "users_full_name_key") {
              return res.status(400).json({
                msg: "Username already exist"
              });
            };
            if (err.constraint === "users_phone_number_key") {
              return res.status(400).json({
                msg: "Phone number already used"
              });
            };
            if (err.constraint === "users_email_key") {
              return res.status(400).json({
                msg: "E-mail already used"
              });
            };
          };
          console.error(err);
          res.status(500).json({
            msg: "Internal Server Error",
          });
    }
}

const confirmPin = async (req, res) => {
    try {
    const {id} = req.userInfo;
    const {body} = req;
    const data = await sensitiveProfile(id);
    if (body.last_pin !== data.rows[0].pin)
    return res.status(400).json({
        msg: "Your input wrong pin"
    })
    res.status(200).json({
        msg: "Accept for updating pin"
    })
    } catch (error) {
    console.log(error)
    res.status(500).json({
        msg: "Internal Server Error"
    })
    }
}

const updateUserPin = async (req, res) => {
    try {
    const {id} = req.userInfo;
    const {body} = req;
    if(body.pin.length < 6)
    return res.status(400).json({
      msg: "Pin must be 6 numbers"
    })
    const data = await updatePin(id, body.pin)
    res.status(201).json({
        msg: "Completed update pin",
        pin: body.pin
    })
    } catch (error) {
    console.log(error)
    res.status(500).json({
        msg: "Internal Server Error"
    })
    }
}

module.exports = {searchUser, getUserProfile, updateUser, confirmPin, updateUserPin}
const {User_Model} = require('../functions/models')

const login = async (req, res) => {
  try {
    console.log("entro", User_Model);
    //const users = await User_Model.find()
    console.log(users);
    res.status(200).json({ message: "EMAIL_SENDING" });
    return 1
    // const { password, googleToken } = req.body;
    // let googleSession = {};
    // if (googleToken) {
    //   googleSession = await verifyGoogleToken(googleToken);
    //   filter.email = googleSession.email;
    // }

    // let user = await User_Modesl.findOne({ email: filter.email });
    // if (!user) throw new Error("USER_NOT_FOUND");
    // if (!user) {
    //   if (googleSession.email_verified) {
    //     const data = {
    //       name: googleSession.name,
    //       email: googleSession.email,
    //       rol: "BEGINNER",
    //     };
    //     user = await userCreate(_, { data });
    //   }
    // }
    // if (password) {
    //   const hashedPass = hashedPassword(password, process.env.HASH_SECRET);
    //   if (user.password !== hashedPass)
    //     throw new Error("PASSWORD_IS_INCORRECT");
    // }
    // let sessionUser;
    // if (user) {
    //   sessionUser = {
    //     _id: user._id,
    //     email: user.email,
    //     username: user.username,
    //     name: user.name,
    //     rol: user.rol,
    //   };
    //   const payload = sessionUser;
    //   return jwtSign(payload, { expiresIn: "8h" });
    // } else {
    //   throw new Error("El usuario no existe.");
    // }
  } catch (error) {
    res.status(500).json({ message: error });

  }
};

module.exports = {
  login,
};

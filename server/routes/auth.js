const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
router.get("/register", (req, res) => {
  res.send("username");
});

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_P_KEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials");

    const hashPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_P_KEY
    );
    const pass = hashPass.toString(CryptoJS.enc.Utf8);
    pass !== req.body.password && res.status(401).json("Wrong credentials");
    const accsToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other, accsToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

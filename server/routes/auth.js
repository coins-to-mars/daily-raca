const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");


//POST to create a new user
router.post("/signup", async (req, res, next) => {
    const { username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ errorMessage: "Please fill all the inputs" });
    }
    if (password.length < 8) {
        return res.status(400).json({errorMessage: "Your password needs to be at least 8 characters long."});
    }
    const existingUser = await User.findOne({username});
    if (existingUser) {
        return res.status(400).json({ errorMessage: "This username has already an account." });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await User.create({username, password: hashedPassword});
      res.status(201).json({createdUser, message: "Your account was succesfully created, please login to start your session"});
    } catch (err) {
      console.log(err);
    }
});

//POST for login

router.post("/login", async (req, res) => {
    const {username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ errorMessage: "Please provide your credentials" });
    }
    const existingUser = await User.findOne({ username: username });
  
    if (!existingUser) {
        return res.status(400).json({ errorMessage: "This username doesn't exist." });
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
        return res.status(400).json({ errorMessage: "Incorrect password, please try again" });
    }
    req.session.loggedUser = existingUser
    return res.status(201).json({ existingUser, message: "Login succesfully" });
  });

    //POST logout
router.get("/logout", async (req, res, next) => {
    res.clearCookie("connect.sid", { path: "/" });
    try {
        await req.session.destroy();
        res.status(200).json({ message: "User was logged out" });
    } catch (err) {
        next(err);
    }
});
    

  module.exports = router;

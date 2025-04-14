const express = require('express');
const {userRegistration} = require('../controller/registrationController');


const router = express.Router();

router.post('/register', userRegistration);

module.exports = router;














// router.post("/login", async (req, res) => {
//     try {
//       const { email, password } = req.body;
      
//       const user = await User.findOne({ email });
//       if (!user) return res.status(400).json({ msg: "Invalid credentials" });
  
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
//       res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//     } catch (err) {
//       res.status(500).json({ msg: "Server error" });
//     }
//   });


// router.get("/profile", async (req, res) => {
//     const token = req.header("x-auth-token");
//     if (!token) return res.status(401).json({ msg: "No token, authorization denied" });
  
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await User.findById(decoded.id).select("-password");
//       res.json(user);
//     } catch (err) {
//       res.status(401).json({ msg: "Token is not valid" });
//     }
//   });
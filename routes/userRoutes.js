const express = require('express');
const {userRegistration} = require('../controller/registrationController');
const { userLogin } = require('../controller/loginController');


const router = express.Router();

router.post('/register', userRegistration);
router.post('/login' , userLogin);

/*To access this pages , use URLS : "http://localhost:3000/register" or "http://localhost:3000/login" i.e. 
    1. http://localhost:3000 ---> server running on it
    2. '/' ---> form server.js where we mount userRouter(exported from userRouter.js) --->we have to use'/user' instead of '/' if we mention app.use('/user' , userRouter) ----> i.e. full url : "http://localhost:3000/user/register".
    3.'/register' ---> from userRouter 
*/
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
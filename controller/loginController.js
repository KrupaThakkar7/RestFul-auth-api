require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const mailer = require('../utils/mailer');

const userLogin = async function(req,res){
    try {
        const {email , password , googleId , facebookId , linkedInId} = req.body;

        const user = await userModel.findOne({email}).lean();
        if(!user){
            return res.status(400).json({message : "Invalid Credentials"});
        }
        const isMatch  = await bcrypt.compare(password , user.password);
        //1st argument "password" is the one user entered in login form(req.password) & user.password is the hashed password stored in DB.

        if(!isMatch){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        //token is made using sign(payload , secretkey , options like expireIn , issuedBy etc)
        const token = jwt.sign({ id: user.userId , email: user.email } , process.env.JWT_SECRET , { expiresIn : '1h'} );

        res.cookie('login-token' , token , {httpOnly : true , secure : false , sameSite : 'strict' , maxAge : 60 * 60 * 1000});

        res.status(200).json({message : "Login successful !"});

        //to send mail
        await mailer({
            to: email,
            subject: "Login Alert",
            plainText: "Welcome back!",
            html: `<p>You logged in to our app using this mail. If it's not you, <a href="#">Check Activity</a></p>`,
        });
        


    } catch (err) {
        console.error(err);
        res.status(500).json({message : "Server Error"});
    }
  
}



module.exports = {
    userLogin
}





































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
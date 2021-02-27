const jwt = require("jsonwebtoken");
const {OAuth2Client}= require("google-auth-library");
const User=require('../models/User')
//module.exports = function (req, res, next) {
   exports.googlelogin =(reqm, resm)=> {

   //resm.json({name:'dsdfdsf'})


//  const token = req.header('Authorization');
 
  console.log('med');
  //console.log(token);
 const client = new OAuth2Client("584638914485-2tdlq9omj9crtfevmucsj5d0rq6v90nt.apps.googleusercontent.com")
  const{tokenId}=reqm.body
//console.log(tokenId);
//   client.verifyIdToken ({idToken:tokenId,audience:"584638914485-2tdlq9omj9crtfevmucsj5d0rq6v90nt.apps.googleusercontent.com"}).then((req,res)=>{
//      // const {email_verfied,name,email}=res.payload;
//       console.log('payload');
//       console.log(res);
//   })
  

  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: "584638914485-2tdlq9omj9crtfevmucsj5d0rq6v90nt.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    const {email_verified,name,email}=payload;
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
if(email_verified){
   
/////
// router.post("/signup", async (req, res) => {
     const { name, family_name, email,picture, iss} = payload;
    try {
      let user = await User.findOne({ email });
  
      if (user) {
        // return resm.status(400).json({ msg: "User already exists" });
        const payload2 = {user: {id: user.id,}};
       jwt.sign(payload2,"secret",{expiresIn: 360000,},(err, token) => {
         console.log('if user');
         resm.json(token);
            if (err) throw err;
          }
        );
      }
      else{
  
      user = new User({
        firstname:name,
        lastname:family_name,
        email:email,
        picture:picture,
        userType:iss
      });
  
    //   const salt = await bcrypt.genSalt(10);
  
    //   user.password = await bcrypt.hash(password, salt);
  
      await user.save();

//signup
let SignupUser = await User.findOne({ email });
  
if (SignupUser) {
  // return resm.status(400).json({ msg: "User already exists" });
  const payload3 = {SignupUser: {id: SignupUser.id,}};
 jwt.sign(payload3,"secret",{expiresIn: 360000,},(err, token) => {
   console.log('if user');
   resm.json(token);
      if (err) throw err;
    }
  );
}
// end signup

  }

    } catch (err) {
      console.error(err.message);
      resm.status(500).send("Server Error");
    }
//   });


////

}
   
    console.log(payload);
    
  }
  verify().catch(console.error);



//   // Check if not token
//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   // Verify token

//   try {
//     jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
//       if (error) {
//         return res.status(401).json({ msg: "Token is not valid" });
//       } else {
//         req.user = decoded.user;
//         next();
//       }
//     });
//   } catch (err) {
//     console.error("something wrong with auth middleware");
//     res.status(500).json({ msg: "Server Error" });
//   }
};

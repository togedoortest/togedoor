const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const {googlelogin} = require('../middleware/authGoogle')
// const nodemailer = require('nodemailer');
const fs = require('fs')

const log = console.log;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png') 
  }
})







//// orginall /////////
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
// cb(null, 'uploads');
// console.log("uploads...");
//   },
//   filename: function (req, file, cb) {
//     const now = new Date().toISOString();
//     const date = now.replace(/:/g, "-");
//    cb(null, date + file.originalname);
//    cb(null, file.originalname);
//   },
// });
////end orginal//////
const fileFilter = (req, file, cb) => {

 // if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
   // if (file.mimetype === "image/jpg" || file.mimetype === "image/png") {
   // cb(null, true);
 // } else {
 //   cb(null, false);
//  }
};

var upload = multer({ storage: storage })



///orginal////
// const upload = multer({
//   storage: storage
// ,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
   //fileFilter: fileFilter,
// });
// /// end orginal/////


const User = require("../models/User");
const Service = require("../models/Service");



// @route     GET /services
// @desc      Get all services
// @access    Public
router.get("/",async (req, res) => {
  try {
    const services = await Service.find();
    
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/googlelogin",googlelogin); ///////////////////////////////////////////////////////////////////////
//mongodb+srv://AtlantisApp:atlantis123@atlantisapp-fverx.mongodb.net/atlantis?retryWrites=true&w=majority
// @route     GET /services/:id
// @desc      Get Single Service
// @access    Public
router.get("/:id",async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(400).json({ msg: "Service doesn't exist" });
    }

    console.log("service-------------", service);

    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET /services/name/:name
// @desc      Get Single Service
// @access    Public
//router.get("/name/:name".split(" ").join(""), async (req, res) => {
router.get("/name/:name", async (req, res) => {
  try {
    //const name = req.params.name.split("-").join(" ");
    const name = req.params.name
    console.log('by id');
   console.log(name);
    //const service = await Service.findOne({ name });
 const service = await Service.findById({ name });
    if (!service) {
      return res.status(400).json({ msg: "Service doesn't exist" });
    }

    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET /services/getBysubCategory/:subcategoryID
// @desc      Get Single Service
// @access    Public
router.get("/getBySubCategory/:subcategoryID", async (req, res) => {
  try {
    const subCategoryID = req.params.subcategoryID;
    const filter = { subCategoryID: subCategoryID };
    const services = await Service.find(filter);

    if (!services) {
      return res.status(400).json({ msg: "No Service Found" });
    }

    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});




//////  uploadfile
// auth,
router.post("/uploadfile",auth,upload.single('file'), 

  
    async (req, res) => {
// console.log('test route');
// console.log(req.body);
      try {
       // const token = req.header('x-auth-token');
       // console.log(token);
 //console.log(req.file.path);
 const obj = JSON.parse(req.body.document);
 const User = JSON.parse(req.body.user);
const { name, description, rating, price, subCategoryID } = obj;

//  const name=req.body.document[0]
//  const description=req.body.document.description
//  const rating=req.body.document.rating
//  const price=req.body.document.price
//  const subCategoryID=req.body.document.subCategoryID
// console.log(obj);
 console.log(name);
   console.log(description);
   console.log(rating);
   console.log(price);
   console.log(subCategoryID);
   console.log('user info');
  console.log(User.auth.user.email); 
  console.log(req.user.id);
  let Isfile='no image'
  try {
    
    if(req.file)  {Isfile=req.file.path}
   // Isfile=req.file.path
  } catch (error) {
    console.log(error);
  }
   const newService = new Service({
    name,
    description,
    rating,
    price,
    subCategoryID,
  //serviceImage: req.file.path,
serviceImage:Isfile,
   userID: req.user.id,
   //userID:"5f54f79720960f4618748bbe"    // Emad type your DI here , you can get in from the local storage
  });

  const service = await newService.save();




        res.json(service);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
  );

// ###############################################################



 ///#### upload file2 

 router.post("/uploadfilee",upload.single('file'), 

  
 async (req, res) => {
// console.log('test route');
// console.log(req.body);
   try {
    // const token = req.header('x-auth-token');
    // console.log(token);
//console.log(req.file.path);
// const obj = JSON.parse(req.body.document);
// const User = JSON.parse(req.body.user);
// const { name, description, rating, price, subCategoryID } = obj;

//  const name=req.body.document[0]
//  const description=req.body.document.description
//  const rating=req.body.document.rating
//  const price=req.body.document.price
//  const subCategoryID=req.body.document.subCategoryID
// console.log(obj);
// console.log(name);
// console.log(description);
// console.log(rating);
// console.log(price);
// console.log(subCategoryID);
// console.log('user info');
// console.log(User.auth.user.email); 
// console.log(req.user.id);
// let Isfile='no image'
// try {
 console.log('ssss');
//  if(req.file)  {Isfile=req.file.path}
// // Isfile=req.file.path
// } catch (error) {
//  console.log(error);
// }
// const newService = new Service({
//  name,
//  description,
//  rating,
//  price,
//  subCategoryID,
// //serviceImage: req.file.path,
// serviceImage:Isfile,
// userID: req.user.id,
// //userID:"5f54f79720960f4618748bbe"    // Emad type your DI here , you can get in from the local storage
// });

// const service = await newService.save();



  const file= req.file.path
     res.json({filenameName:file});
   } catch (err) {
     console.error(err.message);
     res.status(500).send("Server Error");
   }
 }
);


 //// end upload file 2




  //res.json({ msg: "Service Deleted!" });
  
// ##########################################################



//// end uploadfile

// @route     POST /service
// @desc      Create Service
// @access    Private

// ############################################    عماد هون غيرت 
router.post(
// "/create",auth,upload.single("serviceImage"),
///serviceImage
//"/create",upload.single('serviceImage'), 
"/create",
  async (req, res) => {
 // console.log(req.file);
//  const { name, description, rating, price, subCategoryID } = req.body;
//  console.log(name);
//    console.log(description);
//    console.log(rating);
//    console.log(price);
//    console.log(subCategoryID);
// console.log(req.file)
   

//console.log(name);
  //   try {
  //     const newService = new Service({
  //       name,
  //       description,
  //       rating,
  //       price,
  //       subCategoryID,
  //      // serviceImage: req.file.path,
  // serviceImage: "yujygjhgjghj",
  //       //userID: req.user.id,
  //       userID:"5f54f79720960f4618748bbe"    // Emad type your DI here , you can get in from the local storage
  //     });

  //     const service = await newService.save();

  //     res.json(service);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send("Server Error");
  //   }
  }
);
//###########################################################       لحد هون
// @route     PATCH /services
// @desc      Update Service
// @access    Private
//router.patch("/:id", auth, async (req, res) => {
router.post("/:id",async (req, res) => {

  const { name, description, rating, price, serviceImage } = req.body;

  const serviceFields = {
    name,
    description,
    rating,
    price,
    serviceImage,
  };

  try {
    let service = await Service.findById(req.params.id);

   

    // const path = './file.txt'
    
    // fs.unlink(path, (err) => {
    //   if (err) {
    //     console.error(err)
    //     return
    //   }
    
    //   //file removed
    // })

    // if (!service) {
    //   return res.status(404).json({ msg: "Service not found" });
    // }

    // if (service.userID != req.user.id) {
    //   return res.status(401).json({ msg: "Not Authorized" });
    // }
    console.log('service--');
    console.log(service);

service = await Service.findByIdAndUpdate(
  req.params.id,
  { $set: serviceFields },
  { new: true }
  );

    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE /service
// @desc      Delete service
// @access    Private
//router.delete("/:id", auth, async (req, res) => {
  router.delete("/:id",async (req, res) => {
    console.log('id del');
  try {
    let service = await Service.findById(req.params.id);

    

const path = service.serviceImage

fs.unlink(path, (err) => {
  if (err) {
    console.error(err)
    return
  }
console.log('removed Image');
  //file removed
})
   

    // if (!service) {
    //   return res.status(404).json({ msg: "Service not found" });
    // }

    // if (service.user != req.user.id) {
    //   return res.status(401).json({ msg: "Not Authorized" });
    // }
console.log(service);
    await Service.findByIdAndRemove(req.params.id);

    res.json({ msg: "Service Deleted!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});




//require('dotenv').config();




module.exports = router;

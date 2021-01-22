const mongoose = require("mongoose");

const db = async () => {
 // console.log(process.env.MONGODB_URI);
  try {
   // await mongoose.connect(process.env.MONGODB_URI, {
    // MONGODB_URI = mongodb+srv://togeDoor:togeDoor123@cluster0.n4ve2.mongodb.net/togeDoor?retryWrites=true&w=majority
    // JWT_SECRET = secret
      await mongoose.connect("mongodb+srv://togeDoor:togeDoor123@cluster0.n4ve2.mongodb.net/togeDoor?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = db;

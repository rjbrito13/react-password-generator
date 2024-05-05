const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/userModel");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//get connection string;
const databaseUrl = process.env.DATABASE_URL;

mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("connect to DB");
  })
  .catch((err) => console.error(err));


//root route for backend
app.get("/", (req, res) => {
  res.send({ apps: "Hello from backend" });
  
});


app.get("/getUsers", async (req, res) => {
  const data = await User.find({});

  console.log(data);

  res.send({ success: true, message: data });
});

app.post("/create", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, message: "User created successfully", user });
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500).json({ success: false, message: "User creation failed", error: error.message});
  }
});

app.post("/bulkcreate", async(req, res) =>{
  try{
    const users = await User.insertMany(req.body);

    res.status(201).json({ success: true, message: "Users created successfully", users });

  } catch(error){
    console.error("User creation error:", error);
    res.status(500).json({ success: false, message: "User creation failed", error: error.message});

  }

});

app.post("/deleteAll", async (req, res) => {

  try{
    const user = await User.deleteMany({});

    res.status(201).json({ success: true, message: "All users deleted successfully", user });

  }catch(error){
    console.error("User deletion error:", error);
    res.status(500).json({ success: false, message: "User deletion failed", error: error.message});

  }

})





app.put("/update", async (req, res) => {
  console.log(req.body);
  const { id, ...rest } = req.body;

  console.log(rest);
  await UserModel.updateOne({ _id: req.body.id }, rest);

  res.send({ succes: true, message: "Data updated successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is running on port " + PORT));

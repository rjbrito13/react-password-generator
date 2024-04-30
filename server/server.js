const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/crud")
  .then(() => {
    console.log("connect to DB");
  })
  .catch((err) => console.error(err));

const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    age: Number,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", schemaData);

app.get("/getUsers", async (req, res) => {
  const data = await UserModel.find({});

  res.send({ success: true, message: data });
});

app.post("/create", async (req, res) => {
  console.log(req.body);

  const data = await UserModel(req.body);
  await data.save();

  res.send({ success: true, message: "Data Save Successfully" });
});

app.put("/update", async (req, res) => {
  console.log(req.body);
  const { id, ...rest } = req.body;

  console.log(rest);
  await UserModel.updateOne({ _id: req.body.id }, rest);

  res.send({ succes: true, message: "Data updated successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is running on port " + PORT));

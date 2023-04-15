require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
require("../db/connection");
const Appliance = require("../models/appliances");
const Electronic = require("../models/electronics");
const Fashion = require("../models/fashions");
const House = require("../models/houses");
const Carousel = require("../models/carousels");
const Feed = require("../models/feeds");
const Register = require("../models/register");
const Order = require("../models/Orders");
const cors = require("cors");
const FlipkartData = require("../models/flipkartData");
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// delete route
app.delete("/delete/:id/:userEmail", async (req, res) => {
  const deleteData = req.params.id;
  const userEmail = req.params.userEmail;

  const data = await Order.updateOne(
    { email: userEmail },
    { $pull: { order_data: { _id: deleteData.toString() } } }
  );
  res.send(data);
});

// search route
app.get("/search/:searchTerm", async (req, res) => {
  const searchTerm = req.params.searchTerm;
  try {
    const allData = await FlipkartData.find({
      $or: [
        { img: { $regex: searchTerm, $options: "i" } },
        { title: { $regex: searchTerm, $options: "i" } },
        { brand: { $regex: searchTerm, $options: "i" } },
        { about: { $regex: searchTerm, $options: "i" } },
        { bank: { $regex: searchTerm, $options: "i" } },
        { color: { $regex: searchTerm, $options: "i" } }
      ]
    });
    if (allData) {
      res.status(200).json(allData);
    } else {
      res.status(400).json({ error: "there are some bug" });
    }
  } catch {
    console.log("error");
  }
});

app.get("/electronics", async (req, res) => {
  try {
    const electronic = await Electronic.find();
    res.send(electronic);
  } catch (err) {
    res.send(err);
  }
  res.status(201);
});
app.get("/feeds", async (req, res) => {
  try {
    const feed = await Feed.find();
    res.send(feed);
  } catch (err) {
    res.send(err);
  }
  res.status(201);
});

app.get("/carousel", async (req, res) => {
  try {
    const carousel = await Carousel.find();
    res.send(carousel);
  } catch (err) {
    res.send(err);
  }
  res.status(201);
});

app.get("/appliances", async (req, res) => {
  try {
    const appliance = await Appliance.find();
    res.send(appliance);
  } catch (err) {
    res.send(err);
  }
  res.status(201);
});

app.get("/houseItems", async (req, res) => {
  try {
    const houseitem = await House.find();
    res.send(houseitem);
  } catch (err) {
    res.send(err);
  }
  res.status(201);
});

app.get("/fashionItems", async (req, res) => {
  try {
    const fashion = await Fashion.find();
    res.send(fashion);
  } catch (err) {
    res.send(err);
  }
  res.status(201);
});

app.post("/myorders", async (req, res) => {
  const userEmail = req.body.userEmail;
  const orderData = await Order.find({ email: userEmail });
  res.send(orderData);
});

// users registration
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, reEnterpassword } = req.body;

    if (!name || !email || !password || !reEnterpassword) {
      res.status(202).json({ message: "Please fill the  detail correctly" });
    }

    const userExist = await Register.findOne({ email: email });

    if (userExist) {
      res.status(202).json({ message: "user is already registered" });
    } else if (password !== reEnterpassword) {
      res.status(202).json({ message: "Password are not matching" });
    } else {
      const register = new Register({
        name,
        email,
        password,
        reEnterpassword,
      });
      await register.save();
      res.status(202).json({ message: "user registered successfully" });
    }
  } catch (e) {
    console.log(e);
  }
});

// singin api
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ message: "please filled the data" });
    }
    const user = await Register.findOne({ email: email });
    const token = await user.generateToken();
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    if (!user) {
      res.status(202).json({ message: "user not found" });
    } else {
      await bcrypt.compare(password, user.password);

      res.status(202).json({ message: "login successfully", user });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/orders", async (req, res) => {
  let userEmailmatch = await Order.find({ email: req.body.email });
  if (userEmailmatch.length !== 0) {
    try {
      let prevArr = userEmailmatch[0].order_data;

      let newArr = req.body.order_data;
      let newupdated = [...prevArr, ...newArr];
      await Order.updateOne(
        { email: req.body.email },
        { $set: { order_data: newupdated } }
      )
        .then(() => {
          res.status(200).json({ message: "Processing....press ok" });
        })
        .catch((e) => {
          res.send(400).json({ error: "data not saved" });
        });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await Order.create({
        email: req.body.email,
        order_data: req.body.order_data,
      }).then(() => {
        res.json({ message: "Thanks for first Order from flipkart" });
      });
    } catch (e) {
      console.log(e.message);
      res.send(e);
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port on ${port}`);
});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();

// middleware to parse json requests
app.use(express.json());

// enable cors for frontend communication
app.use(cors());

// connect to mongodb

const connectDB = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to database");
  } catch (error) {
    console.error("unable to connect to db");
  }
};

// define a user schema with name email and hashed password

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true }, //ensure unique emails
  password: { type: String },
});

// create a user model based on schema
const User = mongoose.model("User", UserSchema);

//  signup endpoint

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // hash the password before storing in database

    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user with hashed password

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    res.status(201).send({
      message: "user created successfully",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

// login endpoint

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).send({
        error: "user not found",
      });
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).send({ msessage: "incorrect password" });

    // generate jwt token for authenticated user
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "12hr",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

// logout endpoint (Handled on frontend by removing token)

app.post("/logout", (req, res) => {
  res.send({ messgae: "logged out successfully" });
});

// Start the server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on port ${PORT}`);
});

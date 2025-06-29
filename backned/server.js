// // server.js
// require("dotenv").config(); // Load .env variables

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const { MongoClient, ObjectId } = require("mongodb");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const app = express();

// // Load environment variables
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;
// const DB_NAME = process.env.DB_NAME;
// const COLLECTION_NAME = "users";
// const JWT_SECRET = process.env.JWT_SECRET;

// app.use(cors());
// app.use(bodyParser.json());

// let db, usersCollection;

// // Connect to MongoDB
// MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
//   .then((client) => {
//     db = client.db(DB_NAME);
//     usersCollection = db.collection(COLLECTION_NAME);
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

// // Middleware to protect routes
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// // Register route
// app.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password)
//     return res.status(400).json({ message: "Username and password required" });

//   const existingUser = await usersCollection.findOne({ username });
//   if (existingUser)
//     return res.status(409).json({ message: "User already exists" });

//   const hashedPassword = await bcrypt.hash(password, 10);
//   await usersCollection.insertOne({ username, password: hashedPassword });
//   res.status(201).json({ message: "User registered successfully" });
// });

// // Login route
// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password)
//     return res.status(400).json({ message: "Username and password required" });

//   const user = await usersCollection.findOne({ username });
//   if (!user)
//     return res.status(401).json({ message: "Invalid credentials" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch)
//     return res.status(401).json({ message: "Invalid credentials" });

//   const payload = { username: user.username, userId: user._id };
//   const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
//   res.status(200).json({ message: "Login successful", token });
// });

// // Protected route
// app.get("/profile", authenticateToken, async (req, res) => {
//   const user = await usersCollection.findOne(
//     { _id: new ObjectId(req.user.userId) },
//     { projection: { password: 0 } }
//   );
//   res.json({ user });
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
require("dotenv").config(); // Load .env variables

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const COLLECTION_NAME = "users";
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json());

let db, usersCollection;

// Connect to MongoDB Atlas (DB name included in URI)
MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db(); // Automatically picks DB from URI
    usersCollection = db.collection(COLLECTION_NAME);
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Register route
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Username and password required" });

    const existingUser = await usersCollection.findOne({ username });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Username and password required" });

    const user = await usersCollection.findOne({ username });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const payload = { username: user.username, userId: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Protected route
app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await usersCollection.findOne(
      { _id: new ObjectId(req.user.userId) },
      { projection: { password: 0 } }
    );
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

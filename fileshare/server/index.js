const express = require("express");
const connectDB = require("./config/Db");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const fileUpload = require("express-fileupload");

const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoute");
const app = express();

app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST"],
  credentials: true,
}));

connectDB();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));



app.use("/api", uploadRoutes);
app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to the server" });
});



const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

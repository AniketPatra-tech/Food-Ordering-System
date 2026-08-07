const dns = require("dns");

dns.setDefaultResultOrder("ipv4first"); 

const userRoutes = require("./routes/userRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");


// Connect MongoDB
connectDB();


const app = express();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


app.get("/", (req, res) => {
    res.send("Zestora Backend Running");
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const Admin = require('../models/admin');
const User=require('../models/user')

const jwt = require("jsonwebtoken");

exports.Adminlogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    if (password === admin.password) {
      const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });

      return res.status(200).json({ message: "Login successful", token });
    } else {
      return res.status(401).json({ error: "Invalid password" });
    }
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.showuser=async(req,res)=>{
    let user=await User.find()
    res.status(200).json({user})
}

exports.block=async (req, res) => {
  const { id } = req.body;

try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.blocked = !user.blocked; 
    await user.save();

    res.status(200).json({ message: `User ${user.blocked ? "blocked" : "unblocked"}`, user });
  } catch (err) {
    console.error("Toggle block error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
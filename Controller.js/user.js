const User=require('../models/user')


exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(400).json({ error: 'Incorrect password' });
  }

  if (user.blocked) {
    return res.status(403).json({ error: 'User is blocked' });
  }

  res.status(200).json({
    message: 'Login successful',
    userId: user._id,
    name: user.name,
    blocked:user.blocked
  });
};

exports.userADD=async(req,res)=>{
    try {
    const { phone, name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }


    const newUser = new User({ phone, name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.edit=async(req,res)=>{
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

exports.Oedit= async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

exports.search=async (req, res) => {
  const { q } = req.query;
console.log(q)
  try {
    const regex = new RegExp(q, "i"); // case-insensitive
    const users = await User.find({
      $or: [
        { name: { $regex: regex } },
        { email: { $regex: regex } },
      ],
    });

    res.json(users);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

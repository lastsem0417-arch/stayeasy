module.exports = (req, res, next) => {
  console.log("USER ROLE:", req.user.role); // 👈 check
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Admin access only" });
  next();
};
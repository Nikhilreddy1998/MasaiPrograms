const roleCheck = (allowedRoles = []) => {
  return (req, res, next) => {
    const role = req.headers["x-role"];
    if (!role)
      return res
        .status(403)
        .json({ error: "Role header (x-role) is missing " });
    if (!allowedRoles.includes(role))
      return res.status(403).json({ error: `Access denied for role: ${role}` });
    next();
  };
};

module.exports = roleCheck;

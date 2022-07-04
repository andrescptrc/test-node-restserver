const { request, response } = require("express");

const isAdmin = (req = request, res = response, next) => {
  const authenticatedUser = req.authenticatedUser;

  if (!authenticatedUser) {
    return res.status(500).json({
      msg: "It's intended validate the role without validate the token first",
    });
  }

  const { role, name } = authenticatedUser;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} is not admin - You can't do that`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    const authenticatedUser = req.authenticatedUser;

    if (!authenticatedUser) {
      return res.status(500).json({
        msg: "It's intended validate the role without validate the token first",
      });
    }

    if (!roles.includes(authenticatedUser.role)) {
      return res.status(401).json({
        msg: `The service require the following roles: ${roles}`,
      });
    }
    next();
  };
};

module.exports = { isAdmin, hasRole };

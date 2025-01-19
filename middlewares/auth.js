import { getUsers } from "../utils/auth.js";

async function LogdinUserOnly(req, res, next) {
  try {
    const UserId = req.cookies?.uuid;
    if (!UserId) return res.redirect("/login");

    const user = getUsers(UserId);
    if (!user) return res.redirect("/login");

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in LogdinUserOnly middleware:", error);
    res.redirect("/login");
  }
}

async function checkAuth(req, res, next) {
  const UserId = req.cookies?.uuid;
  const user = getUsers(UserId);
  req.user = user;
  next();
}

export { LogdinUserOnly, checkAuth };

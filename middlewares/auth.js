import { getUsers } from "../utils/auth.js";

async function LogdinUserOnly(req, res, next) {
  const UserId = req.cookies.uuid;
  if (!UserId) return res.redirect("/login");
  const user = getUsers(UserId);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

export { LogdinUserOnly };

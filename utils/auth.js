import jwt from "jsonwebtoken";
const secKey = "prakashdeepSharma";

function setUsers(user) {
  return jwt.sign({ user }, secKey);
}

function getUsers(token) {
  if (!token) return null;
  return jwt.verify(token, secKey);
}

export { setUsers, getUsers };

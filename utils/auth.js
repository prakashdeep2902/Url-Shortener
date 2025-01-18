const sessionIdToUserMap = new Map();

function setUsers(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUsers(id) {
  return sessionIdToUserMap.get(id);
}

export { setUsers, getUsers };

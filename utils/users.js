const users = [];

//User enters request page
function userJoin(id, username, page) {
  page = "page";
  const user = { id, username, page };

  users.push(user);
  return user;
}

//Get current users
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

//Get current users in page
function getUsersInPage(page) {
  return users.filter((user) => user.page === page);
}

//User leaves request page
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

module.exports = {
  userJoin,
  getCurrentUser,
  getUsersInPage,
  userLeave,
};

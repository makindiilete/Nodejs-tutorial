//this function is for our chat msgs
const generateMessage = (username, text) => {
  return {
    username: username,
    // admin: "Admin",
    text: text,
    createdAt: new Date().getTime()
  };
};
//ds function is for our location msg
const generateLocationMessage = (username, url) => {
  return {
    username: username,
    url: url,
    createdAt: new Date().getTime()
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
};

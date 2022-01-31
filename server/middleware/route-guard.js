// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
    if (!req.session.loggedUser) {
      return res.redirect('/login');
    }
    next();
  };

  // if an already logged in user tries to access the login page it
  const isLoggedOut = (req, res, next) => {
    if (req.session.loggedUser) {
        return res
        .status(404)
        .json({ errorMessage: "No session started for this user" });
    }
    next();
  };
   
  module.exports = {
    isLoggedIn,
    isLoggedOut
  };
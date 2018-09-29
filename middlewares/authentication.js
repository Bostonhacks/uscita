module.exports = {
  isLoggedIn: function(req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/login');
    } else {
      next();
    }
  },

  isAdmin: function(req, res, next) {
    if (!req.user.admin) {
      res.redirect('/');
    } else {
      next();
    }
  }
}
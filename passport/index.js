const passport = require("passport");
const User = require("../models/User");
const localStrategy = require("./localStrategy");
const twitterStrategy = require("./twitterStrategy");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(new Error("Failed to deserialize an user"));
  }
});

passport.use(twitterStrategy);
passport.use(localStrategy);

module.exports = passport;

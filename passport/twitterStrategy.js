const User = require("../models/User");
const TwitterStrategy = require("passport-twitter").Strategy;

const twitterStrategy = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_SECRET_KEY,
    callbackURL: "/api/auth/twitter/redirect",
  },
  async (token, tokenSecret, profile, done) => {
    // find current user in UserModel
    try {
      const currentUser = await User.findOne({
        twitterId: profile._json.id_str,
      });
      // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new User({
          name: profile._json.name,
          screenName: profile._json.screen_name,
          twitterId: profile._json.id_str,
          profileImageUrl: profile._json.profile_image_url,
          cart: {
            products: {},
            count: 0,
            shipping: 0,
            itemTotal: 0,
            taxPercent: 0,
            total: 0,
          },
          orders: [],
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, currentUser);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = twitterStrategy;

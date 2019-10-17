const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy;
const { UserModel } = require('../db')

const passportJWT = require("passport-jwt");
const JWTStrategy  = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new BasicStrategy(function(login, password, cb){  
    return UserModel.findOne({login, password})
           .then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Incorrect email or password.'});
               }
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : require('../config').secret
},
function (jwtPayload, cb) {
    return UserModel.findOneById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));


module.exports = passport
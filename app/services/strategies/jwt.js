const { Strategy } = require('passport-jwt');
const { jwtSecret } = require('../../../config');
const db = require('../../../models');
const { ServerError } = require('../../../utils/core');
const JWTStrategy = Strategy;

const strategyOptions = {
  jwtFromRequest: (req) => req.get('Authorization'),
  secretOrKey: jwtSecret,
  passReqToCallback: true,
};

const verifyCallback = async (req, jwtPayload, done) => {
  const { id } = jwtPayload.user;
  const user = await db.User.findOne({ where: { id }, raw: true });
  if (!user) return done(new ServerError('no such user', 404));
  req.user = user;
  return done(null, user);
};

exports.jwtStrategy = new JWTStrategy(strategyOptions, verifyCallback);

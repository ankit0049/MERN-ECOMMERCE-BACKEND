import express from 'express'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import { User } from './model/User.model.js';  
import crypto from 'crypto';
import jwt from 'jsonwebtoken';   
import { ExtractJwt } from 'passport-jwt';
import cookieParser from 'cookie-parser';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { createProduct } from './controller/Products.controller.js';
import productRouter from './routes/Products.routes.js';
import categoryRouter from './routes/Category.routes.js';
import brandRouter from './routes/Brands.routes.js';
import userRouter from './routes/User.routes.js';
import authRouter from './routes/Auth.routes.js';
import cartRouter from './routes/Cart.routes.js';
import orderRouter from './routes/Order.routes.js'; 
import { sanitizeUser , isAuth , cookieExtractor  } from './utils/common.utils.js';


dotenv.config({ path: 'config.env' });

const app = express();
 
//JWT 
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

// Middleware 
app.use(cookieParser());
app.use(cors({
  exposedHeaders: ['X-Total-Count']
}));
app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
// Routes
app.use('/products' , isAuth(), productRouter);
app.use('/brands',isAuth(), brandRouter);
app.use('/categories', isAuth(), categoryRouter);
app.use('/users',isAuth(), userRouter);
app.use('/auth', authRouter);
app.use('/cart',isAuth(), cartRouter);
app.use('/orders',isAuth(), orderRouter);

// Passport LocalStrategy
passport.use(
  'local',
  new LocalStrategy(
    {usernameField:'email'},
    async function (email, password, done) {
    // by default passport uses username
    try {
      const user = await User.findOne({ email: email });
      console.log(email, password, user);
      if (!user) {
        return done(null, false, { message: 'invalid credentials' }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        'sha256',
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: 'invalid credentials' });
          }
          const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET_KEY);
          done(null, {token}); // this lines sends to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  'jwt',
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log({ jwt_payload });
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser(function (user, cb) {
  console.log('serialize', user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  console.log('de-serialize', user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

export default app;

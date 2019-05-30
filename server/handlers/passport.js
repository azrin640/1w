const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/User');

passport.use(User.createStrategy());
//passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

import express, { application } from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Videos from './Video.js'
import User from './User.js'
import 'dotenv/config'
import session from 'express-session'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

//App Config
const app = express()
const port = process.env.PORT || 9000
const connection_url = 'mongodb+srv://sam:cuRules123@cluster0.kgnxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//Middleware
app.use(express.json())
app.use(Cors())
app.use(session({
    secret: "A secret.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://shortvideo-gryz.herokuapp.com/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id, username: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

//DB Config
mongoose.connect(connection_url, {})

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello world!"))

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body
    Videos.create(dbVideos, (err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(201).send(data)
    })
})

app.get('/v2/posts', (req, res) => {
    Videos.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
)

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "https://short-video-frontend-a286d.web.app" }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("https://short-video-frontend-a286d.web.app");
})

app.get("/logout", function(req, res){
    res.redirect("https://short-video-frontend-a286d.web.app");
})
    
//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))

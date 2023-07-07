import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy
import usersDB from '../database/users.db.service';
import bcrypt from "bcrypt";


const authenticateUser = (email, password, done) => {
    usersDB
        .getUserByEmail(email)
        .then(user => {
            if(!user ||!bcrypt.compareSync(password, user.password))
                return done(null, false, { message: "Incorrect credentials."})
            return done(null, user)
        })
        .catch(err => done(err))
}

passport.serializeUser((loggedInUser, done) => done(null, loggedInUser.id))

passport.deserializeUser((userId, done) => {
    usersDB
        .getUserById(userId)
        .then(user => {
            if(!user)
                return done(null)
            return done(null, user)
        })
        .catch(err => done(err))
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, authenticateUser))

export default passport
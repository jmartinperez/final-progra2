import passport from "passport"
import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import {UserService} from "../services/UserService"
import {helpers} from"./helpers"
import {User} from "../entities/User"


// Busqueda de usuario

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true



}, async ( request, username, password, done) => {
  
    const userService = new UserService()
    const busqueda : User[]  = await userService.getDataByUsername(username)
    if (busqueda.length == 1) {
        const user:User = busqueda[0];
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {
            request.flash("success", "Bienvenido " , user.name)
            done(null, user);
        } else {
            request.flash("error", "Contraseña incorrecta")
            done(null, false);
        }
    } else {
        request.flash("error", "El usuario no existe.")
        return done(null, false);
    }
}));

passport.serializeUser((user: User, done) => {
 
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    const userService = new UserService()
    const result = await userService.getData(id)
    done(null, result);
});

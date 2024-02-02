import passport from "passport";
import { usersManager } from "./managers/usersManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { hashData, comparedData } from "./utils.js";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

const JWT_SECRET = 'jwtSECRET'
// LOCAL
passport.use("signup", new LocalStrategy(
    {
    usernameField: "email",
    passReqToCallback: true
    }, 
    async (req, email, password, done) =>{
        try {
            const userDb = await usersManager.getByEmail(email);
            if(userDb){
                return done(null, false);
            }
            const hashedPassword = await hashData(password);
            const createdUser = await usersManager.createOne({
                ...req.body, 
                password:hashedPassword});
            done(null,createdUser);
            
        } catch (error) {
            done(error)
        }
    }
    )
);

passport.use("login", new LocalStrategy(
    {
    usernameField: "email",
    }, 
    async (email, password, done) =>{
        try {
            const userDb = await usersManager.getByEmail(email);
            if(!userDb){
                return done(null, false);
            }
            const isValid = await comparedData(password, userDb.password);
            if(!isValid){
                return done(null, false);
            }
            done(null,userDb); 
        } catch (error) {
            console.log("entre al error");
            done(error)
        }
    }
    )
);

// GITHUB

passport.use('github', new GithubStrategy({
    clientID: 'Iv1.710df0ea7661e83b',
    clientSecret: '29bbcb856896158108941a21501da1469b7336d3',
    callbackURL: "http://localhost:8080/api/sessions/github"
  },
  async(accessToken, refreshToken, profile, done) => {
    try {
        //console.log("soy el profile",profile);
        // Hago una llamada adicional para obtener el correo electrónico
        const emailResponse = await fetch('https://api.github.com/user/emails', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const emails = await emailResponse.json();
        const primaryEmail = emails.find(email => email.primary);

        const userDB = await usersManager.getByEmail(primaryEmail.email);
        // login
        if(userDB){
            if(userDB.from_github){
                return done(null,userDB);
            } else {
                return done(null, false);
            }
        }
        // signup
        const newUser = {
            first_name: profile.displayName,
            last_name: profile.username,
            email: primaryEmail.email,
            password: '12345',
            from_github: true,
        };

        const createdUser = await usersManager.createOne(newUser);
        done(null, createdUser);
    } catch (error) {
        console.error("Error en la estrategia de GitHub:", error);
        done(error)
    }
  }
));

// JWT

// passport.use('jwt', new JWTStrategy({ 
//     secretOrKey: JWT_SECRET, 
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     }, 
//     async(jwt_payload, done) =>{
//         console.log(jwt_payload);
//         done(null,jwt_payload)
//     }
// ));

// JWT - con cookies

const fromCookies = (req)=>{
    return req.cookies.token;
}

passport.use('jwt', new JWTStrategy({ 
    secretOrKey: JWT_SECRET, 
    jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),  
    }, 
    async(jwt_payload, done) =>{
        console.log(jwt_payload);
        done(null,jwt_payload)
    }
));



passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(async function(id, done) {
    try {
       const user = await usersManager.getById(id);
       done(null,user); 
    } catch (error) {
       done(error)
    }
  });
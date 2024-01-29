import passport from "passport";
import { usersManager } from "./managers/usersManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { hashData, comparedData } from "./utils.js";


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
    clientID: 'Iv1.0555663bd33021c9',
    clientSecret: '032a435f838a9eeb51a892d6c77f4ba940c9b79a',
    callbackURL: "http://localhost:8080/api/users/github"
  },
  async(accessToken, refreshToken, profile, done) => {
    try {
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
            first_name: 'prueba',
            last_name: 'test',
            email: primaryEmail.email,
            password: 'asdfasd',
            from_github: true,
            githubId: profile.id, // Utiliza el id de GitHub como identificador único
        };

        const createdUser = await usersManager.createOne(newUser);
        done(null, createdUser);
    } catch (error) {
        console.error("Error en la estrategia de GitHub:", error);
        done(error)
    }
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
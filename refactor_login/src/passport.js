import passport from "passport";
import { usersManager } from "./dao/db/managersDB/usersManagerDB.js";
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
            const userDb = await usersManager.findByEmail(email);
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
    passReqToCallback: true, // Necesito si o si pasar los datos del req, para poder verificar los datos del usuario y cargar sus productos
    },
    async (req, email, password, done) =>{
        //El req.session no persisten despues del done, asi que los comente
        try {
            if(!email){
                //req.session.errorLogin  = "Enter a valid email";
                return done(null, false);
            }
            const userDb = await usersManager.findByEmail(email);
            if(!userDb){
                //req.session.errorLogin  = "This email is not registered";
                return done(null, false);
            }
            const isValid = await comparedData(password, userDb.password);
            if(!isValid){
                //req.session.errorLogin  = "Email and password do not match";
                return done(null, false);
            }
            // req.session.email = userDb.email; 
            // req.session.first_name = userDb.first_name;
            // req.session.last_name = userDb.last_name;
            
            done(null,userDb);
        } catch (error) {
            console.log("error: ",error);
            return done(null, false)
        }
    }
    )
);

// GITHUB

passport.use('github', new GithubStrategy({
    clientID: 'Iv1.51aa35b49e6e146d',
    clientSecret: '8f860f527b81f1925223b5b763cc5cd57a192fb5',
    callbackURL: "http://localhost:8080/apiDb/users/github"
  },
  async(accessToken, refreshToken, profile, done) => {
    console.log('profile', profile);
    console.log("email",profile.email);
    try {

        // Hago una llamada adicional para obtener el correo electrónico
        const emailResponse = await fetch('https://api.github.com/user/emails', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const emails = await emailResponse.json();
        const primaryEmail = emails.find(email => email.primary);

        const userDB = await usersManager.findByEmail(primaryEmail.email);
        // login
        if(userDB){
            if(userDB.from_github){
                return done(null,userDB);
            } else {
                return done(null, false);
            }
        }
        console.log("email",profile.email);
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
        done(error)
    }
  }
));





passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(async function(id, done) {
    try {
       const user = await usersManager.findById(id);
       done(null,user); 
    } catch (error) {
       done(error)
    }
  });
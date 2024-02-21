import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { usersManager } from "./managers/usersManager.js";
import { cartsManager } from "./managers/cartsManager.js";
import config from "./config.js";
import { generateToken, hashData, comparedData } from "./utils.js";


passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: config.google_client_id,
      clientSecret: config.google_client_secret,
      callbackURL: config.google_callback_url,
    },
    async (accessToken, refreshToken, profile, done) => {
            console.log("profile", profile);

            try {
                const user = await usersManager.findByEmail(profile._json.email);
                //login
                if (user) {
                if (user.fromGoogle) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
                }
                // signup
                const createdCart = await cartsManager.createOne({ products: [] });
                const infoUser = {
                first_name: profile._json.given_name,
                last_name: profile._json.family_name,
                email: profile._json.email,
                password: " ",
                cart: createdCart._id,
                fromGoogle: true,
                };
                const createdUser = await usersManager.createOne(infoUser);
                done(null, createdUser);
            } catch (error) {
                done(error);
            }
            done(null, false);
        }
    )
);


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
          //console.log("soy el req.body",req.body);

          const createdCart = await cartsManager.createOne({ products: [] });
          const hashedPassword = await hashData(password);
          const createdUser = await usersManager.createOne({
              ...req.body, 
              password:hashedPassword,
              cart: createdCart._id});
              
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
          const userDb = await usersManager.findByEmail(email);
          if(!userDb){
              return done(null, false);
          }
          const isValid = await comparedData(password, userDb.password);
          if(!isValid){
              return done(null, false);
          }
          const token = generateToken({ 
            email, 
            first_name: userDb.first_name,
            role: userDb.role,
          });
          done(null, {...userDb,token})
          //done(null,userDb); 
      } catch (error) {
          console.log("entre al error");
          done(error)
      }
  }
  )
);

// router.post("/signup", async (req, res) => {
//   const { first_name, last_name, email, password } = req.body;
//   if (!first_name || !last_name || !email || !password) {
//     return res.status(400).json({ message: "All data is required" });
//   }
//   try {
//     const createdCart = await cartsManager.createOne({ products: [] });
//     const createdUser = await usersManager.createOne({
//       ...req.body,
//       cart: createdCart._id,
//     });
//     res.redirect(`/views/products/`);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { first_name, last_name, email, password } = req.body;
//   if (!first_name || !last_name || !email || !password) {
//     return res.status(400).json({ message: "All data is required" });
//   }
//   try {
//     const createdCart = await cartsManager.createOne({ products: [] });
//     const createdUser = await usersManager.createOne({
//       ...req.body,
//       cart: createdCart._id,
//     });
//     res.redirect(`/home/${createdUser._id}`);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersManager.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

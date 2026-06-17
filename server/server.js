// Import Express framework
import express from "express";
// Import CORS middleware
import cors from "cors";
// Import dotenv for environment variables
import env from "dotenv";
// Import PostgreSQL connection
import db from "./db.js";
// Import body-parser middleware
import bodyParser from "body-parser";
// Import bcrypt for password hashing
import bcrypt from "bcrypt";
// Import Passport authentication
import passport from "passport";
// Import Local Strategy for email/password login
import {Strategy as LocalStrategy} from "passport-local";
// Import Google OAuth strategy
import GoogleStrategy from "passport-google-oauth2";
// Import session middleware
import session from "express-session";
// Load environment variables from .env
env.config();
// Create Express application
const app = express();
// Server port
const PORT = process.env.PORT || 5000;

// Salt rounds for bcrypt hashing
const saltRounds = 10;

// =========================
// MIDDLEWARE
// =========================

// Enable CORS for frontend
app.use(cors({
    // Frontend URL
    origin: process.env.CLIENT_URL,
    // Allow cookies/sessions
    credentials: true,
  })
);
// Parse incoming JSON data
app.use(express.json());
// Parse URL encoded data
app.use(express.urlencoded({extended: true}));

// =========================
// SESSION CONFIGURATION
// =========================
app.use(session({
    // Secret key for sessions
    secret:
      process.env.SESSION_SECRET,
    // Prevent unnecessary session saving
    resave: false,
    // Do not save empty sessions
    saveUninitialized: false,
    cookie: {
      // false for localhost
      secure: false,
      // Prevent JS access to cookie
      httpOnly: true,
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
// Enable session support
app.use(passport.session());

// =========================
// PASSPORT SESSION STORAGE
// =========================

// Store user id in session
passport.serializeUser((user, done) => {
    done(null, user.id);
  }
);

// Retrieve user from database
passport.deserializeUser(async (id, done) => {
    try {
      const result =
        await db.query("SELECT * FROM users WHERE id = $1", [id]);
      done(null, result.rows[0]);
    } catch (err) {
      done(err, null);
    }
  }
);

// =========================
// LOCAL STRATEGY
// =========================

passport.use(new LocalStrategy(
    {
      // Tell passport to use email
      usernameField: "email",
      // Password field name
      passwordField: "password",
    },
    async (email,password,done) => {
      try {
        console.log(email);
        console.log(password);
        // Find user by email
        const result = await db.query("SELECT * FROM users WHERE email = $1",[email]);
        // User not found
        if (result.rows.length === 0) {
          return done(null,false,{ message: "User not found" } );
        }
        // Extract user
        const user = result.rows[0];
        // Compare entered password
        // with hashed password
        const validPassword = await bcrypt.compare(password,user.password);
        // Wrong password
        if (!validPassword) {
          return done(null, false, { message:  "Incorrect password", });
        }
        // Successful login
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// =========================
// GOOGLE AUTH STRATEGY
// =========================

passport.use(new GoogleStrategy.Strategy(
    {
      // Google client id
      clientID:
        process.env.GOOGLE_CLIENT_ID,
      // Google client secret
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,
      // Redirect URL after login
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken,refreshToken,profile,done) => {
      try {
        // Get Google email
        const email = profile.emails[0].value;
        // Check if user exists
        const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
        let user;
        // Create new user if not found
        if (result.rows.length === 0 ) {
          const newUser = await db.query(`INSERT INTO users (email, password)  VALUES ($1, $2) RETURNING *`,
              // Store placeholder password
              [email, "google-auth"] );
          user =  newUser.rows[0];
        } else {
          // Existing user
          user = result.rows[0];
        }
        // Login successful
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// =========================
// AUTH MIDDLEWARE
// =========================

// Protect routes from unauthenticated users
function isAuthenticated( req, res, next) {
  // If logged in
  if (req.isAuthenticated()) {
    return next();
  }
  // If not logged in
  return res.status(401).json({
    error: "Unauthorized",
  });
}

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.send("API running");
});

// =========================
// GET ALL NOTES
// =========================
app.get("/notes",isAuthenticated,async (req, res) => {
    try {
      // Fetch notes belonging to current user
      const result =
        await db.query(`SELECT * FROM notes WHERE user_id = $1 ORDER BY id DESC`, [req.user.id]);
      // Send notes to frontend
      res.json(result.rows);
    } catch (err) {
      console.log(err);
    }
  }
);

// =========================
// CREATE NOTE
// =========================

app.post("/notes",isAuthenticated,async (req, res) => {
    // Extract note data
    const { title, content } = req.body;
    try {
      // Insert note into database
      const result =
        await db.query(`INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *`,[title, content, req.user.id,  ]);
      // Send created note back
      res.json(result.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }
);

// =========================
// DELETE NOTE
// =========================
app.delete("/notes/:id",isAuthenticated,async (req, res) => {
    // Extract note id
    const noteId = req.params.id;
    try {
      // Delete only if note belongs to user
      await db.query(`DELETE FROM notes WHERE id = $1 AND user_id = $2`, [ noteId, req.user.id, ] );
      res.json({
        message: "Deleted",
      });
    } catch (err) {
      console.log(err);
    }
  }
);

// =========================
// REGISTER USER
// =========================
app.post("/register", async (req, res) => {
    try {
      // Extract registration data
      const { email, password } = req.body;
      // Validate fields
      if ( !email || !password ) {
        return res.status(400).json({
          error:
            "All fields required",
        });
      }
      // Check existing user
      const checkUser = await db.query("SELECT * FROM users WHERE email = $1",[email]);
      // Prevent duplicate accounts
      if (checkUser.rows.length > 0) {
        return res.status(400).json({
          error:
            "Email already exists",
        });
      }
      // Hash password securely
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // Insert new user
      const result = await db.query(`INSERT INTO users(email, password) VALUES($1, $2) RETURNING *`, [ email,  hashedPassword ] );
      // Send success response
      res.status(201).json({
        message:"Registration successful",
        user: {
          id:
            result.rows[0].id,
          email:
            result.rows[0].email,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

// =========================
// LOGIN ROUTE
// =========================
app.post( "/login",(req, res, next) => {
    console.log("BODY:",req.body);
    // Authenticate using local strategy
    passport.authenticate("local", (err, user, info) => {
        console.log("ERR:", err);
        console.log("USER:", user);
        console.log("INFO:", info);
        // Internal error
        if (err) {
          return res.status(500).json({
            error: err.message,
          });
        }
        // Authentication failed
        if (!user) {
          return res.status(400).json({
            error:
              info?.message ||
              "Login failed",
          });
        }
        // Create session
        req.login(user,(err) => {
            if (err) {
              return res.status(500).json({
                error: err.message,
              });
            }
            // Login successful
            return res.json({
              message:
                "Login successful",
            });
          }
        );
      }
    )(req, res, next);
  }
);

// =========================
// GOOGLE LOGIN ROUTE
// =========================
app.get("/auth/google",passport.authenticate("google",
    {
      scope: [
        "profile",
        "email"
      ],
    }
  )
);

// =========================
// GOOGLE CALLBACK ROUTE
// =========================

app.get("/auth/google/callback",passport.authenticate("google",
    {
      failureRedirect:
        "/login",
    }
  ),
  (req, res) => {
    // Redirect to frontend after success
    res.redirect(
      `${process.env.CLIENT_URL}/notes`
    );
  }
);

// =========================
// LOGOUT ROUTE
// =========================

app.post("/logout",(req, res) => {
    // Remove passport session
    req.logout((err) => {
      if (err) {
        return res.status(500).json({
          error:
            "Logout failed",
        });
      }
      // Destroy session completely
      req.session.destroy(() => {
        // Remove session cookie
        res.clearCookie(
          "connect.sid"
        );
        return res.json({
          message:
            "Logout successful",
        });
      });
    });
  }
);

// =========================
// CHECK AUTH STATUS
// =========================

app.get("/check-auth",
  (req, res) => {
    res.json({
      authenticated:
        req.isAuthenticated(),
      user:
        req.user || null,
    });
  }
);

// =========================
// EDIT NOTE
// =========================

app.put("/notes/:id",isAuthenticated,async (req, res) => {
    // Extract note id
    const noteId = req.params.id;
    // Extract updated data
    const { title,content } = req.body;
    try {
      // Update note only if it belongs to current user
      const result = await db.query(`UPDATE notes SET title = $1,  content = $2 WHERE id = $3 AND user_id = $4 RETURNING *`,
         [ title, content,  noteId, req.user.id, ] );
      // Send updated note
      res.json(result.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error:"Failed to update note",});
    }
  }
);

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log( `Server running on port ${PORT}`);
});
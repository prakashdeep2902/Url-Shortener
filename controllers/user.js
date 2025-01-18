import Users from "../models/Users.js";
import { v4 as uuidv4 } from "uuid";
import { setUsers, getUsers } from "../utils/auth.js";

// Handle Signup
async function handleSignup(req, res) {
  try {
    const { Name, Mobile, Email } = req.body;

    // Validate input
    if (!Name || !Mobile || !Email) {
      return res.status(400).render("signup", {
        error:
          "All fields are required. Please provide Name, Mobile, and Email.",
      });
    }

    // Check if user already exists
    const existingUser = await Users.findOne({ UserEmail: Email });
    if (existingUser) {
      return res.status(400).render("signup", {
        error: "A user with this email already exists. Please log in instead.",
      });
    }

    // Create new user
    const userDetails = new Users({
      UserName: Name,
      UserMobileNo: Mobile,
      UserEmail: Email,
    });

    await userDetails.save();

    return res.status(201).render("signup", {
      success: "User created successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).render("signup", {
      error: "Internal server error. Please try again later.",
    });
  }
}

// Handle Login
async function handleLogin(req, res) {
  try {
    const { Name, Phone } = req.body;

    // Validate input
    if (!Name || !Phone) {
      return res.status(400).render("login", {
        error: "Both Name and Mobile Number are required.",
      });
    }

    // Check if user exists
    const user = await Users.findOne({ UserMobileNo: Phone });
    if (!user) {
      return res.status(404).render("login", {
        error: "User not found. Please check your details or sign up.",
      });
    }

    // Successful login
    const sessionId = uuidv4();
    setUsers(sessionId, user);
    res.cookie("uuid", sessionId);
    return res.status(200).redirect("/home");
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).render("login", {
      error: "Internal server error. Please try again later.",
    });
  }
}

export { handleSignup, handleLogin };

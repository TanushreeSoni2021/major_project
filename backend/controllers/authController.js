import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

//register function
export const registerController = async (req, resp) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validation
    if (!name) {
      return resp.send({ error: "Name is required" });
    }
    if (!email) {
      return resp.send({ error: "Email is required" });
    }
    if (!password) {
      return resp.send({ error: "Password is required" });
    }
    if (!phone) {
      return resp.send({ error: "Phone is required" });
    }
    if (!address) {
      return resp.send({ error: "Address is required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });

    //existing user
    if (exisitingUser) {
      return resp.status(200).send({
        success: true,
        message: "Already Register please Login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    //response send
    resp.status(201).send({
      success: true,
      message: "User register Successfully",
      user,
    });
  } catch (error) {
    console.log(`Error in Registration ${error}`);
    resp.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//login function
export const loginController = async (req, resp) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      resp.status(404).send({
        success: false,
        message: "Invalid email and password",
      });
    }
    // chedck user
    const user = await userModel.findOne({ email });
    if (!user) {
      return resp.ststus(404).send({
        success: false,
        message: "Email is not Registred",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return resp.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    //token
    const token = await JWT.sign(
      { _id: userModel._id },
      process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: "7d",
      }
    );
    resp.status(200).send({
      success: true,
      mesage: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(`Error in Login ${error}`);
    resp.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

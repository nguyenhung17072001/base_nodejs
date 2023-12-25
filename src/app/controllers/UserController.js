import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import mongoose from 'mongoose';
import { generateToken } from '../../middleware/auth.js'



const registerUser = asyncHandler(async (req, res) => {
    const { username, fullName, phoneNumber, address, password, } = req.body;
    try {
        const userExits = await User.findOne({ username });

        if (userExits) {
            res.status(400);
            throw new Error(
               'fullName already exists, please register with another fullName address'
            );
        }
        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            username,
            fullName,
            phoneNumber,
            address,
            password,

        });
  

        if (user) {
            res.status(201).json({
                status: 201,
                message: "Success",
                data: {
                    _id: user._id,
                    username: user.username,
                    fullName: user.fullName,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                    role: user.role,
                    token: generateToken(user._id), _id: user._id,
                }
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        res.status(400).json({ 
            status: 400,
            message: error.message
        });
        
    }
  });
  
  // login useer
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && user.password === password) {
            res.status(200).json({
                status: 200,
                message: "Success",
                data: {
                    _id: user._id,
                    fullName: user.fullName,
                    username: user.username,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                    role: user.role,
                    token: generateToken(user._id),
                }
            });
        } else {
            res.status(401).json({ 
                status: 401,
                message: 'Invalid username or password' 
            });
        }
    } catch (error) {
        res.status(400).json({ 
            status: 400,
            message: 'Invalid username or password' 
        });
    }
});



export {
    registerUser,
    loginUser,

}
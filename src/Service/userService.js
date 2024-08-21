import { findIndexById } from "./../Common/Helper.js";
import userModel from "../Model/userModel.js";
import {ObjectId} from 'mongodb'


const getAlluser = async (req, res) => {
  try {
    let users = await userModel.findAll();
    res.status(200).send({
      message: "All users fetched successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error fetching users",
    });
  }
};

const getUserid = async (req, res) => {
  try {
    const {id} = req.params;
    let user = await userModel.findByFilter({_id:ObjectId.createFromHexString(id)})

    // let index = findIndexById(users, Number(id));
    if (user) {
      res.status(200).send({
        message: "Data fetch successful",
        data:user
      })
    } else {
      res.status(400).send({
        message: `User ID not found`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    let dob = new Date(req.body.dob);
    console.log(dob);
    let today = new Date();
    // req.body.id = users.length ? users[users.length - 1].id + 1 : 1;
    req.body.age = Math.abs(today.getFullYear() - dob.getFullYear());

    await userModel.create(req.body)

    res.status(201).send({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating user",
      error: error,
    });
  }
};

const editUserbyId = async(req, res) => {
  try {
    let { id } = req.params;

     let user = await userModel.findByFilter({_id:ObjectId.createFromHexString(id)})
    if (user) {
      let dob = new Date(req.body.dob);

      let today = new Date();
      req.body.id = Number(id);
      req.body.age = Math.abs(today.getFullYear() - dob.getFullYear());

      await userModel.editById({_id:ObjectId.createFromHexString(id)},req.body)

      res.status(200).send({
        message: "User updated successfully",
      });
    } else {
      res.status(404).send({
        message: `${req.params.id} is inValid user`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error fetching user",
      error: err,
    });
  }
};

const deleteUserById = async(req, res) => {
  try {
    let { id } = req.params;
    
    let user = await userModel.findByFilter({_id:ObjectId.createFromHexString(id)})
    if (user) {
     await userModel.deleteById({_id:ObjectId.createFromHexString(id)})
      res.status(200).send({
        message: "User deleted successfully",
      });
    } else {
      res.status(404).send({
        message: `${req.params.id} is notValid user`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error deleting user",
      error: err,
    });
  }
};

export default {
  getAlluser,
  getUserid,
  createUser,
  editUserbyId,
  deleteUserById,
};

import { findIndexById } from "./../Common/Helper.js";
const users = [
  { id: 1, name: "John", age: 25, dob: "20-05-1999" },
  { id: 2, name: "Jane", age: 30, dob: "20-05-1994" },
  { id: 3, name: "Bob", age: 35, dob: "20-05-1989" },
];

const getAlluser = (req, res) => {
  try {
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

const getUserid = (req, res) => {
  try {
    const { id } = req.params;
    let index = findIndexById(users, Number(id));
    if (index !== -1) {
      res.status(200).send({
        message: "Data fetch successful",
        data: users[index],
      });
    } else {
      res.status(400).send({
        message: `User ID  ${req.params.id} not found`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error fetching users",
    });
  }
};

const createUser = (req, res) => {
  try {
    let dob = new Date(req.body.dob);
    console.log(dob);
    let today = new Date();
    req.body.id = users.length ? users[users.length - 1].id + 1 : 1;
    req.body.age = Math.abs(today.getFullYear() - dob.getFullYear());

    users.push(req.body);

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

const editUserbyId = (req, res) => {
  try {
    let { id } = req.params;
    let index = findIndexById(users, Number(id));
    if (index !== -1) {
      let dob = new Date(req.body.dob);

      let today = new Date();
      req.body.id = Number(id);
      req.body.age = Math.abs(today.getFullYear() - dob.getFullYear());

      users.splice(index, 1, req.body);

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

const deleteUserById = (req, res) => {
  try {
    let { id } = req.params;
    let index = findIndexById(users, Number(id));
    if (index !== -1) {
      users.splice(index, 1);
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

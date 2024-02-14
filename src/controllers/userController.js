const { ValidationError } = require('sequelize');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator();
const { userSchema } = require('../tools/schema');

async function getUsers(req, res) {
    try {
        const users = await User.findAll();

        res.json(users);
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error!'});
        // console.error('Error retrieving users: ', error);
    }
}

async function addUser(req, res) {
    try {
        const validate = v.validate(req.body, userSchema);

        if (validate.length) {
            return res.status(400).json({data: validate});
        }

        const { username, email, password, role } = req.body;

        await User.create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 8),
            role: role,
        });

        res.json({ message: 'Data user was Inserted' });
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error!'});
        // console.error('Error store user: ', error);
    }
}

async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        res.json(user ?? {});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error!'});
        // console.error('Error show detail user: ', error);
    }
}

async function updateUserById(req, res) {
    try {
        const id = req.params.id;
        delete userSchema.password;
        const validate = v.validate(req.body, userSchema);

        if (validate.length) {
            return res.status(400).json({message: validate});
        }

        const { username, email, role } = req.body;
        const user = await User.findByPk(id);

        if (!user) {
            return res.json({ message: 'Data not found!' });
        }

        const updatedUser = await user.update({
            username: username,
            email: email,
            role: role,
        });

        res.json(updatedUser ?? {});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error!'});
        // console.error('Error update user: ', error);
    }
}

async function deleteUserById(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (!user) {
            return res.json({ message: 'Data not found!' });
        }

        await user.destroy(id);

        res.json({ message: 'Data was deleted' });
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error!'});
        // console.error('Error update user: ', error);
    }
}

module.exports = {
    getUsers,
    addUser,
    getUserById,
    updateUserById,
    deleteUserById
}
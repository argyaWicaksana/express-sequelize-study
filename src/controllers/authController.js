const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('dotenv').config();

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            where: { username: username }
        });

        const isValid = user && bcrypt.compareSync(password, user.password);

        if (!isValid) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign({
            sub: user.id,
            role: user.role
        }, process.env.API_SECRET);

        res.json({ accessToken: token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}

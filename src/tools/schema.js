let userSchema = {
    username: 'string',
    email: 'email',
    password: 'string',
    role: {
        type: "array",
        items: 'string',
        enum: ["user", "admin"],
    }
}

module.exports = {
    userSchema,
}

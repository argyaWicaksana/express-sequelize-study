let userSchema = {
    username: 'string',
    email: 'email',
    password: 'string',
    role: {
        type: "string",
        items: 'string',
        enum: ["user", "admin"],
    }
}

module.exports = {
    userSchema,
}

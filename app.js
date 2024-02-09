const express = require('express');
const routesUser = require('./src/routes/userRoutes');
const routesAuth = require('./src/routes/authRoutes');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
}));
app.use('/user', routesUser);
app.use('/auth', routesAuth);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv').config();

const applyRoutes = require('./Server/routes');
app.use(cors())
app.use(express.json());

applyRoutes(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
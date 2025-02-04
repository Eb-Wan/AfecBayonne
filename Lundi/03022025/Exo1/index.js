const axios = require("axios");
const express = require("express");
const app = express();
app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api/users", (req, res) => {
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(result => res.status(200).json({ success: true, data: result.data }))
    .catch(error => res.status(500).json({ success: false, message: error.message }));
});
app.post("/api/echo", (req, res) => {
    res.status(200).json({ success:true, data: req.body })
});

app.listen(3000, () => console.log("Server is listening on 3000"));
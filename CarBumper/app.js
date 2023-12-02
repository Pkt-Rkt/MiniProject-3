// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const carRoutes = require('./routes/carRoutes');
const { fetchDataFromApi } = require('./controllers/carController');
const config = require('./config');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Middleware
app.use(bodyParser.json());

// Fetch data from API and populate the database on startup
fetchDataFromApi('civic')
    .then(data => console.log('Data fetched:', data))
    .catch(error => console.error('Error fetching data:', error));

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Car API',
            version: '1.0.0',
            description: 'API documentation for the car database',
        },
    },
    apis: ['./routes/carRoutes.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', carRoutes);

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));

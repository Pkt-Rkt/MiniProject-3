const Car = require('../models/carModel');
const axios = require('axios');

const API_KEY = '7++1VbvY79tKe4aFiOVrvA==jqDy7GBE5HckJllx';
const API_BASE_URL = 'https://api.api-ninjas.com/v1/cars';

async function fetchDataFromApi(model) {
    try {
        const response = await axios.get(`${API_BASE_URL}?limit=50&model=${model}`, {
            //change model number back after testing
            headers: { 'X-Api-Key': API_KEY }
        });
        const data = response.data;
        // Save data to the database
        await Car.insertMany(data);
        return data;
    } catch (error) {
        throw error;
    }
}

async function getAllCars(req, res) {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getCarsByCriteria(req, res) {
    try {
        const { make, model, fuel_type, drive, cylinders, transmission, year } = req.query;

        const query = {};

        if (make) query.make = make;
        if (model) query.model = model;
        if (fuel_type) query.fuel_type = fuel_type;
        if (drive) query.drive = drive;
        if (cylinders) query.cylinders = cylinders;
        if (transmission) query.transmission = transmission;
        if (year) query.year = year;

        const cars = await Car.find(query);
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateCar(req, res) {
    try {
        const { id } = req.params;
        const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedCar);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteCar(req, res) {
    try {
        const { id } = req.params;
        await Car.findByIdAndDelete(id);
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    fetchDataFromApi,
    getAllCars,
    getCarsByCriteria,
    updateCar,
    deleteCar,
};

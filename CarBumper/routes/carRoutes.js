// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         make:
 *           type: string
 *         model:
 *           type: string
 *         fuel_type:
 *           type: string
 *         drive:
 *           type: string
 *         cylinders:
 *           type: integer
 *         transmission:
 *           type: string
 *         year:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: API to manage cars
 */

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Returns the list of all cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
router.get('/cars', carsController.getAllCars);

/**
 * @swagger
 * /api/cars/filter:
 *   get:
 *     summary: Get cars based on filter criteria
 *     tags: [Cars]
 *     parameters:
 *       - in: query
 *         name: make
 *         schema:
 *           type: string
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *       - in: query
 *         name: fuel_type
 *         schema:
 *           type: string
 *       - in: query
 *         name: drive
 *         schema:
 *           type: string
 *       - in: query
 *         name: cylinders
 *         schema:
 *           type: integer
 *       - in: query
 *         name: transmission
 *         schema:
 *           type: string
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the list of cars based on filter criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
router.get('/cars/filter', carsController.getCarsByCriteria);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated car information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Returns the updated car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 */
router.put('/cars/:id', carsController.updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 */
router.delete('/cars/:id', carsController.deleteCar);

module.exports = router;

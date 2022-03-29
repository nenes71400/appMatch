const express = require('express');
const connection = require("./connection.js");
const tournoisRoute = require('./routes/tournois');
const clubsRoute = require('./routes/clubs');
const categoriesRoute = require('./routes/categories');
const categoriesTournoiRoute = require('./routes/categories_tournoi.js');
const clubsTournoiRoute = require('./routes/clubs_tournoi.js');
const equipesTournoiRoute = require('./routes/equipes_tournoi.js');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/tournois', tournoisRoute);
app.use('/clubs', clubsRoute);
app.use('/categories', categoriesRoute);
app.use('/categoriesTournoi', categoriesTournoiRoute);
app.use('/clubsTournoi', clubsTournoiRoute);
app.use('/equipesTournoi', equipesTournoiRoute);

module.exports = app;


//import express from 'express';
//import bodyParser from 'body-parser';
//import tournoisRoutes from './routes/tournois.js';
//
//const app = express();
//const PORT = 5000;
//
//app.use(bodyParser.json());
//
//app.use('/tournois', tournoisRoutes);
//
//app.get('/', (req, res) => {
//  console.log('[TEST]!');
//  res.send('Hello from HomePage.');
//})
//
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//

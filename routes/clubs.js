const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.get('/read', (req, res, next) => {
  var query = "select id, nom, ville from club";
  console.log(query);
  connection.query(query, (err, results) => {
    if(!err){
      return res.status(200).json(results);
    }
    else{
      return res.status(500).json(err);
    }
  })
});

router.get('/read/:id', (req, res, next) => {
  //var query = `select * from club where club.id=? into outfile /images/clubs/logo_id${req.params.id}.jpg`;
  var query = "select id, nom, ville from club where club.id=?";
  console.log(query + " " + req.params.id);
  connection.query(query, [req.params.id], (err, results) => {
    if(!err){
      return res.status(200).json(results.pop());
    }
    else{
      return res.status(500).json(err);
    }
  })
});

router.post('/create', (req, res, next) => {
  //console.log("CREATE");
  //console.log(req.body);
  let club = req.body;
  var query = "insert into club (nom, ville, logo) values(?,?,?)";
  connection.query(query, [club.nom, club.ville, null], (err, results) => {
    if (!err){
      //console.log("AJOUT OK")
      return res.status(200).json({message: "Club ajouté avec succes"});
    }
    else
      //console.log("AJOUT NOK")
      return res.status(500).json(err);
  });
});

//router.patch('/update/:id', (req, res, next) => {
//  const id = req.params.id;
//  let tournoi = req.body;
//  var query = "update tournoi set nom=?, date=? where id=?";
//  connection.query(query, [tournoi.nom, tournoi.date, id], (err, results) => {
//    if (!err){
//      if (results.affectdRows == 0){
//        return res.status(404).json({message:"Tournoi id does not found"});
//      }
//      return res.status(200).json({message: "Tournoi Update Successfully"});
//    } else{
//      return res.status(500).json(err);
//    }
//  });
//});


module.exports = router;


//import express from 'express';
//
//const router = express.Router();
//
//// all routes in here are starting whith /tournois
//
//const tournois = [
//  {
//    "nom": "Test",
//    "date": "01/01/2022",
//    "lieu": "Autun"
//  },
//  {
//    "nom": "Test 2",
//    "date": "02/02/2022",
//    "lieu": "Chalon sur Saone"
//  }
//]
//
//router.get('/', (req, res) => {
//  console.log(tournois);
//  res.send(tournois);
//});
//
//router.post('/', (req, res) => {
//  console.log('POST ROUTE REACHED');
//  console.log(req.body);
//
//  const  tournoi = req.body;
//  tournois.push(tournoi);
//  res.send(`Tournoi ${tournoi.nom} added`);
//  //res.send('POST ROUTE REACHED');
//});
//
////router.delete('/:id', (req, res) => {
////  const { id } = req.params;
////
////  tournois.tournois.filter((tournoi) => tournoi.id{
////
////  })
////});
//
//export default router;
//


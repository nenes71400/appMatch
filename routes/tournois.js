const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.get('/read', (req, res, next) => {
  var query = "select * from tournoi order by date desc";
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
  var query = "select * from tournoi where tournoi.id=?";
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

//--------------------------------------------------------
let lastID = async function () {
  return new Promise(function (resolve, reject) {
    var query = "select last_insert_id() as id";
    connection.query(query, (err, results) => {
      if (!err){
        //console.log("lastIDOK")
        resolve(results)
      } else {
        //console.log("LASIDNOK")
        reject(err)
      }
    });
  })
}

let create = async function (req, res) {
  // On renvoie une promesse qui prend en paramettre une fonction
  // avec 2 paramètres, le callback de succès et d'erreur
  return new Promise(function (resolve, reject) {
    let tournoi = req.body;
    var query = "insert into tournoi (nom, date, ville) values(?,?,?)";
    connection.query(query, [tournoi.nom, tournoi.date, tournoi.ville], (err, results) => {
      if (!err){
        //console.log("AJOUT OK")
        resolve(res.status(200).json({message: "Tournoi ajouté avec succes"}))
      } else {
        //console.log("AJOUT NOK")
        reject(res.status(500).json(err))
      }
    });
  })
}

let createCategorie = async function (res) {
  return new Promise(function (resolve, reject) {
    console.log("cat add")
    console.log(res)
    let err = false
    if (!err){
      resolve("true")
    } else {
      reject("false")
    }
  })
}

router.post('/create', (req, res, next) => {
  create(req, res)
  .then(function (response) {
    // Le serveur a correctement répondu
    //console.log("reponse create")
    //console.log(response)
    lastID()
    .then(function(response){
      //console.log("reponse lastID")
      //console.log(response)
      //results[0]['id']
      createCategorie(response)
      .then(function (response){
        console.log(response)
      }).catch(function (cat){
        console.log(cat)
      })
    }).catch(function (req) {

    })
  }).catch(function (req) {
  // Le serveur n'a pas répondu comme attendu
  })

/*
  console.log(req.body);
  let tournoi = req.body;
  //var query = "insert into tournoi (nom, date, ville) values(?,?,?);select last_insert_id();";
  var query = "insert into tournoi (nom, date, ville) values(?,?,?)";
  connection.query(query, [tournoi.nom, tournoi.date, tournoi.ville], (err, results) => {
    if (!err){
      console.log("AJOUT OK")
      //let tmp = aPromise();
      //console.log(aPromise)
      //console.log(tmp);
      return res.status(200).json({message: "Tournoi ajouté avec succes"});
    } else {
      //console.log("AJOUT NOK")
      //console.log(err)
      return res.status(500).json(err);
    }
  });
*/
});

module.exports = router;

var express = require("express"), cors = require('cors');
var app = express();
app.use(express.json());
app.use(cors());
app.listen(3000,() => console.log("serve running on port 3000"));

var ciudades = [ "Paris","Barcelona", "Barranquilla",
"Montevideo", "Santiago de Chile", "México DF", "New York", "Ankara", "Moscú", "Berlín", "Bogotá",
"Brasilia", "Sao Paulo" ];

app.get("/ciudades", (req, res, next) => res.json (ciudades.filter((c)=> c.toLowerCase().indexOf(
    req.query.q.toString().toLocaleLowerCase()) > -1)));

var misDestinos = [];

app.get("/my",(req, res, next) => res.json(misDestinos));
app.post("/my",(req, res, next) => {

    console.log(req.body.nuevo);
    misDestinos.push(req.body.nuevo)
    //misDestinos = req.body;
    res.json(misDestinos);
});


//curl -d '["Buenos Aires"]' -H 'Content-type: application/json' http://localhost:3000/my

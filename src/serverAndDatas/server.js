const { request, response } = require('express');
const studentData = require('../serverAndDatas/students.json')
const express = require("express"),
    bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use((request, response, next) => {
    console.log('someone requested to server');
    next()
})

app.use(bodyParser.urlencoded({ extended: true }));


app.all("/students", (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "*");
    let str = JSON.stringify(studentData);
    response.send(str);
});


app.all("/students1", (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
    const reqData = request.body;
    return response.send(reqData);
});


app.listen(5001, (error) => {
    if (!error) console.log('server already started');
})
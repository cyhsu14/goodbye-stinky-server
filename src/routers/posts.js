const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const postModel = require('../model/posts.js');
// const voteModel = require('../model/votes.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// List
router.get('/posts', function(req, res, next) {
    // const {searchText, start} = req.query;
    var isRefrige = req.query.isRefrige;
    // console.log(isRefrige);
    postModel.list(isRefrige).then(posts => {
        res.json(posts);
    }).catch(next);
});

// Create
router.post('/posts', function(req, res, next) {
    var isRefrige = req.query.isRefrige;

    var name = req.body.name;
    var category = req.body.category;
    var quantity = req.body.quantity;
    var unit = req.body.unit;
    var isSetDeadline = req.body.isSetDeadline;
    var deadline = req.body.deadline;
    var isAlarm = req.body.isAlarm;
    var alarmDate = req.body.alarmDate;
    var alarmTime = req.body.alarmTime;
    var text = req.body.text;

    if (!name) {
        const err = new Error('Food detail is required');
        err.status = 400;
        throw err;
    }
    postModel.create(isRefrige, name, category, quantity, unit, isSetDeadline, deadline, isAlarm, alarmDate,
        alarmTime, text).then(post => {
        res.json(post);
    }).catch(next);
});

//Update
router.post('/update', function(req, res, next) {
    var isRefrige = req.query.isRefrige;
    // const foodDetail = req.body;

    var id = req.body.id;
    var name = req.body.name;
    var category = req.body.category;
    var quantity = req.body.quantity;
    var unit = req.body.unit;
    var isSetDeadline = req.body.isSetDeadline;
    var deadline = req.body.deadline;
    var isAlarm = req.body.isAlarm;
    var alarmDate = req.body.alarmDate;
    var alarmTime = req.body.alarmTime;
    var text = req.body.text;

    // console.log(req.body.isSetDeadline);
    // console.log(isSetDeadline);

    if (!id) {
        const err = new Error('Food detail is required');
        err.status = 400;
        throw err;
    }
    postModel.update(isRefrige, id, name, category, quantity, unit, isSetDeadline, deadline, isAlarm, alarmDate,
        alarmTime, text).then(post => {
        res.json(post);
    }).catch(next);
});

//Delete
router.get('/posts/:id', function(req, res, next) {
    var isRefrige = req.query.isRefrige;

    var id = parseInt(req.params.id);
    // console.log(typeof(id));
    // console.log(req.params);
    if(!id){
        const err = new Error('ID is required');
        err.status = 400;
        throw err;
    }

    postModel.remove(isRefrige, id).then(
    ).catch(next);
});

// Vote
// router.post('/posts/:id/:mood(clear|clouds|drizzle|rain|thunder|snow|windy)Votes', function(req, res, next) {
//     const {id, mood} = req.params;
//     if (!id || !mood) {
//         const err = new Error('Post ID and mood are required');
//         err.status = 400;
//         throw err;
//     }
//     voteModel.create(id, mood).then(post => {
//         res.json(post);
//     }).catch(next);
// });

module.exports = router;

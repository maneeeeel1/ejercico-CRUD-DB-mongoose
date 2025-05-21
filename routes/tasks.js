const express = require("express");
const router = express.Router();
const Task = require("../models/task.js"); 


router.post("/create", async(req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create task" });
    }
});

router.get ("/", async (req, res) => {
    try {
        const task = await Task.find();
        res.json(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Error to task" });
    }
});

router.get ("/id/:_id", async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if(!task)return res.status(404).json({message: "Task not found"});
        res.json(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Error to create task" });
    }
});

router.put ("/markAsCompleted/:_id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, {completed: true});
        if(!task)return res.status(404).json({message: "Task not found"});
        res.json(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Error to update task" });
    }
});

router.get ("/id/:_id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id,
             {title: req.body.title},
             {new: true});
        if(!task)return res.status(404).json({message: "Task not found"});
        res.json(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Error to update task" });
    }
});

router.delete ("/id/:_id", async (req, res) => {
    try {
        const result = await Task.findByIdAndDelete(req.params._id);
        if(!result)return res.status(404).json({message: "Task not found"});
        res.json(result);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Error to delete task" });
    }
});


module.exports = router;
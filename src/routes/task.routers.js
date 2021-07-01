const { Router } = require('express');
const express = require('express')
const router = express.Router();

const Tasks = require('../models/task')

router.get('/', async (req, res) => {
    const tast = await Tasks.find()
    console.log(tast)
    res.json(tast)
 
})
router.get('/:id', async (req, res) => {
    const tast = await Tasks.findById(req.params.id)
    res.json(tast)
})

router.post('/', async (req, res) => {
    const{title, description} = req.body;
    const task = new Tasks({
        title, description
    })
    await task.save()
    console.log(task)
        res.json({status: 'Task saved'})
})

router.put('/:id', async (req, res) => {
    const{title, description} = req.body;
    const newTask = {title, description}
    await Tasks.findByIdAndUpdate(req.params.id, newTask)
    res.json({status: 'Task Updated'})
})

router.delete('/:id', async(req, res) => {
    await Tasks.findByIdAndRemove(req.params.id)
    res.json({status: 'Task Delete'})

})


module.exports = router;
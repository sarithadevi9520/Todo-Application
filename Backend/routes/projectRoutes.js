const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// ✅ POST Route (Create a Project)
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Project name is required' });

    const project = new Project({ name });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
    try {
      const projects = await Project.find();  // Fetch all projects
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;

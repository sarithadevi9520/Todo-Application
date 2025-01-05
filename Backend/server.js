const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());  // REQUIRED for POST requests
app.use(cors());

// Import Routes
const projectRoutes = require('./routes/projectRoutes');
const todoRoutes = require('./routes/todoRoutes');

// Use Routes
app.use('/api/projects', require('./routes/projectRoutes'));

app.use('/api/todos', todoRoutes);

const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/todoapp')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

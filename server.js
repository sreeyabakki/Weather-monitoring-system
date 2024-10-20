const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/weather_monitor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});

// Weather summary schema
const weatherSchema = new mongoose.Schema({
  city: String,
  date: String,
  avgTemp: Number,
  maxTemp: Number,
  minTemp: Number,
  dominantCondition: String
});

const WeatherSummary = mongoose.model('WeatherSummary', weatherSchema);

// API to store daily summary
app.post('/api/weather', async (req, res) => {
  const { city, date, avgTemp, maxTemp, minTemp, dominantCondition } = req.body;
  
  const summary = new WeatherSummary({
    city,
    date,
    avgTemp,
    maxTemp,
    minTemp,
    dominantCondition
  });

  try {
    await summary.save();
    res.status(201).send('Weather summary saved successfully');
  } catch (err) {
    res.status(500).send('Error saving weather summary:', err);
  }
});

// API to get daily summaries
app.get('/api/weather', async (req, res) => {
  try {
    const summaries = await WeatherSummary.find();
    res.json(summaries);
  } catch (err) {
    res.status(500).send('Error fetching weather summaries:', err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



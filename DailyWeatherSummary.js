const mongoose = require('mongoose');

const DailyWeatherSummarySchema = new mongoose.Schema({
    date: { type: String, required: true },
    averageTemperature: { type: Number, required: true },
    maximumTemperature: { type: Number, required: true },
    minimumTemperature: { type: Number, required: true },
    dominantCondition: { type: String, required: true },
});

module.exports = mongoose.model('DailyWeatherSummary', DailyWeatherSummarySchema);

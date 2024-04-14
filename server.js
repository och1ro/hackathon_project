const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/reviewdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected successfully");
});

// Define a schema for the Review
const reviewSchema = new mongoose.Schema({
    name: String,
    message: String,
    date: { type: Date, default: Date.now },
});

// Create a model from the schema
const Review = mongoose.model('Review', reviewSchema);

// Routes
app.post('/reviews', (req, res) => {
    const review = new Review(req.body);
    review.save()
        .then(() => res.status(201).send(review))
        .catch(err => res.status(400).send(err));
});

app.get('/reviews', (req, res) => {
    Review.find().then(reviews => res.send(reviews));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
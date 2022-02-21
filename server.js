const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');
const cors = require('cors')

const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});

console.log(nDate);

//Connect database
connectDB();

app.use(
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
  }))


//Init middleware
app.use(express.json({ extended: false }));


app.get('/', (req, res) => res.send('API running'));

// define routes
app.use('/api/food', require('./routes/api/food'));
app.use('/api/userfood', require('./routes/api/userfood'));
app.use('/api/externalapi', require('./routes/api/externalapi'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


//server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const connectDB = require('./config/database');
const PORT = process.env.PORT || 5000; // Use environment variable or port 5000 by default
const Movie = require('./models/movieSchema');
const Subscription = require('./models/subscribedUsers');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// // Define a hardcoded username and password for admin
const adminUsername = 'admin';
const adminPassword = 'password'; 

// Middleware to parse JSON body
app.use(express.json());

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to handle movie search
app.get('/api/search', async (req, res) => {
  try {
    const searchTerm = req.query.term;
    // Perform a case-insensitive search query in your MongoDB using Mongoose
    const movies = await Movie.find({
      title: { $regex: searchTerm, $options: 'i' } // Search by title
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login endpoint for admin
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the provided credentials match the admin username and password
  if (username === adminUsername && password === adminPassword) {
    // If credentials match, return a success response with a token
    // For simplicity, you can create a dummy token here
    const token = 'dummy-token';
    res.json({ token });
  } else {
    // If credentials do not match, return a 401 Unauthorized status
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Set up multer middleware for file uploads
const upload = multer({ dest: 'uploads/' });

  // Directory where uploaded files will be stored
  const uploadDirectory = path.join(__dirname, 'uploads');

  // Create the uploads directory if it doesn't exist
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
  }
  
    app.post('/api/upload', upload.single('image'), (req, res) => {
      const tempPath = req.file.path;
      const targetPath = path.join(__dirname, 'uploads', req.file.originalname);
    
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return res.status(500).send('Error saving file');
        res.send('File uploaded successfully');
      }); 
    });

    app.post('/api/movies', upload.single('image'), async (req, res) => {
        try {
            // Get the temporary path of the uploaded image
            const tempPath = req.file.path;
            
            // Specify the directory where the image will be saved
            const uploadDirectory = path.join(__dirname, 'uploads');
            
            // Create the uploads directory if it doesn't exist
            if (!fs.existsSync(uploadDirectory)) {
                fs.mkdirSync(uploadDirectory);
            }
    
            // Generate a unique name for the image file
            const imageName = `${Date.now()}-${req.file.originalname}`;
            
            // Specify the target path where the image will be saved with its original name
            const targetPath = path.join(uploadDirectory, imageName);
            
            // Move the image file from the temporary location to the uploads directory
            fs.rename(tempPath, targetPath, (err) => {
                if (err) throw err;
            });
    
            // Create a new movie object with the image path and other details
            const newMovie = new Movie({
                title: req.body.title,
                linkOne: req.body.linkOne,
                linkTwo: req.body.linkTwo,
                linkThree: req.body.linkThree,
                image: `/uploads/${imageName}`, // Store the path of the uploaded image
                category: req.body.category,
            });
    
            // Save the new movie object to the database
            const savedMovie = await newMovie.save();
            
            // Return a success response with the saved movie object
            res.status(201).json(savedMovie);
        } catch (error) {
            // If an error occurs, return an error response
            res.status(500).json({ message: error.message });
        }
    });
    

  
  // Route to fetch all movies
  app.get('/api/movies', async (req, res) => {
    try {
      const movies = await Movie.find().sort({ createdAt: -1 });
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to fetch a specific movie by ID
  app.get('/api/movies/:id', async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to update a movie by ID
  app.put('/api/movies/:id', async (req, res) => {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to delete a movie by ID
  app.delete('/api/movies/:id', async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Endpoint to handle email subscription
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  
  try {
    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: 'Email is already subscribed' });
    }

    const newSubscription = new Subscription({ email });
    await newSubscription.save();
    res.status(201).json({ message: 'Subscription successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to fetch all subscriptions
app.get('/api/subscriptions', async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to handle deleting a subscription by ID
app.delete('/api/subscriptions/:id', async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  



app.get('/', (req, res) => {
    res.send('Hello from Express server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB();

//Above code is working 👆

// server.js (Backend Implementation)


// // server.js

// const express = require('express');
// const app = express();
// const connectDB = require('./config/database');
// const PORT = process.env.PORT || 5000;



// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// connectDB();

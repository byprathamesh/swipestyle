const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON bodies

// In-memory store for swap items (replace with database later)
let swapItems = [
  {
    id: "1",
    userId: "user_placeholder_1",
    title: "Vintage Denim Jacket (Backend)",
    description: "Size M, good condition. From backend.",
    imageUrl: "/assets/fashion/jacket.jpg",
    category: "outerwear",
    condition: "good",
    availability: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "user_placeholder_2",
    title: "Floral Summer Dress (Backend)",
    description: "Size S, brand new. From backend.",
    imageUrl: "/assets/fashion/dress.jpg", 
    category: "dresses",
    condition: "new",
    availability: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
let nextItemId = 3;

app.get('/', (req, res) => {
  res.send('Hello from SwipeStyle Backend!');
});

// Auth endpoints (placeholders)
app.post('/auth/signup', (req, res) => res.status(201).json({ message: 'Signup successful (placeholder)', userId: 'newUser123' }));
app.post('/auth/login', (req, res) => res.json({ message: 'Login successful (placeholder)', userId: 'user123', token: 'fake-jwt-token' }));

// Swap Item Endpoints
app.get('/items', (req, res) => {
  const { userId } = req.query;
  let itemsToReturn = swapItems.filter(item => item.availability === 'available');
  if (userId) {
    itemsToReturn = itemsToReturn.filter(item => item.userId === userId);
  }
  // Add other filtering/pagination later
  res.json(itemsToReturn);
});

app.post('/items', (req, res) => {
  const newItemData = req.body;
  if (!newItemData.title || !newItemData.description || !newItemData.imageUrl || !newItemData.category || !newItemData.condition || !newItemData.userId) {
    return res.status(400).json({ message: 'Missing required fields for new item' });
  }
  const newItem = {
    ...newItemData,
    id: (nextItemId++).toString(),
    availability: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  swapItems.push(newItem);
  res.status(201).json(newItem);
});

// User Profile Endpoint (Placeholder)
app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  // In a real app, fetch from database
  if (userId === 'user123') {
    res.json({ id: 'user123', email: 'user123@example.com', name: 'Alice W. (Backend)' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// User Preferences Endpoints (placeholders)
app.get('/preferences', (req, res) => res.json({ message: 'Get preferences placeholder', preferences: { gender: 'female', budget: 'medium'} }));
app.put('/preferences', (req, res) => {
    console.log('Updating preferences:', req.body);
    res.json({ message: 'Update preferences successful (placeholder)', preferences: req.body });
});

// Utility to run Python scripts
const { spawn } = require('child_process');
const path = require('path');

function runPythonScript(scriptPath, args, callback) {
  const pythonExecutable = process.env.PYTHON_EXECUTABLE || 'python'; // or 'python3'
  const fullScriptPath = path.join(__dirname, '..', scriptPath); // Assumes scriptPath is relative to project root like 'ai/script.py'
  
  const process = spawn(pythonExecutable, [fullScriptPath, ...args]);
  let dataString = '';
  let errorString = '';

  process.stdout.on('data', (data) => {
    dataString += data.toString();
  });

  process.stderr.on('data', (data) => {
    errorString += data.toString();
  });

  process.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python script ${fullScriptPath} exited with code ${code}`);
      console.error('stderr:', errorString);
      return callback(new Error(`Script error: ${errorString || 'Unknown error'}`), null);
    }
    try {
      const jsonData = JSON.parse(dataString);
      callback(null, jsonData);
    } catch (parseError) {
      console.error(`Error parsing JSON from ${fullScriptPath}:`, parseError);
      console.error('stdout:', dataString);
      callback(new Error('Error parsing script output'), null);
    }
  });
}

// AI Outfit Generation Endpoint
app.post('/ai/generate-outfit', (req, res) => {
  const { prompt, image_url, service } = req.body;
  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }
  const scriptArgs = ['--prompt', prompt];
  if (image_url) scriptArgs.push('--image_url', image_url);
  if (service) scriptArgs.push('--service', service);

  runPythonScript('ai/sample_outfit_generator.py', scriptArgs, (error, data) => {
    if (error) {
      return res.status(500).json({ message: error.message, details: error.stderr });
    }
    res.json(data);
  });
});

// Price Comparison Endpoint
app.post('/price-compare', (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ message: 'Product query is required' });
  }
  const scriptArgs = ['--query', query];
  // Add --target_country 'in' if needed explicitly by script, or handle in script

  runPythonScript('price-compare/sample_price_scraper.py', scriptArgs, (error, data) => {
    if (error) {
      return res.status(500).json({ message: error.message, details: error.stderr });
    }
    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
}); 
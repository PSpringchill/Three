import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.post('/save', (req, res) => {
  const { key, pressedKeys } = req.body;

  // Get the current date
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

  // Set the filename using the current date
  const filename = `${formattedDate}_keyData.json`;

  // Read existing keyData.json content
  let existingData = [];
  if (fs.existsSync(filename)) {
    const fileContent = fs.readFileSync(filename, 'utf-8');
    existingData = JSON.parse(fileContent);
  }

  // Append new key press event to the existing data
  existingData.push({ key, pressedKeys });

  // Save updated data to keyData.json
  fs.writeFileSync(filename, JSON.stringify(existingData, null, 2));

  // Send a response back to the client
  res.status(200).send({ message: 'Data saved successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

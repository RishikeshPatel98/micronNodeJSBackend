const client = require('./connection.js')
const express = require('express');
const app = express();

app.listen(3000, ()=>{
    console.log("Sever is now listening at port 3000");
})

client.connect();

// Use body-parser to parse JSON data
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/api/sensors', (req, res)=>{
    client.query(`Select * from sensor`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

// // Sensor data endpoint
// app.post('/api/sensors', (req, res) => {
//     // Validate the incoming JSON data
//     const { serial, swVersion, temperature, date, gps } = req.body;
  
//     if (!serial || !swVersion || !temperature || !date || !gps) {
//       return res.status(400).json({ error: 'Incomplete sensor data' });
//     }
  
//     // You can add more validation logic as needed
  
//     // Process the sensor data
//     console.log('Received sensor data:');
//     console.log(`Serial: ${serial}`);
//     console.log(`Software Version: ${swVersion}`);
//     console.log(`Temperature: ${temperature}`);
//     console.log(`Date: ${date}`);
//     console.log(`GPS: ${gps}`);
  
//     // Respond with a success message
//     res.json({ message: 'Sensor data received successfully' });
//   });
  
// // API endpoint for handling sensor data
// app.post('/api/sensors', async (req, res) => {
//     try {
//       const { serial, swVersion, temperature, date, gps } = req.body;
  
//       // Validate JSON properties
//       if (!serial || !swVersion || !temperature || !date || !gps) {
//         return res.status(400).json({ error: 'Invalid JSON format' });
//       }
  
//       // Stringify the entire req.body
//       const jsonString = JSON.stringify(req.body);
  
//       // Insert data into the PostgreSQL database
//       const result = await client.query(
//         'INSERT INTO sensor (serial, swversion, temperature, date, gps) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//         [jsonString][serial, swVersion, temperature, date, gps]
//       );
  
//       res.status(201).json(result.rows[0]);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

// Define the /api/sensors endpoint for handling sensor data
app.post('/api/sensors', async (req, res) => {
    try {
      // Validate JSON properties
      const { serial, swVersion, temperature, date, gps } = req.body;
      if (!serial || !swVersion || !temperature || !date || !gps) {
        return res.status(400).json({ error: 'Invalid JSON data' });
      }
  
      // Insert data into the database
      const result = await client.query(
        'INSERT INTO sensors(serial, swVersion, temperature, date, gps) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [serial, swVersion, temperature, date, gps]
      );      
  
      // Send a success response
      res.json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error handling sensor data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  
  
  
  
  
  
  
  
  
  







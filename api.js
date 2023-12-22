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
    client.query(`Select * from sensors`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

// the /api/sensors endpoint for handling sensor data
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
  

  
  
  
  
  
  
  
  
  
  







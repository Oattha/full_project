const express = require('express');
const cors = require('cors');
const cokieParser = require('cookie-parser');
const apiRouter = require('./routes/api');

const https = require('https');
const fs = require('fs');
const app = express();

// ใช้ JSON parsing
app.use(express.json());


// ตั้งค่าการอนุญาตจากแหล่งที่มาหลายแหล่ง


app.use(cors({
    origin: '*', // อนุญาตทุกโดเมนเข้าถึง
    credentials: true
}));

// ใช้ cookie-parser
app.use(cokieParser());

// ใช้ router ของ API
app.use('/api/v1', apiRouter);

// ตั้งค่าพอร์ตสำหรับ HTTP และ HTTPS
const sslOptions = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem')
};

const port = 8800;
const securePort = 8443;

// รันเซิร์ฟเวอร์บน HTTP
app.listen(port, () => {
    console.log('Server running on HTTP port ' + port);
});

// รันเซิร์ฟเวอร์บน HTTPS
https.createServer(sslOptions, app).listen(securePort, () => {
    console.log('Server running on HTTPS port ' + securePort);
});
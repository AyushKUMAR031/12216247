const axios = require('axios');

const API_URL = "http://20.244.56.144/evaluation-service/logs"; 
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJheXVzaGt1bWFyMDMxOTIwMDNAZ21haWwuY29tIiwiZXhwIjoxNzUyNDc1NzkyLCJpYXQiOjE3NTI0NzQ4OTIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJjMzk1ZDI1OS0zNWZhLTQ4ZWUtYWNlNi1iOTVkY2Q5NjAwYmMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJheXVzaCBrdW1hciIsInN1YiI6IjA5OTA4NDQ1LWQzOTMtNDY1NS04ZDlmLTE4MjNhNmY4ZTU4OSJ9LCJlbWFpbCI6ImF5dXNoa3VtYXIwMzE5MjAwM0BnbWFpbC5jb20iLCJuYW1lIjoiYXl1c2gga3VtYXIiLCJyb2xsTm8iOiIxMjIxNjI0NyIsImFjY2Vzc0NvZGUiOiJDWnlwUUsiLCJjbGllbnRJRCI6IjA5OTA4NDQ1LWQzOTMtNDY1NS04ZDlmLTE4MjNhNmY4ZTU4OSIsImNsaWVudFNlY3JldCI6IkhWYWNScHNkWkd1aHNzenoifQ.Qc0ZmxxiUB6zN2RuG6J6ZDCutrEzf0liA9ol7SPMHoQ";


async function Log(stack, level, pkg, message) {
  try {
    const body = {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: pkg.toLowerCase(),
      message
    };

    const response = await axios.post(API_URL, body, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Log sent:`, response.data);
  } catch (err) {
    console.error(`Logging failed:`, err.message);
  }
}

module.exports = { Log };

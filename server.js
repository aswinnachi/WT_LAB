const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;
const mongoUrl = 'mongodb://localhost:27017';
const savedUsers = [];

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>User Registration Form</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background:
              linear-gradient(rgba(10, 20, 45, 0.55), rgba(10, 20, 45, 0.6)),
              url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat fixed;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px;
          }
          .card {
            width: min(100%, 900px);
            background: rgba(255,255,255,0.9);
            border-radius: 20px;
            box-shadow: 0 12px 32px rgba(31, 64, 135, 0.15);
            overflow: hidden;
            display: grid;
            grid-template-columns: 1.1fr 1.2fr;
          }
          .panel {
            padding: 40px 35px;
          }
          .left {
            background: linear-gradient(180deg, #1d4ed8, #1e3a8a);
            color: white;
          }
          .left h1 {
            margin: 0 0 15px;
            font-size: 2rem;
          }
          .left p {
            line-height: 1.7;
            opacity: 0.9;
          }
          .badge {
            display: inline-block;
            padding: 7px 12px;
            background: rgba(255,255,255,0.12);
            border-radius: 999px;
            font-size: 0.8rem;
            letter-spacing: 0.04em;
            margin-bottom: 18px;
          }
          .right h2 {
            margin: 0 0 22px;
            color: #1f2937;
            font-size: 2rem;
          }
          form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px 20px;
          }
          .full {
            grid-column: 1 / -1;
          }
          label {
            display: block;
            font-size: 0.92rem;
            color: #374151;
            font-weight: 600;
          }
          input, select {
            width: 100%;
            margin-top: 8px;
            padding: 12px 14px;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            outline: none;
            font-size: 1rem;
            background: #f8fafc;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          input:focus, select:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
            background: #fff;
          }
          button {
            grid-column: 1 / -1;
            margin-top: 8px;
            border: none;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            font-size: 1rem;
            font-weight: 700;
            padding: 14px 18px;
            border-radius: 10px;
            cursor: pointer;
            transition: transform 0.2s, opacity 0.2s;
          }
          button:hover {
            transform: translateY(-1px);
            opacity: 0.98;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #dbe3ef;
            padding: 12px 14px;
            text-align: left;
          }
          th { background: #eef4ff; }
          @media (max-width: 760px) {
            .card { grid-template-columns: 1fr; }
            form { grid-template-columns: 1fr; }
            .panel { padding: 28px 22px; }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="panel left">
            <div class="badge">WELCOME</div>
            <h1>Create Account</h1>
            <p>Register your profile and join our platform with a secure and user-friendly form experience.</p>
          </div>

          <div class="panel right">
            <h2>User Registration Form</h2>
            <form action="/server" method="POST">
              <div class="full">
                <label>Name* <input type="text" name="name" required></label>
              </div>
              <label>Password* <input type="password" name="password" required></label>
              <label>Age* <input type="number" name="age" required></label>
              <label>Mobile Number* <input type="tel" name="mobile" required></label>
              <label>Email* <input type="email" name="email" required></label>
              <label>Gender* 
                <select name="gender" required>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </label>
              <label>State* 
                <select name="state" required>
                  <option value="">Select</option>
                  <option>Kerala</option>
                  <option>Tamil Nadu</option>
                  <option>Karnataka</option>
                  <option>Delhi</option>
                </select>
              </label>
              <div class="full">
                <label>Skills* <input type="text" name="skills" required></label>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </body>
    </html>
  `);
});

app.post('/server', async (req, res) => {
  const user = {
    name: req.body.name,
    password: req.body.password,
    age: req.body.age,
    mobile: req.body.mobile,
    email: req.body.email,
    gender: req.body.gender,
    state: req.body.state,
    skills: req.body.skills,
  };

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db('userdb');
    await db.collection('users').insertOne(user);
    await client.close();
    console.log('Saved to MongoDB');
  } catch (err) {
    savedUsers.push(user);
    console.log('MongoDB not available, saved in memory:', err.message);
  }

  res.send(`
    <h2>User Submitted Details</h2>
    <table>
      <tr><th>Name</th><td>${user.name}</td></tr>
      <tr><th>Password</th><td>${user.password}</td></tr>
      <tr><th>Age</th><td>${user.age}</td></tr>
      <tr><th>Mobile Number</th><td>${user.mobile}</td></tr>
      <tr><th>Email</th><td>${user.email}</td></tr>
      <tr><th>Gender</th><td>${user.gender}</td></tr>
      <tr><th>State</th><td>${user.state}</td></tr>
      <tr><th>Skills</th><td>${user.skills}</td></tr>
    </table>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

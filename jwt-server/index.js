const dotenv = require('dotenv');
// get config vars
dotenv.config();

const jwt = require('jsonwebtoken');

const express = require('express')
const app = express()
app.use(express.json());

const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

//const jwtToken = generateAccessToken("admin");
//console.log(jwtToken);


app.post('/api/login', async (req, res) => {
    console.log('Got body:', req.body);
    user = req.body;
    const token = generateAccessToken({ username: user.login });
    res.json({ token : token });
});



function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  })
}
  

app.get('/api/userOrders', authenticateToken, (req, res) => {
    // executes after authenticateToken
    // ...
})
  

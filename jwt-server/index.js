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

function parseCookies (request) {
  const list = {};
  const cookieHeader = request.headers?.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach(function(cookie) {
      let [ name, ...rest] = cookie.split(`=`);
      name = name?.trim();
      if (!name) return;
      const value = rest.join(`=`).trim();
      if (!value) return;
      list[name] = decodeURIComponent(value);
  });

  return list;
}


function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

//const jwtToken = generateAccessToken("admin");
//console.log(jwtToken);


app.post('/api/login', async (req, res) => {
    console.log('Got body:', req.body);
    user = req.body;
    const token = generateAccessToken({ username: user.login });
    res.set({'Set-Cookie': `refreshToken=${token}`});
    res.json({ accessToken : token });
});


app.get('/api/refresh', async (req, res) => {
  let cookies = parseCookies(req);
  if (!cookies.refreshToken) {
    res.status(401);
    return;
  }
  let refreshToken = cookies.refreshToken;
  if (refreshToken) {
    console.log("cookies refreshToken = " + refreshToken);
    try {
      let user = jwt.verify(refreshToken, process.env.TOKEN_SECRET);
      req.user = user;
    } catch (err) {
      console.log(err);
      if (err) {
        return res.sendStatus(403);
      }
    }
  }

  const token = generateAccessToken({ username: req.user });
  res.set({'Set-Cookie': `refreshToken=${token}`});
  res.json({ accessToken : token });
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
  });
}
  

app.get('/api/tasks', authenticateToken, (req, res) => {
  res.json([
    {
      "id": 2,
      "text": "Встреча в школе",
      "day": "2023-05-06T13:30"
    },
    {
      "id": 3,
      "text": "Поход в магазин",
      "day": "2023-11-14T10:50"
    },
    {
      "id": 4,
      "text": "new task !!!",
      "day": "2023-11-14T14:55"
    }
  ]);
})
  

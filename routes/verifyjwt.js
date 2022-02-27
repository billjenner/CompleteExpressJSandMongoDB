const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['access-token'];
  if (!token) return res.send('Access denied');

  try {
    const verify = jwt.verify(token, process.env.SECRET);
    req.user = verify;
    next();
  } catch (err) {
    res.status(401).send('Invalid Access Toekn');
  }
};

module.exports = verifyToken;

// GET localhost:3000/api/all
//  Content-Type   application/json
//  access-token   fdsfsdafsdafdasfdasfdsafdasfsdafsdadsffds

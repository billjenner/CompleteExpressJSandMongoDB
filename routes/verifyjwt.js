const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  const x = process.env.SECRET;
  if (!token) return res.send('Access denied');

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send('Invalid Access Toekn');
  }
};

module.exports = verifyToken;

// GET localhost:3000/api/all
//  Content-Type   application/json
//  access-token   fdsfsdafsdafdasfdasfdsafdasfsdafsdadsffds

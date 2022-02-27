const router = express.Router();

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = reuiqre('jsonwebtoken');

router.post('/login', async (req, res) => {
  // 1. verify email, 2. pass verification -> return response

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send('invalid email!!!');

  const passVerification = await crypt.compare(req.body.main, user.password);
  if (!passVerification) return res.send(passVerification);

  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res.send(token);

  // or

  user.password = undefined;
  res.json({
    body: {
      user: user,
      token: token,
    },
  });
});

module.exports = router;

// POST localhost:3000/api/auth/login
// {
//  "email":"asd123@gmail.com",
//  "password":"asdasd12341"
// }
// Body > Headers > Pretty

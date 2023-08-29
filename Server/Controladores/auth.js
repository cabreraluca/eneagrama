const User = require("../Schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("../Utils/jwt");
function register(req, res) {
  const { firstname, lastname, email, password } = req.body;
  if (!email) res.status(400).send({ msg: "Es obligatorio registar un email" });
  if (!password)
    res.status(400).send({ msg: "Es obligatorio registar una contraseña" });
  const user = new User({
    firstname,
    lastname,
    password,
    email: email.toLowerCase(),
    role: "user",
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;
  try {
    user.save().then((userStored) => {
      console.log("Usuario registrado");
      res.status(200).send(userStored);
    });
  } catch (error) {
    res.status(400).send({ msg: err });
  }
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: "Introduzca un email" });
  if (!password) res.status(400).send({ msg: "Introduzca una contraseña" });

  const emailToLower = email.toLowerCase();

  User.findOne({ email: emailToLower })
    .then((userStore) => {
      bcrypt.compare(password, userStore.password, (bcryptErr, bcryptCheck) => {
        if (bcryptErr) {
          res.status(500).send({ msg: "error del servidor" });
        } else if (!bcryptCheck) {
          res.status(400).send({ msg: "contraseña incorrecta" });
        } else {
          res.status(200).send({
            access: jwt.createAccessToken(userStore),
            refresh: jwt.createRefreshToken(userStore),
          });
        }
      });
    })
    .catch((err) => {
      res.status(200).send({ msg: err });
    });
}

module.exports = {
  register,
  login,
};

const User = require("../Schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("../Utils/jwt");
const nodemailer = require('nodemailer');
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

async function sendPasswordResetEmail(req, res) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      // credenciales del email remitente
      user: '',
      pass: '', 
    },
  });
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'El usuario no existe' });
    }

    // IMPLEMENTAR LOGICA DE TOKENS PARA MÁS SEGURIDAD
    // const resetToken = generateResetToken();

    // user.resetPasswordToken = resetToken;
    // user.resetPasswordExpires = Date.now() + 3600000;
    // await user.save();

    const mailOptions = {
      from: 'no-responder@eneagrama.com',
      to: user.email,
      subject: 'Recuperación de Contraseña',
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://localhost:3000/reset-password/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico: ', error);
        return res.status(500).json({ message: 'Error al enviar el correo electrónico' });
      } else {
        console.log('Correo electrónico enviado: ', info.response);
        res.status(200).json({ message: 'Correo electrónico enviado' });
      }
    });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = {
  register,
  login,
  sendPasswordResetEmail
};

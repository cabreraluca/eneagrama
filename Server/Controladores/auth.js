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
          return res.status(500).send({ msg: "Error del servidor" });
        } else if (!bcryptCheck) {
          return res.status(400).send({ msg: "Contraseña incorrecta" });
        }else {
          return res.status(200).send({
          access: jwt.createAccessToken(userStore),
          refresh: jwt.createRefreshToken(userStore),
          });
        }
      });
    })
    .catch((err) => {
      console.log('hola')
      return res.status(500).json({ msg: "Email no registrado" });
    });
}

async function sendPasswordResetEmail(req, res) {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      // credenciales del email remitente
      user: 'cabrera.luca10@gmail.com',
      pass: 'btczaprsonbpwvwk', 
    },
  });

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'El usuario no existe' });
    }

    const resetToken = jwt.generateResetToken(user);

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    user.save();

    const mailOptions = {
      from: 'no-responder@eneagrama.com',
      to: user.email,
      subject: 'Mapa Personal - Recuperación de Contraseña',
      text: `Hemos recibido una solicitud para reestablecer tu contraseña, Para hacerlo, haz clic en el siguiente enlace: 
      http://localhost:3000/reset-password/${resetToken}
      
      
      Si no has solicitado el cambio de contraseña, ignora este mail.
      `,
    };

    console.log(mailOptions)
    res.status(200).send(mailOptions)
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

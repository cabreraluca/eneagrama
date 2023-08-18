const User = require("../../Schemas/user");

const checkEmailExists = async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (user) {
        return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
      }
  
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error al verificar el correo electrónico' });
    }
  };

module.exports = {
    checkEmailExists
}
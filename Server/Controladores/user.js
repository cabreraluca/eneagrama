const User = require("../Schemas/user")
const bcrypt = require('bcrypt')

async function createUser(req, res){
  const {password} = req.body;
  const user = new User({ ...req.body});
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  try {
    user.save().then((userStored) => {
      res.status(200).send(userStored);
    });
  } catch (err) { 
    res.status(400).send({ msg: err });
  }
}

async function updateUser(req, res){
    const {id} = req.params;
    const userData = req.body;

    if(userData.password){
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(userData.password, salt);
      userData.password = hashPassword;
  }

    try {
        const updatedUser = await User.findByIdAndUpdate({_id: id}, userData);
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).send("No se pudo actualizar");
        console.log(error)
    }
}


async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    User.findByIdAndDelete(id).then((deleted) => {
      res.status(200).send(deleted);
    });
  } catch (error) {
    res.status(400).send({ msg: "error al eliminar" });
  }
}
async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: "No se encuentra usuario" });
  } else {
    res.status(200).send(response);
  }
}


async function getUsers(req, res) {
  const response = await User.find();
  res.status(200).send(response);
}

async function getCompanyUsers(req, res){
  const {company} = req.params;
  const response = await User.find({company: company})
  res.status(200).send(response);
}

async function filterUsers(req, res){
  const {finished, started, company} = req.query;
  if(req.query !== ""){
    if(company){
      const response = await User.find({company: company});
    }
    if(finished){
      const response = await User.find({finished});
      res.status(200).send(response);
    }else if(!finished){
        if(started){
          const response = await User.find({started: true, finished: false});
          res.status(200).send(response);
        }else{
          const response = await User.find({started: false, finished: false});
          res.status(200).send(response);
        }
      } 
  }
}

async function getCompaniesList(req, res){
  try {
    const response = await User.find({role: 'company'})
    res.status(200).send(response);
  } catch (error) {
    console.log(error)
  }

}

async function getUserByToken(req, res){
  const {token} = req.params;
  try {
    const response = await User.findOne({resetPasswordToken: token})
    .then((user) => {
      res.status(200).send(user);
    })
  } catch (error) {
    res.status(400).send("Error");
  }
}

async function getUser(req, res) {
    const {id} = req.params;
    try {
        const response = await User.findById(id);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({msg: "No se encontró usuario"})
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getMe,
    getUsers,
    getUser,
    getUserByToken,
    createUser,
    filterUsers,
    getCompanyUsers,
    getCompaniesList
}

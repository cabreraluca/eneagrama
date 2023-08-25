const User = require("../Schemas/user")

function updateUser(req, res){
    const {id} = req.params;
    const userData = req.body;
    console.log(userData);

    try {
        User.findByIdAndUpdate({_id: id}, userData).then((updated)=>{
            res.status(200).send(updated);
            console.log("guardado")
        })
    } catch (error) {
        res.status(400).send("No se pudo actualizar");
        console.log(error)
    }
}

function deleteUser(req, res){
    const {id} = req.params;

    try {
        User.findByIdAndDelete(id).then((deleted) =>{
            res.status(200).send(deleted);
        })
    } catch (error) {
        res.status(400).send({msg: "error al eliminar"});
    }
}
async function getMe(req, res){
    const { user_id } = req.user;
    
    const response = await User.findById(user_id);

    if(!response){
        res.status(400).send({msg: "No se encuentra usuario"});
    }else{
        res.status(200).send(response);
    }
}

async function getUsers(req, res){

    // const {finished} = req.query;

    // if(!finished){
    //     const response = await User.find();
    // }else{
    //     const response = await User.find({finished});
    // }
    
    const response = await User.find();
    
    res.status(200).send(response);
}

module.exports = {
    updateUser,
    deleteUser,
    getMe,
    getUsers
}
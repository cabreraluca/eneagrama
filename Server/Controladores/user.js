const User = require("../Schemas/user")

function updateUser(req, res){
    const {id} = req.params;
    const userData = req.body;

    try {
        User.findByIdAndUpdate({_id: id}, userData, {new: true}).then((updated)=>{
            res.status(200).send(updated);
        })
    } catch (error) {
        res.status(400).send("No se pudo actualizar");
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

module.exports = {
    updateUser,
    deleteUser
}
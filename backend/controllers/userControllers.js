const User =require('../model/User')

const userControllers = {
    getAllUsers : async (req,res) => {
        try {
            const user = await User.find();
            res.status(200).json(user)
        } catch (err) {
            res.status(404).json(err)
            
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json('delete user susccess')
        } catch (err) {
            res.status(404).json(err)
            
        }
    }
}
module.exports = userControllers
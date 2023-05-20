const User = require("../models/User");
const bcrypt = require('bcrypt')



module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    //validations
    if (!name) {
      res.status(422).json({ message: "Nome obrigatório" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "email obrigatório" });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: "phone obrigatório" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "password obrigatório" });
      return;
    }
    if (!confirmpassword) {
      res.status(422).json({ message: "confirmação de password obrigatório" });
      return;
    }
    if (password !== confirmpassword) {
      res.status(422).json({ message: "Senha e confirmação não são iguais" });
    return
    } 
    
    //create a password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)


    //create a user
    const user = new User({
        name,
        email,
        phone,
        password: passwordHash,
    })


    //check if user exist
    const userExists = await User.findOne({email: email})

    if (userExists) {
        res.status(422).json({message: 'E-mail já cadastrado'})
        return
    }


    try {
        const newUser = await user.save()

        
        res.status(201).json({
            message: 'Usuario Criado!',
            newUser,
        })
    } catch(error) {
        res.status(500).json({message:error})
    }
  }
};

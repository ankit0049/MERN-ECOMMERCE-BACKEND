import { User } from "../model/User.model .js";

export const createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    const doc = await user.save();
    res.status(201).json({id:doc.id , role: doc.role});
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(400).json({ error: error });
  }
};

export const logInUser = async (req, res) => {
  try { 
   
    const { email, password } = req.body;  
    const user = await User.findOne({ email:req.body.email }).exec(); 
    console.log(`User ${user}`)
    if(!user){
        res.status(401).json({Error : "Invalid Credintials , Please Check"})
    }
    else if (req.body.password === user.password) {
      res.status(201).json({id : user.id  , role:user.role});
    }
  } catch (error) {
    res.status(401).json({ Error: "Invalid ! Credintials" });
  }
};

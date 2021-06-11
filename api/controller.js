const {
     create,
     getUsers,
     getUserById,
     deleteUserById,
     updatUser,
     getUserByEmail } = require('./userservice');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req,res)=>{
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(req.body.password,salt);
    console.log(hashedpassword);

    const sqldata = {
        username:req.body.username,
        email:req.body.email,
        password:hashedpassword
    }

    await create(sqldata,(error,response)=>{
        if(error){
             res.status(500).send(error);
        };
         res.status(201).send(response);
    });
};

const getAllUsers =async (req,res)=>{
    await getUsers((error,response)=>{
        if(error){
         res.status(500).send();
        };
        res.status(200).send(response);
    });
};

const findUserById = async (req,res)=>{
    const id = req.params.id;

    await getUserById(id,(error,response)=>{
        if(error){
            console.log(error);
            return;
        };
        if(!response){
            res.status(404).send("user not found");
        };
        res.send(response);
        
    });
};

const removingUser = async(req,res)=>{
    const id = req.params.id;
    await deleteUserById(id,(error,response)=>{
        if(error){
            res.status(500).send();
        };
        if(!response){
            res.status(404).send("user not found to delete");
        };
        res.send(response)
        console.log('user deleted');
    });
};

const updateUserById =async(req,res)=>{
    const id = req.params.id;

    const data = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email
    };

    await updatUser(id,data,(error,response)=>{
        if(error){
            res.status(500).send();
        };
        if(!response){
            res.status(404).send("user not found");
        };
        res.send(response);
    });
};

const login =async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    await getUserByEmail(email,(error,response)=>{
        if(error){
            res.status(500).send();
        };
        if(!response){
           return res.status(404).send("user not found");
        };
        const result = bcrypt.compareSync(password,response.password);
        if(result){
            const token = jwt.sign({_id:response.id},'qwu12345');
            return res.json({
                success:1,
                message:"login successfully",
                token:token
            });
        }else{
            return res.json({
                success:0,
                message:"wrong email or password"
            });
        };
    });
};


module.exports = {
    createUser,
    getAllUsers,
    findUserById,
    removingUser,
    updateUserById,
    login
}


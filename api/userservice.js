const db = require('../mysqldb/dbcon');

const create = (data,callback)=>{
    
    db.query("INSERT INTO  users SET ? ",data,(error,response)=>{
        if(error){
            callback(error);
        };
        callback(null,response);
    });
};

const getUsers = (callback)=>{
    db.query("SELECT * FROM users",(error,response)=>{
        if(error){
            callback(error);
        };
        callback(null,response);
    });
};

const getUserById = (id,callback)=>{
    db.query("SELECT * FROM users WHERE id=?",[id],(error,response)=>{
        if(error){
            callback(error);
        };
        callback(null,response[0]);
    });
};

const deleteUserById = (id,callback)=>{
    db.query("DELETE FROM users WHERE id = ?",[id],(error,response)=>{
        if(error){
            callback(error);
        };
        callback(null,response[0]);
    });
};

const updatUser = (id,data,callBack)=>{
    Object.keys(data).forEach((key, index) => {
        if(!data[key]) delete data[key]
    });
    
    db.query("UPDATE users SET ? WHERE id='"+id+"'",data,(error,results)=>{
        if (error) {
            callBack(error);
          };
          if(results.affectedRows){
            return callBack(null, results);
          }else{
            return callBack(null, results.affectedRows);
          };
    });
};

const getUserByEmail = (email,callBack)=>{
    db.query("SELECT * FROM users WHERE email = ?",[email],(error,response)=>{
        if(error){
            callBack(error);
        };
        console.log(response[0])
        callBack(null,response[0]);
    });
};


module.exports = {
    create,
    getUsers,
    getUserById,
    deleteUserById,
    updatUser,
    getUserByEmail
};

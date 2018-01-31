const users = require('../models/users');
var id=1

module.exports={
    login:(req, res, next)=>{
        const user = users.find(user => user.username === req.body.username && user.password === req.body.password)
        if (user){
            req.session.user.username = user.username;
            res.status(200).send(req.session.user)
        }else{
            res.status(500).send("unauthorized BAM!")
        }
    },
//// same thig it descructure ////////////////////////////
//     const { session } = req;
//     const { username, password } = req.body;

//     const user = users.find( user => user.username === username && user.password === password );

//     if ( user ) {
//       session.user.username = user.username;
//       res.status(200).send(session.user);
//     } else {
//       res.status(500).send('Unauthorized.');
//     }
//   },
    register:(req, res, next)=>{
        let newUser = {
            id: id,
            username: req.body.username,
            password:req.body.password
        }
        id++
        users.push(newUser)
        req.session.user.username = req.body.username
        res.status(200).send(req.session.user)
    },
    signout:(req, res, next)=>{
        req.session.destroy()
        res.status(200).send(req.session)
    },
    getUser:(req, res, next)=>{
        console.log(users)
        res.status(200).send(req.session.user)
    }
}
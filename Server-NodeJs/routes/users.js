const User = require('../model/user'); //user model
const jwt = require('jsonwebtoken'); //JWT token for login
const bcrypt = require('bcrypt-nodejs'); //encrypt the password
const express = require('express'); //framework 
const router = express.Router();
const mongoose = require('mongoose');
const jwtLogin = require('jwt-login'); //jwt authorize

//Register route
router.post('/register', (req, res) => {
    User.find({ email: req.body.email })
       .exec()
       .then(users => {
           if(users.length >=1) {
               return res.status(409).json({
                   message:"mail exists"
               });
           } else {
               bcrypt.hash(req.body.password, null, null, (err, hash) => {
                   if(err) {
                       return res.status(500).json({
                           error: err
                       });
                   }
                   if (!req.body.fullName) {
                       res.json({ success: false, message: 'you must provide an fullName'});
                   } else {
                   if (!req.body.email) {
                       res.json({ success: false, message: 'you must provide a email'});
                   } else {
                       if (!req.body.password) {
                           res.json({ success: false, message: 'you must provide a password'});
                       } else {
                           if(!req.body.CPassword) {
                               res.json({ success: false, message: 'you must provide a Confirm password'});
                           } else {
                               if (req.body.password !== req.body.CPassword) {
                                   res.json({ success: false, message: 'Could not match Passwords'});
                               } else {
           //create and store new user to Database
               let users = new User({
                   _id: mongoose.Types.ObjectId(),
                   fullName: req.body.fullName,
                   email: req.body.email.toLowerCase(),
                   password: hash
               });
               users.save((err) => {
                   if (err) {
                       if (err.code === 11000) {
                           res.json({ success: false, message: 'Email already exists' });
                       } else {
                           if (err.errors) {
                               if (err.errors.email) {
                                   res.json({ success: false, message: err.errors.email.message });
                               } else {
                                   if (err.errors.fullName) {
                                       res.json({ success: false, message: err.errors.fullName.message });
                                   } else {
                                       if (err.errors.password) {
                                           res.json({ success: false, message: err.errors.password.message });
                                       } else {
                                           res.json({ success: false, message: err });
                                       }
                                    }
                                   }

                           } else {
                               res.json({ success: false, message: 'Could not save User :', err })
                           }
                       }
                   } else {
                       res.json({ success: true, message: 'Registration successfully...' });   
                   }
               });
            // end of save query
              }
           } 
         }
       } 
      }
    });
   }
 });
});
//end of the register route

router.get('/login', (req, res) => {
    res.send("hello welcome to login");
});

// login route
router.post('/login', (req, res, cb) => {
    User.findOne({
        email: req.body.email})
        .exec()
        .then(
            user => {
                if(user < 1) {
                    return res.status(404).json({ 
                        message:'User not Found'
                     });
                }
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(err) {
                        return res.status(401).json({
                            message: 'Login Failed'
                        });
                    }
                    if(result) {
                        const token = jwt.sign({
                            email: user.email 
                        }, 'supersecret', {expiresIn: '2h'});
                         return res.status(200).json({
                             message: 'Login Successfull..',
                             token: token
                         }); 
                    }
                });
            }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
// end of login route

// logout
router.get('/logout', (req, res, next) => {
    jwtLogin.signout(req, res, false);
    res.json({
        message: "logout successfully..",
        success: false
        
    })
});

//exports router module   
module.exports = router;

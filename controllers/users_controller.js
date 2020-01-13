const User =require('../models/user');
module.exports.profile=function(req,res){
    return res.render('users',{
        title: "Users"
    });
    
}

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }


    return res.render('users_sign_up',{
        title:"Codeial | Sign Up"
    });
};

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('users_sign_in',{
        title:"codeial  |  Sign IN"
    })
}

//get the sign up data
 module.exports.create=function(req,res){
    if(req.body.password !=req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in findinng user in signing up'); return}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log("error in creating user while singing up"); return }

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });

    
 }
//sign and create the session
 module.exports.createsession=function(req,res){
    return res.redirect('/');
 }


 module.exports.destroySession=function(req,res){
     req.logout();
     return res.redirect('/');
 }
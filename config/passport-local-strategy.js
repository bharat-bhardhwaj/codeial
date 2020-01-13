const passport=require('passport');


const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');
// authentication using password 
passport.use(new LocalStrategy({
    usernameField:'email'
},

function(email,password,done){
    //find a user and establish the identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("erroris finding user --> passporrt");
            return done(err);
        }
        if(!user || user.password !=password){
            console.log("Invalid username/password");
            return done(null,false);
        }

        return done(null,user);
    });
}

));


//serialinzing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});



//deserializing the user to decide which key is to be kept in the cookied
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finging user--->passport');
        }

        return done(null,user);
    });
});

// check if the user is authenticated

passport.checkAuthentication=function(req,res,next){
    // if the user is signed in ,then pass on the request to the next fnction(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
}

passport.setAuthentication=function(req,res,next){
    if(req.isAuthenticated){
        //req.user contains the current signed in user from the session cookiw and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }

    next();
}



module.exports=passport;
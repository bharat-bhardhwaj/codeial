const Post = require('../models/post')
const Comment= require('../models/comment');
module.exports.create = async function(req, res){
    try {
        let post= await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success','Post published!');
        return res.redirect('back');
        
    } catch (error) {

        req.flash('error',err);
        return res.redirect('back');
        return;
    }
   
}


module.exports.destroy= async function(req,res){

    try{
        let post=await Post.findById(req.params.id);

        if(post.user==req.user.id){
            post.remove();
    
            await Comment.deleteMany({post: req.param.id});
            req.flash('success','Post and associated comments deleted');
            return res.redirect('back');
            
        }else{
            req.flash('error','you can not delete this post');
            return res.redirect('back');
        }

    }catch(err){

        req.flash('error',err);

        return res.redirect('back');
    }

    


        
        
}
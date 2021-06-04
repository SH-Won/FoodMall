const express = require('express');
const router = express.Router();

const {Comment} = require('../models/Comment');
const {auth} =require('../middleware/auth');

router.post('/saveComment',(req,res)=>{
    const comment = new Comment(req.body);
    comment.save((err,result)=>{
        Comment.find({'_id':result._id})
        .populate('writer')
        .exec((err,comment)=>{
            if(err) res.status(400).json({success:false,err})
            res.status(200).json(comment);
        })
    })
})
router.get('/getComments',(req,res)=>{
    Comment.find({postId:req.query.postId})
    .populate('writer')
    .exec((err,comments)=>{
        if(err) res.status(400).json({success:false,err})
        res.status(200).json(comments);
    })

})

module.exports =router;
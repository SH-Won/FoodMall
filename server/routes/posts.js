const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} =require('multer-storage-cloudinary');
const config = require('../config/key');
const {Post} = require('../models/Post');
const { auth } = require("../middleware/auth");

const cloud_name=process.env.cloud_name || config.cloud_name
const api_key=process.env.api_key || config.api_key
const api_secret=process.env.api_secret || config.api_secret

cloudinary.config({
    cloud_name:config.cloud_name,
   api_key:config.api_key,
   api_secret:config.api_secret
})

const Storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'uploads',
        format: async (req,file)=>{
            'jpg','png','gif';
        },
        public_id:(req,file)=>{
        }
    }
})
const upload = multer({storage:Storage}).array('file');

router.post('/uploadfiles',(req,res)=>{
    upload(req,res,err=>{
        if(err) return res.json({success:false,err});

        let urlData = [];
        
        req.files.forEach(file=>{
            urlData.push(file.path);
        })
        console.log(urlData);
        return res.json({success:true, url:urlData})
    })
})
router.post('/uploadPost',(req,res)=>{
    const post = new Post(req.body);
    post.save((err,result)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true});
        console.log(result);
    })
})

router.get('/getPosts',(req,res)=>{
   console.log('searchValue',req.query.searchValue);
   let skip = req.query.skip ? parseInt(req.query.skip) : Number(0);
   let limit = req.query.limit ? parseInt(req.query.limit) : 100; 
   //let order = req.body.order ? req.body.order :'desc';
   //let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  // let limit = req.body.limit? parseInt(req.body.limit) : 100;
   //let skip = parseInt(req.body.skip);
   //let findArgs ={};
   let filter = req.query.filter ? JSON.parse(req.query.filter) : '';
   let searchValue = req.query.searchValue ? req.query.searchValue :'';
   let findArgs={};
   for(let key in filter){
       if(filter[key].length > 0){
           if(key === 'price'){

           }
           else{
               findArgs[key] = filter[key];
           }
       }
   }
   console.log(findArgs)
   //query는 다 스트링
   
   //console.log(filter);
   //console.log(typeof filter)
   // findArgs = { category : [1,2,3,4,5,6 ...] }
   if(searchValue){
   Post.find(findArgs)
   .find({$text:{$search:searchValue}})
   .skip(skip)
   .limit(limit)
   .populate('writer')
   .exec((err,posts)=>{
       if (err) res.json({success:false,err})
       res.json(
           posts
           
       );
      
   })
   }
   else{
    Post.find(findArgs)
    .skip(skip)
    .limit(limit)
    .populate('writer')
    .exec((err,posts)=>{
        if (err) res.json({success:false,err})
        res.json(posts);
       
    })
       
   }
})

router.get('/getPostDetail',(req,res)=>{
    let postIds = req.query.postId;
    let type = req.query.type;
    if(type==='array'){
        let ids = req.query.postId.split(',');
        postIds=[];
        postIds=ids.map(id=>id);
    }
    console.log(postIds);

    Post.find({_id:{$in:postIds}})
    .populate('writer')
    .exec((err,post)=>{
        if(err) res.status(400).json({success:false,err})
        res.status(200).json(post);
        console.log(post);
    })
})


router.get('/getCartItemDetail',(req,res)=>{
    let type = req.query.type;
    let postIds = req.query.postIds;

    if(type === 'array'){
        let ids = req.query.postIds.split(',');
        postIds=[];
        postIds=ids.map(id=>id);
    }

    Post.find({_id:{$in:postIds}})
    .populate('writer')
    .exec((err,posts)=>{
        if(err) res.status(400).json(err)
        res.status(200).json(posts)
    })
})


module.exports = router;
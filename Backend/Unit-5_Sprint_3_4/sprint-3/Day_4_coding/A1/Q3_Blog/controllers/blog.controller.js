const BlogModel = require("../models/blog.model");

// Test route
const testRoute =  (req, res) => {
  try {
    res.status(200).json({ message: "Testing successful", user: req.user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

// Add New Blog
const addNewBlog =  async (req, res) => {
  try {
    req.body.createdBy = req.user;
    let newBlog = await BlogModel.create(req.body);
    res.status(201).json({ message: "Blog created", newBlog });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

// Get Blogs
const getBlogs = async (req, res) => {
  try {
    let blogs = await BlogModel.find(
      { createdBy: req.user },
      { _id: 0, title: 1, content: 1,tags:1 }
    );
    if (blogs.length == 0) {
      return res.status(400).json({ message: "Blog list is Empty!!" });
    }
    res.status(200).json({ message: "List of Notes", blogs });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

// Update Blog
const updateBlog =  async (req, res) => {
  try {
    const { id } = req.params;
    let blog = await BlogModel.findById(id);
    if(!blog){
       return res.status(404).json({ message: "Blog not Found!!" });
    }
    if (req.user == blog.createdBy.toString()) {
        let updatedBlog = await BlogModel.findByIdAndUpdate(id,req.body,{new:true})
      res.status(200).json({ message: "Updated succesfully",updatedBlog });
    } else {
        res.status(403).json({ message: "Unauthorized access to edit this Blog" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

// Delete note
const deleteBlog =  async (req, res) => {
  try {
    const {id} = req.params
    let blog = await BlogModel.findById(id)
     if(!blog){
       return res.status(404).json({ message: "Blog not Found!!" });
    }
    if(blog.createdBy.toString()==req.user){
        let deletedBlog = await BlogModel.findByIdAndDelete(id)
        res.status(200).json({error:"Blog get deleted",result:deletedBlog})
    }else{
        res.status(403).json({error:"Unauthorized access to delete this Blog"})
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

// Analystics route

const stats = async (req,res)=>{
    try {
        let countBlogs = await BlogModel.countDocuments()
        let blogCountPerUser = await BlogModel.aggregate([
            {$lookup:{
                from:"users",
                localField:"createdBy",
                foreignField:"_id",
                as:"user"
            }},
            {$unwind:"$user"},
            {$group:{
                _id:"$user.name",
                countBlogs:{$sum:1}
            }},
            {$project:{
                userName:"$_id",
                _id:0,
                countBlogs:1
            }}
        ])
        let commonTags = await BlogModel.aggregate([
            {$unwind:"$tags"},
            {$group:{
                _id:"$tags",
                countTags:{$sum:1}
            }},
            {$sort:{countTags:-1}},
            {$limit:3},
            {$project:{
                tagName:"$_id",
                countTags:1,
                _id:0
            }}
        ])
        res.status(200).json({TotalBlogs:countBlogs,blogCountPerUser,commonTags})
    } catch (error) {
         res.status(500).json({ error: "Something went wrong", message: error.message });
    }
}

module.exports = {
    testRoute,
    addNewBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
    stats
}
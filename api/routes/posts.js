const router = require("express").Router();
const Company = require("../model/Company");

//Create
router.post("/", async (req, res) => {
    const newPost = new Company(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
        console.log("=====error====>" + err)
    }
});

//Update
router.put("/:id", async (req, res) => {
    try {
        const post = await Company.findById(req.params.id);
        if (post.id === req.params.id) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {




                });
                res.status(200).json(updatedPost)
            } catch (err) {
                res.status(500).json(err);
            }
        }
    } catch (err) {
        res.status(500).json(err)
        console.log("=====error====>" + err)
    }
});

//Delete
router.delete("/:id", async (req, res) => {
    try {
        const post = await Company.findById(req.params.id);
        if (post.id === req.params.id) {
            await post.delete();
            res.status(200).json("Your product is deleted...");
        }
    } catch (err) {
        res.status(500).json(err)
        console.log("=====error====>" + err)
    }
});

module.exports = router;
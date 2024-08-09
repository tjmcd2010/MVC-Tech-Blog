const express = require('express');
const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

//Route for creating a new Blog 
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      owner_id: req.session.owner_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedBlog = await Blog.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!deletedBlog) {
      return res.status(404).json({ message: 'No blog found with this id!' });
    }

    res.status(200).json(deletedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

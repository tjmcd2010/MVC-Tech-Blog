const router = require('express').Router();
const bloggerRoutes = require('./bloggerRoutes');
const blogRoutes = require('./blogRoutes');

router.use('/bloggers', bloggerRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;

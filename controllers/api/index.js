const router = require('express').Router();
const ownerRoutes = require('./ownerRoutes');
const blogRoutes = require('./blogRoutes');

router.use('/owners', ownerRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;

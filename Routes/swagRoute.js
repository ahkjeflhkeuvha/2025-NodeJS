const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send(req.body);
});
  
router.get('/:person', (req, res) => {
    res.send(req.params.person);
})
  
router.get('/', (req, res) => {
    res.send('get swag');
})

module.exports = router;
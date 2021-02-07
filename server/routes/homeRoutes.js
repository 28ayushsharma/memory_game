const express = require('express');
const router  = express.Router();

const gameController = require('../controllers/gameController');

router.get('/', (req, res, next) => {

    res.status(200).json({
        "msg" : 'welcome to memory game'
    });


}); 

router.post('/save-difficulty', gameController.saveDifficulty);
router.post('/save-action', gameController.saveAction);

module.exports = router;
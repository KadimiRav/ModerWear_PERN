const Router = require('express')
const router = new Router()
const wearController = require('../controllers/wearController')

router.post('/', wearController.create)
router.get('/', wearController.getAll)
router.get('/:id', wearController.getOne)

module.exports = router

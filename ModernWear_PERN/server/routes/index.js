const Router = require('express')
const router = new Router()
const wearRouter = require('./wearRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/wear', wearRouter)

module.exports = router

const uuid = require('uuid')
const path = require('path');
const {Wear, WearInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class WearController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const wear = await Wear.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    WearInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: wear.id
                    })
                )
            }

            return res.json(wear)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
// Фильтрация
    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let wears;
        if (!brandId && !typeId) {
            wears = await Wear.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            wears = await Wear.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            wears = await Wear.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            wears = await Wear.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(wears)
    }

    async getOne(req, res) {
        const {id} = req.params
        const wear = await Wear.findOne(
            {
                where: {id},
                include: [{model: WearInfo, as: 'info'}]
            },
        )
        return res.json(wear)
    }
}

module.exports = new WearController()

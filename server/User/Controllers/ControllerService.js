const { Service } = require('../models')

class ControllerService {
  static async findAll(req, res, next) {
    try {
      const result = await Service.findAll()
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async findOneService(req, res, next) {
    const { id } = req.params
    try {
      const result = await Service.findByPk(id)
      if(!result) {
        throw ({ name: 'Data Not Found' })
      } else {
        res.status(200).json(result)
      }
    } catch (err) {
      next(err)
    }
  }

  static async createService(req, res, next) {
    const { antigen_price, pcr_price } = req.body
    try {
      const result = await Service.create({ antigen_price, pcr_price, swab_antigen: false, swab_pcr: false })
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async deleteService(req, res, next) {
    const { id } = req.params
    try {
      const foundService = await Service.findByPk(id)
      if (!foundService) {
        throw ({ name: 'Data Not Found' })
      } else {
        await Service.destroy({ where: { id } })
        res.status(200).json({ message: `Service with ID : ${foundService.id} has been deleted` })
      }
    } catch (err) {
      next(err)
    }
  }

  static async editService(req, res, next) {
    const { id } = req.params
    const { swab_antigen, swab_pcr, antigen_price, pcr_price } = req.body
    const data = { swab_antigen, swab_pcr, antigen_price, pcr_price }
    try {
      const result = await Service.update(data, { where: { id }, returning: true })
      res.status(200).json(result[1][0])
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerService
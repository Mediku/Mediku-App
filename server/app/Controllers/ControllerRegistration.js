const { Registration, Clinic, User } = require('../models')

class ControllerRegistration {
  static async findAll(req, res, next) {
    try {
      const result = await Registration.findAll({
        where: { UserId: req.user.id },
        include: [
          {
            model: User
          },
          {
            model: Clinic
          }
        ]
      })
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async findOneRegistration(req, res, next) {
    const { id } = req.params
    try {
      const result = await Registration.findByPk(id, {
        include: [
          {
            model: User
          },
          {
            model: Clinic
          }
        ]
      })
      if (!result) {
        throw ({ name: 'Data Not Found' })
      } else {
        res.status(200).json(result)
      }
    } catch (err) {
      next(err)
    }
  }

  static async createRegistration(req, res, next) {
    let is_paid;
    let is_tested;
    const { service_name, total_price, date, time, ClinicId } = req.body
    if (req.body.is_paid == 'true') {
      is_paid = true
    } else {
      is_paid = false
    }
    if (req.body.is_tested == 'true') {
      is_tested = true
    } else {
      is_tested = false
    }
    const UserId = req.user.id
    try {
      const result = await Registration.create({ service_name, total_price, date, time, is_paid, ClinicId, UserId, is_tested })
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async deleteRegistration(req, res, next) {
    const { id } = req.params
    try {
      const foundRegistration = await Registration.findByPk(id)
      if (!foundRegistration) {
        throw ({ name: 'Data Not Found' })
      } else {
        await Registration.destroy({ where: { id } })
        res.status(200).json({ message: `Registration with ID : ${foundRegistration.id} has been deleted` })
      }
    } catch (err) {
      next(err)
    }
  }

  static async editRegistration(req, res, next) {
    let is_paid;
    let is_tested;
    const { id } = req.params
    const { service_name, total_price, date, time, ClinicId, test_result } = req.body
    const UserId = req.user.id
    if (req.body.is_paid == 'true') {
      is_paid = true
    } else {
      is_paid = false
    }
    if (req.body.is_tested == 'true') {
      is_tested = true
    } else {
      is_tested = false
    }
    const data = { service_name, total_price, date, time, ClinicId, UserId, is_paid, is_tested, test_result }
    try {
      const result = await Registration.update(data, { where: { id }, returning: true })
      res.status(200).json(result[1][0])
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerRegistration
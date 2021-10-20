const { verifyToken } = require('../helpers/jwt')
const { User, Clinic } = require('../models')

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers
    if (access_token) {
      const verified = verifyToken(access_token)
      const user = await User.findByPk(verified.id)
      req.user = {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        gender: user.gender,
        date_of_birth: user.date_of_birth,
        identity_card_address: user.identity_card_address,
        identity_card_number: user.identity_card_number,
        phone_number: user.phone_number,
        regency: user.regency,
        province: user.province,
        district: user.district,
        sub_district: user.sub_district,
        RT: user.RT,
        RW: user.RW,
      }
      next()
    } else {
      throw { name: 'Please Login First' }
    }
  } catch (err) {
    next(err)
  }
}

async function authClinic(req, res, next) {
  try {
    const { access_token } = req.headers
    if (access_token) {
      const verified = verifyToken(access_token)
      const clinic = await Clinic.findByPk(verified.id)
      req.clinic = {
        id: clinic.id,
        name: clinic.name,
      }
      next()
    } else {
      throw { name: 'Please Login First' }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authentication,
  authClinic
}
const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authenticationUser(req, res, next) {
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

async function authenticationClinic(req, res, next) {
  try {
    const { access_token } = req.headers
    if (access_token) {
      const verified = verifyToken(access_token)
      const clinic = await Clinic.findByPk(verified.id)
      req.user = {
        id: clinic.id,
        name: clinic.name,
        email: clinic.email,
        phone_number: clinic.phone_number,
        address: clinic.address,
        imageURL: clinic.imageURL,
        operational_time_open: clinic.operational_time_open,
        operational_time_close: clinic.operational_time_close,
        swab_antigen: clinic.swab_antigen,
        swab_pcr: clinic.swab_pcr,
        antigen_price: clinic.antigen_price,
        pcr_price: clinic.pcr_price
      }
      next()
    } else {
      throw { name: 'Please Login First' }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { authenticationUser, authenticationClinic }
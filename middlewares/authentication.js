const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers
    if (access_token) {
      const verified = verifyToken(access_token)
      const user = await User.findByPk(verified.id)
      if (user) {
        req.user = {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          gender: user.gender,
          domisili_address: user.domisili_address,
          date_of_birth: user.date_of_birth,
          identity_card_address: user.identity_card_address,
          identity_card_number: user.identity_card_number,
          phone_number: user.phone_number,
        }
        next()
      } else {
        throw { name: "Invalid Token" }
      }
    } else {
      throw { name: 'Please Login First' }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authentication
const { Registration } = require('../models')

const authorizationRegistration = async (req, res, next) => {
  const id = +req.params.id
  try {
    const foundRegistration = await Registration.findByPk(id)
    if (foundRegistration) {
      if (req.user.id == foundRegistration.UserId) {
        next()
      } else {
        throw ({ name: 'You are not authorized' })
      }
    } else {
      throw ({ name: 'Data not found' })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { authorizationRegistration }
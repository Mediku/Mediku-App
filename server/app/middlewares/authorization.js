const { Registration, User } = require('../models')

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
      throw ({ name: 'Data Not Found' })
    }
  } catch (err) {
    next(err)
  }
}

const authorizationUser = async (req, res, next) => {
  const id = +req.params.id
  try {
    const foundUser = await User.findByPk(id)
    if (foundUser) {
      if (req.user.id == foundUser.id) {
        next()
      } else {
        throw ({ name: 'You are not authorized' })
      }
    } else {
      throw ({ name: 'Data Not Found' })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { authorizationRegistration, authorizationUser }
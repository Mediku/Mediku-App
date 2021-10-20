const { Registration, User, Clinic } = require('../models')

const authorizationRegistration = async (req, res, next) => {
  const id = +req.params.id
  try {
    const foundRegistration = await Registration.findByPk(id)
    console.log(foundRegistration)
    if (foundRegistration) {
      if (req.clinic.id == foundRegistration.ClinicId) {
        next()
      } else {
        throw ({ name: 'You are not authorized' })
      }
    } else {
      throw ({ name: 'Data Not Found' })
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const authorizationUser = async (req, res, next) => {
  const id = +req.params.id
  try {
    const foundUser = await User.findByPk(id)
    if (foundUser) {
      if (req.clinic.id == foundUser.ClinicId) {
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

// mau edit, => user login atau klinik login
// harus punya data registrasi yang user id / klinik id nya sama

module.exports = { authorizationRegistration, authorizationUser }
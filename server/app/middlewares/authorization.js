const { Registration } = require('../models')

const authorizationUser = async (req, res, next) => {
  const idUser = +req.user.id
  try {
    const foundRegistration = await Registration.findOne({ where: { UserId: idUser } })
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

const authorizationClinic = async (req, res, next) => {
  const idClinic = +req.clinic.id
  try {
    const foundRegistration = await Registration.findOne({ where: { ClinicId: idClinic } })
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
    next(err)
  }
}

// mau edit, => user login atau klinik login
// harus punya data registrasi yang user id / klinik id nya sama

module.exports = { authorizationUser, authorizationClinic }
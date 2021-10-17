const { User } = require('../models')
const { signToken } = require('../helpers/jwt')
const { checkPassword, hashPassword } = require('../helpers/bcryptjs')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class ControllerUser {
  static async register(req, res, next) {
    const { full_name, email, password } = req.body
    try {
      const result = await User.create({ full_name, email, password })
      res.status(201).json({ id: result.id, email: result.email, full_name: result.full_name })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body
    try {
      const result = await User.findOne({ where: { email } })
      if (result) {
        if (checkPassword(password, result.password)) {
          const access_token = signToken({ id: result.id, email: result.email })
          res.status(200).json({
            id: result.id,
            email: result.email,
            full_name: result.full_name,
            phone_number: result.phone_number,
            identity_card_number: result.identity_card_number,
            identity_card_address: result.identity_card_address,
            gender: result.gender,
            date_of_birth: result.date_of_birth,
            domisili_address: result.domisili_address,
            access_token
          })
        } else {
          throw ({ name: 'Unauthorized' })
        }
      } else {
        throw ({ name: 'Unauthorized' })
      }
    } catch (err) {
      next(err)
    }
  }

  static async editUserProfile(req, res, next) {
    const { full_name, phone_number, identity_card_number, identity_card_address, gender, email, domisili_address, password, date_of_birth } = req.body
    const data = { full_name, phone_number, identity_card_number, identity_card_address, gender, email, domisili_address, password, date_of_birth }
    try {
      const result = await User.update(data, { where: { id: req.user.id }, returning: true, individualHooks: true })
      res.status(200).json({
        id: result[1][0].id,
        email: result[1][0].email,
        full_name: result[1][0].full_name,
        phone_number: result[1][0].phone_number,
        identity_card_number: result[1][0].identity_card_number,
        identity_card_address: result[1][0].identity_card_address,
        gender: result[1][0].gender,
        date_of_birth: result[1][0].date_of_birth,
        domisili_address: result[1][0].domisili_address,
      })
    } catch (err) {
      next(err)
    }
  }

  static async findUserLogin(req, res, next) {
    const { id } = req.user
    try {
      const user = await User.findByPk(id)
      res.status(200).json({ id: user.id, phone_number: user.phone_number, full_name: user.full_name, identity_card_number: user.identity_card_address, identity_card_address: user.identity_card_address, gender: user.gender, date_of_birth: user.date_of_birth, email: user.email, domisili_address:user.domisili_address })
    } catch (err) {
      next(err)
    }
  }

  static async googleAuthLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      const { email, name } = ticket.getPayload()
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: email,
        }
      })
      if (user) {
        const access_token = signToken({
          id: user.id,
          email: user.email,
        })
        res.status(200).json({ id: user.id, email: user.email, access_token })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerUser
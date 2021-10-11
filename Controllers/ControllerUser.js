const { User } = require('../models')
const { signToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcryptjs')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class ControllerUser {
  static async register(req, res, next) {
    const { full_name, phone_number, identity_card_number, identity_card_address, gender, email, domisili_address, password, date_of_birth } = req.body
    try {
      const result = await User.create({ full_name, phone_number, identity_card_number, identity_card_address, gender, date_of_birth, email, domisili_address, password })
      res.status(201).json(result)
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

  static async findUserLogin(req, res, next) {
    const { id } = req.user
    try {
      const user = await User.findByPk(id)
      res.status(200).json(user)
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
        res.status(200).json({ id: user.id, full_name: user.full_name, email: user.email, access_token })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerUser
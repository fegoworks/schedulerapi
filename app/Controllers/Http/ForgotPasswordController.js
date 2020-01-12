'use strict'

const User = use('App/Models/User')
const Mail = use('Mail')

const moment = require('moment')
const crypto = require('crypto')

class ForgotPasswordController {
  async recoverPassword({
    request
  }) {
    try {
      const {
        email
      } = request.only(['email'])

      const user = await User.findByOrFail('email', email)

      const token = await crypto.randomBytes(10).toString('hex')

      user.token_created_at = new Date()
      user.token = token

      await user.save()
      await Mail.send('emails.recover', {
        user,
        token
      }, (message) => {
        message
          .from('support@hotmail.com')
          .to(email)
      })

      return user
    } catch (error) {
      console.log(error);
    }
  }

  async updatePassword({
    request,
    response,
    params
  }) {
    const {
      token,
      email
    } = params
    const {
      newPassword
    } = request.only(['newPassword'])

    const user = await User.findByOrFail('email', email)

    if (token !== user.token) {
      return response.status(401).json({
        message: {
          error: 'This token has expired, resend link'
        }
      })
    }

    const isTokenExpired = moment()
      .subtract(2, 'days')
      .isAfter(user.token_created_at)

    if (isTokenExpired) {
      return response.status(201).json({
        message: {
          error: "Token expired"
        }
      })
    }
    // Save new password
    user.password = newPassword

    // CLear token
    user.token = null
    user.token_created_at = 0

    await user.save()
  }
}

module.exports = ForgotPasswordController

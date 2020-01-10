'use strict'
const User = use('App/Models/User')

class UserController {
  async store({
    request,
    response
  }) {
    try {
      // request data coming from the request
      const data = request.only(['username', 'email', 'password'])
      const {
        email
      } = data

      const user = await User.findBy('email', email)

      if (user) {
        return response.status(400).json({
          message: {
            error: 'User already registered'
          }
        })
      }
      const newUser = await User.create(data)
      return response.status(200).json({
        status: "Success",
        data: newUser
      })

    } catch (error) {
      return response.status(error.status).json({
        error
      })
    }
  }
}

module.exports = UserController

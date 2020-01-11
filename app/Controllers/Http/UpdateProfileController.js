'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')

class UpdateProfileController {
  async update({
    request,
    response,
    params
  }) {
    const {
      id
    } = params;
    const {
      username,
      password,
      newPassword
    } = request.only(['username', 'password', 'newPassword'])

    const user = await User.findByOrFail('id', id)
    const isPassword = await Hash.verify(password, user.password)

    if (!isPassword) {
      return response.status(400).json({
        message: {
          error: "Password provided is incorrect"
        }
      })
    }

    user.username = username
    user.password = newPassword

    const update = await user.save()

    return response.status(200).json({
      status: "Success",
      data: update
    })
  }
}

module.exports = UpdateProfileController

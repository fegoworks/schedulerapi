'use strict'
const Hash = use('Hash')

class UpdateProfileController {
  async update({
    request,
    response,
    auth,
    params
  }) {
    const {
      id
    } = params
    const {
      username,
      password,
      newPassword
    } = request.only(['username', 'password', 'newPassword'])

    const user = auth.current.user
    if (id !== user.id) {
      return response.status(401).json({
        message: {
          error: "Cannot update this account"
        }
      })
    }
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

    const updatedDetails = await user.save()

    return response.status(200).json({
      status: "Success",
      data: updatedDetails
    })
  }
}

module.exports = UpdateProfileController

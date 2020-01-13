'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.signup')
Route.post('auth/signin', 'UserController.signin')
Route.group(() => {
  // update username and password
  Route.put('users/:id', 'UpdateProfileController.update')
}).middleware('auth')
Route.post('users/forgotPassword', 'ForgotPasswordController.recoverPassword')
Route.put('users/forgotPassword/:token/:email', 'ForgotPasswordController.updatePassword')
Route.group(() => {
  Route.post('events/new', 'EventController.store')
}).middleware('auth')

'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.signup')
Route.post('auth/signin', 'UserController.signin')
Route.group(() => {
  // update username and password
  Route.put('users/:id', 'UpdateProfileController.update')
}).middleware('auth')
Route.post('users/passwords', 'ForgotPasswordController.recoverPassword')
Route.put('users/passwords/:token/:email', 'ForgotPasswordController.updatePassword')
Route.group(() => {
  Route.post('events/', 'EventController.store')
  Route.get('events/', 'EventController.index')
  Route.get('events/date/', 'EventController.show')
  Route.delete('events/:id/', 'EventController.destroy')
}).middleware('auth')
Route.get('/', ({
  view
}) => {
  return view.render('documentation')
});
Route.any('*', ({
  request,
  response
}) => {
  response.status(404).json({
    status: 404,
    error: 'that route does not exist',
  });
});

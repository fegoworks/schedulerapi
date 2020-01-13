'use strict'
const Event = use('App/Models/Event')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with events
 */
class EventController {
  /**
   * Show a list of all events.
   * GET events
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({
    response,
    auth
  }) {
    try {
      const user = auth.current.user

      const events = await Event.query().where({
        user_id: user.id
      }).fetch()

      return response.status(200).json({
        status: "Success",
        data: events
      })

    } catch (error) {
      return response.status(error.status).json({
        message: {
          error: "User is unauthorized"
        }
      })
    }
  }

  /**
   * Create/save a new event.
   * POST events
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({
    request,
    response,
    auth
  }) {

    try {
      const {
        title,
        location,
        date,
        time
      } = request.all()

      const user = auth.current.user

      const newEvent = await Event.create({
        user_id: user.id,
        title,
        location,
        date,
        time
      })

      return response.status(200).json({
        status: "Success",
        data: newEvent
      })
    } catch (error) {
      return response.status(error.status).json({
        message: {
          error: "Something went wrong while creating new event"
        }
      })
    }
  }

  /**
   * Display a single event.
   * GET events/:id
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({
    request,
    response,
    auth
  }) {
    try {
      const {
        date
      } = request.only(['date'])
      const user = auth.current.user

      const event = await Event.query().where({
        user_id: user.id,
        date
      }).fetch()

      console.log(event);


      if (event.rows.length === 0) {
        return response.status(404).json({
          message: {
            error: "Event not found"
          }
        })
      }

      return response.status(200).json({
        status: "Success",
        data: event
      })
    } catch (error) {
      if (error.name === 'ModelNotFoundException') {
        return response.status(error.status).json({
          message: {
            error: 'No event found'
          }
        })
      }
      return response.status(error.status)
    }
  }

  /**
   * Delete an event with id.
   * DELETE events/:id
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({
    params,
    response,
    auth
  }) {

    try {
      const eventId = params.id
      const user = auth.current.user

      // look for the event
      const event = await Event.query().where({
        id: eventId,
        user_id: user.id
      }).fetch()

      if (event.rows.length == 0) {
        return response.status(404).json({
          message: {
            error: 'No event found'
          }
        })
      }

      const jsonEvent = event.toJSON()[0]

      // confirm event owner
      if (jsonEvent['user_id'] !== user.id) {
        return response.status(401).json({
          message: {
            error: 'You are not allowed to delete this event'
          }
        })
      }
      // delete
      await Event.query().where({
        id: eventId,
        user_id: user.id
      }).delete()

      return response.status(200).json({
        status: "success",
      })
    } catch (error) {
      return response.status(error.status)
    }
  }
}

module.exports = EventController

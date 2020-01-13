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
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
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
   * Render a form to be used for creating a new event.
   * GET events/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({
    request,
    response,
    view
  }) {}

  /**
   * Create/save a new event.
   * POST events
   *
   * @param {object} ctx
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
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
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
      if (err.name === 'ModelNotFoundException') {
        return response.status(err.status).json({
          message: {
            error: 'No event found'
          }
        })
      }
      return response.status(err.status)
    }
  }

  /**
   * Delete a event with id.
   * DELETE events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({
    params,
    request,
    response
  }) {}
}

module.exports = EventController

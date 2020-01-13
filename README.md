# Adonis API application

This API was created using AdonisJS bolierplate, served via its CLI command and
it comes pre-configured with:

- Bodyparser
- Authentication
- CORS
- Lucid ORM
- Migrations and seeds

## Running the project

Manually clone the project and run `npm install`.

After having everything downloaded, go to your project folder and run
`adonis serve --dev`

If you don't have AdonisJS CLI installed you may have to run through
`./node_modules/.bin/adonis serve --dev`

### Requirements

#### Database

You'll need a relational database installed. It can be MySQL, PostgreSQL or slite.

Check `.env.example` to see how to configure your enviromental variables.

Pay special attention to `DB_CONNECTION` variable. Here's where you tell which
database you're using. You can either set with sqlite, mysql or pg (for PostgreSQL).

You'll also need other libraries depending on which database you use.

- `npm i --save sqlite3` (for sqlite)
- `npm i --save mysql` (for mysql or mariadb)
- `npm i --save pg` (for postgresql)

#### Email

We also send some emails in this API. In your env variables you'll need to set
four things:

- `MAIL_PORT`
- `MAIL_HOST`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`

I recommend you use [MailSpons](https://mailspons.com) while you are testing.

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

## project description

This an API that enables you to create an user. After creating this user, you'are able to create events, create tasks for events with dates.

## API endpoints

Here are all endpoints for this API:

### Creating a new user

Send a `POST` request to `/users` with the following JSON structure:

```json
{
	"username": ,
	"email": ,
	"password": ,
}
```

### Updating a user rofilr

Send a `PUT` request `users/:id` with the body:

```json
{
  "password": "123456",
  "newPassword": "1234",
  "username": "theirDaddytyyy"
}
```

### Signing in with the user

Send a `POST` request to `/auth/signin`, with the following:

```json
{
	"email": ,
	"password":
}
```

When you signin you'll receive a `Bearer token`. You'll need this token to send any request related to event and Task creation.

### Recovering the password

If, by any reason, you forgot the password, you won't be able to directly access the database and look for the password because it's encrypted. So you'll need to go through the normal process of a mere mortal using your system.

First, request a password recovery by sending a `POST` request to `/passwords` with:

```json
{
  "email": "email@here.com"
}
```

After that, you'll receive an email with a link. Grab the `token` that is after `paswords/`.

Having that token, to finally update the password, send a `PUT` request to `passwords/TOKEN_HERE` with the following JSON body:

```json
{
  "password": "123",
  "password_confirmation": "123"
}
```

> Frow now on, every request described here will require you send
> the Bearer token

### Creating a new event

Send a `POST` request to `/events`, with the following:

```json
{
  "title": "Second eventt",
  "location": "Lagos, Badagry",
  "date": "2020-01-12",
  "time": "14:39:00"
}
```

### Listing all events

If you want to see the list of all events, send a `GET` request to
`/events`.

There's no need for a JSON body in this request.

### Showing only a specific event

You can list only one event by sending a `GET` request to `events/event_ID_HERE`.

No need for a body as well.

### Deleting a event

Simply delete a event by informing its ID in the `DELETE` request URL
`events/event_ID`.

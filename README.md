# Strangereal Atlas

An interactive world map of Strangereal from Bandai Namco's [*Ace Combat*](https://en.wikipedia.org/wiki/Ace_Combat) series. Currently being developed using Leaflet and MongoDB.

## Technology

* [Leaflet.js](https://leafletjs.com/)
* [OSGeo4W](https://trac.osgeo.org/osgeo4w/)
* [MongoDB](https://www.mongodb.com/)
* [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)

## Setup

For local development, Strangereal Atlas uses the [MongoDB Compass](https://www.mongodb.com/try/download/compass) for the NoSQL database.

To install all Node.js dependencies, enter the following command:

```bash
$ npm install
```

To start the map server:

```bash
$ npm run server
```

If [Nodemon](https://nodemon.io/) is installed, the app may be run in development mode:

```bash
$ npm run dev
```

## Development

The app currently uses an XYZ tilemap created from a [fan-made rendition of the Strangereal world map by dynamitemcnamara](https://redd.it/czmiqi).

Features to be added:

* Shapes of each country (Osea and Yuktobania will be a pain to manually trace out...)
* A search feature to query countries and locations
* Implementation of the app in React.js

# Strangereal Atlas RESTful API Documentation

## Get a paginated list of countries

- request: `GET /api/countries/[?continent]`
- response: 200
  - content-type: `application/json`
  - body: list of country ids

```bash
curl -X GET http://localhost:8000/api/countries/?continent=osea
```

## Get a specific country

- request: `GET /api/countries/:id/`

```bash
curl -X GET http://localhost:8000/api/countries/belka/
```

## Get a paginated list of cities

- request: `GET /api/cities/[?country]`

## Get a specific city

- request: `GET /api/cities/:id/`

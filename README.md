# Schiphol Flight Reservation API

This Node.js based API is designed for processing flight reservation data for Schiphol Airport.

## Getting Started

These instructions will guide you through the setup and usage of the Schiphol Flight Reservation API.

### Prerequisites

Before starting, ensure that Node.js and npm are installed on your system. Postresql is also used in the project, so make sure it is installed as well

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/erdem-bektas/schiphol-flight-reservation-api
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Set Environment Variables:**

     Create a .env file and fill in the following variables:
   ```
   APPLICATION_ID=
   APPLICATION_KEY=
   DB_HOST=
   DB_NAME=
   DB_USER=
   DB_PASSWORD=
   REDIS_HOST=
   REDIS_PORT=
   ```

### Usage
- **For Building the Project:**
   ```bash
   npm build
   ```
- **Running in Development Environment:**
   ```bash
   npm dev
   ```
- **Running in Production Environment:**
   ```bash
   npm start
   ```

## API Routes

### Flight Routes
For detailed information on how to use the API, refer to the project's Postman collection.


| Endpoint                   | HTTP Method | Description                           |
| -------------------------- | ----------- | ------------------------------------- |
| `/flight`                  | GET         | Flight controller index route         |
| `/flight/flights`          | GET         | Retrieves all flights from API (cached) |
| `/flight/filter`           | GET         | Filters flights based on date and direction criteria |
| `/flight/get-flight-history`| GET        | Gets user based Flight history        |
| `/flight/filter/date`      | GET         | Filters flights by date               |
| `/flight/filter/direction` | GET         | Filters flights by destination        |
| `/flight/reservation`      | GET         | Retrieves all reservations (cached)   |
| `/flight/reservation`      | POST        | Adds a new reservation                |
| `/flight/:id`              | GET         | Retrieves details of a specific flight|

### User Routes

| Endpoint            | HTTP Method | Description                      |
| ------------------- | ----------- | -------------------------------- |
| `/user`             | GET         | User controller index route      |
| `/user/all`         | GET         | Retrieves all users (cached)     |
| `/user/register`    | POST        | Registers a new user             |

These routes provide access to various functionalities of the Schiphol Flight Reservation API. The `cacheMiddleware` indicates routes where caching is applied for improved performance.


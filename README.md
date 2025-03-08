## Overview
This project is a backend API for handling rape case data in India. It supports filtering, sorting, and querying data by various parameters such as state, city, age group, and year.

## Features
- Fetch case data based on year, state, city, and other attributes.
- Filtering options for State, Union Territory, and City.
- Sorting based on available data fields.
- Secure user authentication with JWT.

## Technologies Used
- **Node.js** with **Express.js** (Backend API)
- **MongoDB** (Database for storing user data)
- **Mongoose** (MongoDB Object Modeling for Node.js)
- **bcryptjs** (Password hashing)
- **jsonwebtoken** (JWT authentication)

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User signup
- `POST /api/auth/login` - User login

### Case Data
- `GET /api/cases?year=YYYY` - Get all case data for a specific year
- `GET /api/cases?year=YYYY&state=STATE_NAME` - Get case data for a state in a specific year
- `GET /api/cases?year=YYYY&city=CITY_NAME` - Get case data for a city in a specific year

## Filtering & Sorting
Filtering works based on category fields (`state`, `union_territory`, `city`). Sorting applies to fields present in the dataset. Example usage:

```
GET /api/cases?year=2020&state=Delhi&sortBy=total_cases&order=desc
```

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourrepo.git
   cd yourrepo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up `.env` file:
   ```
   MONGO_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```
4. Start the server:
   ```sh
   npm start
   ```


## Common Issues
- **hashPassword is not a function**: Ensure correct module export in `utils/hashPassword.js`.
- **Sort field 'year' not found in data**: Verify that `sortBy` exists in the dataset before applying sorting.

## Author
Ajitesh




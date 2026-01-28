# RESTful API Activity - Joel Parino

## Best Practices Implementation

This project demonstrates a professional RESTful API built with Express.js, implementing industry best practices for API design, error handling, and security.

### 1. Environment Variables

#### Why did we put `BASE_URI` in `.env` instead of hardcoding it?

**Answer:** Using environment variables for configuration makes the application flexible and secure. By storing `BASE_URI` in `.env`, we enable:
- **Portability**: Different environments (development, staging, production) can use different base URIs without code changes
- **Security**: Sensitive configuration stays out of version control (`.env` is in `.gitignore`)
- **Maintainability**: Configuration changes don't require redeploying code
- **Scalability**: Easy to manage across multiple deployments or microservices

Example: Development might use `/api/v1`, while production uses `/api/v2` with versioning.

---

### 2. Resource Modeling

#### Why did we use plural nouns (e.g., `/dishes`) for our routes?

**Answer:** Using plural nouns follows RESTful API conventions:
- **Standard Practice**: Plural nouns represent collections of resources (e.g., `/dishes`, `/users`, `/products`)
- **Semantic Clarity**: It's immediately clear that `/dishes` returns or manages a collection, not a single item
- **HTTP Method Alignment**: 
  - `GET /dishes` = retrieve all dishes
  - `POST /dishes` = create a new dish
  - `GET /dishes/1` = retrieve a specific dish by ID
  - `PUT /dishes/1` = update a specific dish
  - `DELETE /dishes/1` = delete a specific dish
- **Consistency**: Using a single naming convention across all endpoints improves API predictability and developer experience

---

### 3. Status Codes

#### When do we use `201 Created` vs `200 OK`?

**Answer:** The choice of status code depends on the action and response:
- **`201 Created`**: Used when a POST request successfully creates a new resource
  - The response includes the newly created resource in the body
  - Indicates that the resource was successfully created and is now available
  - Example: `POST /dishes` with a new dish returns `201 Created` with the dish details
  
- **`200 OK`**: Used for successful requests that don't create a new resource
  - GET requests (retrieving existing data)
  - PUT requests (updating existing resources)
  - DELETE requests that return data
  - Example: `GET /dishes` returns `200 OK` with the list of dishes

**In this project:**
- `POST /dishes` → `201 Created` (new resource created)
- `GET /dishes` → `200 OK` (existing resources retrieved)
- `PUT /dishes/:id` → `200 OK` (resource updated)
- `DELETE /dishes/:id` → `204 No Content` (resource deleted, no response body)

---

### 4. Error Handling

#### Why is it important to return `404` instead of just an empty array or a generic error?

**Answer:** Returning specific HTTP status codes is critical for proper error handling:
- **Semantic Correctness**: `404 Not Found` explicitly indicates that the requested resource doesn't exist, while `200 OK` with an empty array implies the request succeeded but found nothing
- **Client-Side Logic**: Clients can properly handle different scenarios:
  - `404`: Display "Resource not found" message
  - `200`: Display "No results found" message
  - `400`: Display "Invalid request" message
- **Debugging**: Specific status codes make it easier to identify issues and debug problems
- **API Contract**: Consistent status codes establish a clear contract with API consumers
- **REST Compliance**: HTTP status codes are part of the REST standard and should be used correctly

**In this project:**
- `404 Not Found`: When a specific dish ID doesn't exist
- `400 Bad Request`: When required fields are missing in POST/PUT requests
- `200 OK`: When requests succeed and return data
- `201 Created`: When a new resource is successfully created

---

## API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### Endpoints

#### 1. Get All Dishes
```
GET /dishes
```
**Optional Query Parameters:**
- `category`: Filter by category (e.g., `?category=Lunch`)
- `price`: Filter by max price (e.g., `?price=10`)
- `name`: Filter by name (contains search, e.g., `?name=Burger`)
- `isVegetarian`: Filter by vegetarian status (e.g., `?isVegetarian=true`)

**Response (200 OK):**
```json
{
  "status": 200,
  "message": "Retrieved dishes successfully",
  "data": [
    { "id": 1, "name": "Spicy Burger", "price": 12.99, "category": "Lunch", "isVegetarian": false }
  ]
}
```

#### 2. Create a Dish
```
POST /dishes
```
**Request Body:**
```json
{
  "name": "Vegetable Stir Fry",
  "price": 11.50,
  "category": "Lunch",
  "isVegetarian": true
}
```
**Response (201 Created):**
```json
{
  "status": 201,
  "message": "Dish created successfully",
  "data": { "id": 5, "name": "Vegetable Stir Fry", "price": 11.50, "category": "Lunch", "isVegetarian": true }
}
```

#### 3. Update a Dish
```
PUT /dishes/:id
```
**Request Body:**
```json
{
  "name": "Updated Burger",
  "price": 13.99,
  "category": "Lunch",
  "isVegetarian": false
}
```
**Response (200 OK):**
```json
{
  "status": 200,
  "message": "Dish updated successfully",
  "data": { "id": 1, "name": "Updated Burger", "price": 13.99, "category": "Lunch", "isVegetarian": false }
}
```

#### 4. Delete a Dish
```
DELETE /dishes/:id
```
**Response (204 No Content):**
```
No response body
```

---

## Testing

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. The server will start on `http://localhost:3000`

### Sample GET Request
```
GET http://localhost:3000/api/v1/dishes
```

**Successful Response:**
```json
{
  "status": 200,
  "message": "Retrieved dishes successfully",
  "data": [
    { "id": 1, "name": "Spicy Burger", "price": 12.99, "category": "Lunch", "isVegetarian": false },
    { "id": 2, "name": "Caesar Salad", "price": 8.5, "category": "Starters", "isVegetarian": true },
    { "id": 3, "name": "Chocolate Lava Cake", "price": 6.0, "category": "Dessert", "isVegetarian": true },
    { "id": 4, "name": "Grilled Salmon", "price": 18.0, "category": "Dinner", "isVegetarian": false }
  ]
}
```

### Error Handling Examples

**404 Not Found (Invalid ID):**
```
GET http://localhost:3000/api/v1/dishes/999
```
Response:
```json
{
  "status": 404,
  "message": "No dishes found matching the criteria",
  "data": []
}
```

**400 Bad Request (Missing Required Fields):**
```
POST http://localhost:3000/api/v1/dishes
Body: { "name": "Incomplete Dish" }
```
Response:
```json
{
  "status": 400,
  "message": "Bad Request: name, price, category, and isVegetarian are required",
  "data": []
}
```

---

## Technologies Used
- **Express.js**: Web framework
- **CORS**: Cross-Origin Resource Sharing
- **Dotenv**: Environment variable management
- **Nodemon**: Development server with auto-reload

---

## Project Structure
```
Parino-api-activity/
├── .env
├── .gitignore
├── package.json
├── server.js
├── README.md
└── src/
    ├── models/
    │   └── dishmodel.js
    └── routes/
        └── apiRoutes.js
```

---

## Author
Joel Parino

## License
ISC

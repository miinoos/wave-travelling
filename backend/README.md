# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Method: `POST`

### Description:

This endpoint is used to register a new user. It validates the input data, hashes the password, and stores the user in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the user details.

---

## Request Body:

The request body should be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min length: 3, required)",
    "lastname": "string (min length: 3, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min length: 6, required)"
}
```

### Example:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

---

## Response:

### Success Response:

- **Status Code:** `201 Created`
  **Body:**
  ```json
  {
    "token": "string (JWT token)",
    "user": {
      "_id": "string (user ID)",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string"
    }
  }
  ```

### Example:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "643d1f9e8f1b2c001c8e4d3a",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

### Error Responses:

#### 1. Validation Error:

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "string (error message)",
        "param": "string (field name)",
        "location": "string (body)"
      }
    ]
  }
  ```

#### Example:

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

#### 2. Missing Fields:

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": "All fields are required"
  }
  ```

#### 3. Duplicate Email:

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": "Email already exists"
  }
  ```

---

## Notes:

- The `password` is hashed before being stored in the database.
- The `fullname.lastname` field is optional.
- The `email` field must be unique.

---

## How to Test:

1. Use a tool like Postman or cURL to send a `POST` request to `/users/register`.
2. Ensure the request body matches the required structure.
3. Check the response for success or error messages.

---

## Example cURL Command:

```bash
curl -X POST http://localhost:5000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}'
```

---

# User Login Endpoint Documentation

## Endpoint: `/users/login`

### Method: `POST`

### Description:

This endpoint is used to authenticate a user. It validates the input data, checks the credentials, and returns a JSON Web Token (JWT) and the user details upon successful login.

---

## Request Body:

The request body should be a JSON object with the following structure:

```json
{
  "email": "string (valid email format, required)",
  "password": "string (min length: 6, required)"
}
```

### Example:

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

---

## Response:

### Success Response:

- **Status Code:** `200 OK`
  **Body:**
  ```json
  {
    "token": "string (JWT token)",
    "user": {
      "_id": "string (user ID)",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string"
    }
  }
  ```

### Example:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "643d1f9e8f1b2c001c8e4d3a",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

### Error Responses:

#### 1. Validation Error:

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "string (error message)",
        "param": "string (field name)",
        "location": "string (body)"
      }
    ]
  }
  ```

#### Example:

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### 2. Invalid Credentials:

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

## Notes:

- The `email` and `password` fields are required.
- The `password` is compared with the hashed password stored in the database.

---

## How to Test:

1. Use a tool like Postman or cURL to send a `POST` request to `/users/login`.
2. Ensure the request body matches the required structure.
3. Check the response for success or error messages.

---

## Example cURL Command:

```bash
curl -X POST http://localhost:5000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}'
```

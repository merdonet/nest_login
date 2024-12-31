# API Endpoints Documentation

## Authentication

### POST /auth/login

- **Description**: Authenticate user and get JWT token
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**: JWT token

### POST /auth/register

- **Description**: Register a new user
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string",
    "firstName": "string",
    "lastName": "string"
  }
  ```
- **Response**: Created user object

## Users

### GET /users

- **Description**: Get all users
- **Access**: Admin only
- **Headers**: Bearer token required
- **Response**: Array of user objects

### GET /users/:id

- **Description**: Get user by ID
- **Access**: Admin or Own User
- **Headers**: Bearer token required
- **Response**: User object

### PATCH /users/:id

- **Description**: Update user information
- **Access**: Admin or Own User
- **Headers**: Bearer token required
- **Request Body**: Partial user object
- **Response**: Updated user object

### DELETE /users/:id

- **Description**: Delete user
- **Access**: Admin only
- **Headers**: Bearer token required
- **Response**: Deleted user object

## Roles

### POST /roles

- **Description**: Create new role
- **Access**: Admin only
- **Headers**: Bearer token required
- **Request Body**:
  ```json
  {
    "name": "string",
    "permissions": ["string"]
  }
  ```
- **Response**: Created role object

### GET /roles

- **Description**: Get all roles
- **Access**: Admin only
- **Headers**: Bearer token required
- **Response**: Array of role objects

### GET /roles/:id

- **Description**: Get role by ID
- **Access**: Admin only
- **Headers**: Bearer token required
- **Response**: Role object

### DELETE /roles/:id

- **Description**: Delete role
- **Access**: Admin only
- **Headers**: Bearer token required
- **Response**: Deleted role object

## Response Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

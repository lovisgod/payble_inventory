# Payble API

## Overview

Payble is a comprehensive inventory and sales management API built with Node.js and Express. The system provides functionality for managing inventory items, processing till sales, and handling discounts within a business environment. It features user-based data segregation, JWT authentication, and integrates with Supabase as the backend database solution. The API is fully documented using Swagger/OpenAPI specifications.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Framework
The application uses **Express.js** as the web framework, providing a lightweight and flexible foundation for building the REST API. This choice enables rapid development and has extensive middleware support for common web application needs.

### Database Integration
**Supabase** serves as the primary database solution, providing PostgreSQL with built-in authentication and real-time capabilities. The application uses the Supabase JavaScript client for database operations, offering type-safe database interactions and automatic connection management through a singleton pattern.

### Authentication & Authorization
The system implements **JWT (JSON Web Token)** based authentication with custom middleware for token validation. Users must have changed their default onboarding password to access protected endpoints. The authentication flow includes:
- Bearer token validation
- Token expiration checking
- User permission verification

### Architecture Pattern
The application follows a **layered architecture** pattern:
- **Controllers**: Handle HTTP requests/responses and input validation
- **Services**: Contain business logic and orchestrate operations
- **Repositories**: Manage data access and database operations
- **DTOs**: Define data validation schemas using Joi

### API Documentation
**Swagger/OpenAPI 3.0** is integrated for comprehensive API documentation, providing interactive documentation with schema definitions, endpoint descriptions, and authentication specifications.

### Data Validation
**Joi** is used for robust data validation, particularly for till sales transactions, ensuring data integrity before database operations.

### Cross-Origin Resource Sharing
**CORS** middleware is enabled to support frontend applications from different domains.

### Logging & Monitoring
**Morgan** provides HTTP request logging for monitoring API usage and debugging.

## External Dependencies

### Database Service
- **Supabase**: PostgreSQL database with real-time capabilities, authentication, and storage
- Tables: `inventory`, `till_sales`, with user-based data segregation

### Authentication
- **jsonwebtoken**: JWT token generation and verification
- Custom middleware for token validation and user authorization

### API Documentation
- **swagger-jsdoc**: OpenAPI specification generation from JSDoc comments
- **swagger-ui-express**: Interactive API documentation interface

### Validation & Utilities
- **Joi**: Schema validation for request data
- **axios**: HTTP client for external API calls
- **dotenv**: Environment variable management

### Development Tools
- **morgan**: HTTP request logger
- **cors**: Cross-origin resource sharing middleware
- **cookie-parser**: Cookie parsing middleware
- **cross-env**: Cross-platform environment variable setting

### Environment Configuration
The application requires the following environment variables:
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_KEY`: Supabase API key
- `SECRET`: JWT signing secret
- `NODE_ENV`: Environment specification (development/production)
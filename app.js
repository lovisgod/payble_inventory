var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
var inventoryRoutes = require('./routes/inventoryRoutes');

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payble API',
      version: '1.0.0',
      description: 'A comprehensive API for managing inventory, sales, and discounts in the Payble system',
      contact: {
        name: 'API Support',
        email: 'support@payble.com'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' ? 'https://api.payble.com' : 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        InventoryItem: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'Unique identifier' },
            color: { type: 'string', nullable: true, description: 'Item color' },
            name: { type: 'string', description: 'Item name' },
            category_id: { type: 'string', format: 'uuid', description: 'Category UUID' },
            variant: { type: 'string', format: 'uuid', nullable: true, description: 'Variant UUID' },
            cost_price: { type: 'number', description: 'Cost price' },
            selling_price: { type: 'number', description: 'Selling price' },
            low_stock_unit: { type: 'number', default: 0, description: 'Low stock threshold' },
            barcode: { type: 'string', nullable: true, description: 'Item barcode' },
            sku: { type: 'string', nullable: true, description: 'Stock keeping unit' },
            low_stock_alert: { type: 'boolean', default: true, description: 'Low stock alert enabled' },
            image: { type: 'string', nullable: true, description: 'Item image URL' },
            pricing_unit: { type: 'string', nullable: true, description: 'Pricing unit' },
            user_id: { type: 'string', description: 'User identifier' },
            in_stock: { type: 'number', nullable: true, description: 'Stock quantity' },
            created_at: { type: 'string', format: 'date-time', description: 'Creation timestamp' }
          },
          required: ['name', 'category_id', 'cost_price', 'selling_price', 'user_id']
        },
        TillSale: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'Unique identifier' },
            user_id: { type: 'string', nullable: true, description: 'User identifier' },
            items: {
              type: 'array',
              nullable: true,
              description: 'Array of JSON objects representing sold items',
              items: {
                type: 'object'
              }
            },
            total_amount: { type: 'string', nullable: true, description: 'Total sale amount' },
            change_amount: { type: 'string', nullable: true, description: 'Change given' },
            payment_method: { type: 'string', nullable: true, description: 'Payment method' },
            transaction_date: { 
              type: 'string', 
              format: 'date-time', 
              nullable: true, 
              default: 'now()', 
              description: 'Transaction timestamp' 
            },
            notes: { type: 'string', nullable: true, description: 'Sale notes' },
            ref: { 
              type: 'string', 
              format: 'uuid', 
              nullable: true, 
              default: 'gen_random_uuid()', 
              description: 'Reference UUID' 
            },
            status: { 
              type: 'string', 
              nullable: true, 
              default: 'pending', 
              description: 'Sale status' 
            },
            business_id: { type: 'string', nullable: true, description: 'Business identifier' }
          }
        },
        Discount: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'Discount ID' },
            name: { type: 'string', nullable: true, default: '', description: 'Discount name' },
            amount: { type: 'string', nullable: true, default: '', description: 'Discount amount' },
            user_id: { type: 'string', nullable: true, default: '', description: 'User identifier' },
            type: { type: 'string', nullable: true, default: 'AMOUNT', description: 'Discount type' }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', enum: ['success', 'error'], description: 'Response status' },
            message: { type: 'string', description: 'Response message' },
            data: { type: 'object', description: 'Response data' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  origin: '*', // Allow all origins, you can specify a specific origin if needed
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
  // allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/api/v2/inventory", inventoryRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // return error as JSON
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {}
  });
});

module.exports = app;

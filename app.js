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
            name: { type: 'string', description: 'Item name' },
            color: { type: 'string', description: 'Item color' },
            category_id: { type: 'string', format: 'uuid', description: 'Category UUID' },
            variant: { type: 'string', format: 'uuid', description: 'Variant UUID' },
            cost_price: { type: 'number', description: 'Cost price' },
            selling_price: { type: 'number', description: 'Selling price' },
            in_stock: { type: 'boolean', description: 'Stock availability' },
            low_stock_unit: { type: 'number', description: 'Low stock threshold' },
            barcode: { type: 'string', description: 'Item barcode' },
            sku: { type: 'string', description: 'Stock keeping unit' },
            low_stock_alert: { type: 'boolean', description: 'Low stock alert enabled' },
            image: { type: 'string', description: 'Item image URL' },
            pricing_unit: { type: 'string', description: 'Pricing unit' },
            created_at: { type: 'string', format: 'date-time', description: 'Creation timestamp' }
          }
        },
        TillSale: {
          type: 'object',
          properties: {
            user_id: { type: 'string', description: 'User identifier' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  item_id: { type: 'integer', description: 'Item ID' },
                  name: { type: 'string', description: 'Item name' },
                  quantity: { type: 'integer', minimum: 1, description: 'Quantity sold' },
                  price: { type: 'string', description: 'Sale price' },
                  discount: { type: 'string', description: 'Applied discount' },
                  discount_type: { type: 'string', enum: ['percentage', 'fixed'], description: 'Discount type' }
                }
              }
            },
            total_amount: { type: 'string', description: 'Total sale amount' },
            change_amount: { type: 'string', description: 'Change given' },
            payment_method: { type: 'string', enum: ['cash', 'card', 'transfer'], description: 'Payment method' },
            notes: { type: 'string', description: 'Sale notes' },
            ref: { type: 'string', description: 'Reference number' },
            synced: { type: 'boolean', description: 'Sync status' },
            business_id: { type: 'string', description: 'Business identifier' },
            transaction_date: { type: 'string', description: 'Transaction date' },
            status: { type: 'string', enum: ['approved', 'pending', 'failed'], description: 'Sale status' }
          },
          required: ['user_id', 'total_amount', 'payment_method', 'business_id', 'transaction_date']
        },
        Discount: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'Discount ID' },
            user_id: { type: 'string', description: 'User identifier' },
            type: { type: 'string', description: 'Discount type' },
            value: { type: 'number', description: 'Discount value' },
            description: { type: 'string', description: 'Discount description' }
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

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();

// Load the Swagger UI configuration file
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Serve up the Swagger UI at the /doc endpoint
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

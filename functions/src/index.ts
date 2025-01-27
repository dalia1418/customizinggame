import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
import { defineString } from "firebase-functions/params";

// Define an environment variable
const GREETING = defineString('GREETING', { default: 'Hello from Firebase!' });

export const helloWorld = onRequest(async (request, response) => {
  try {
    // Log the function execution
    logger.info("Function executed", {
      functionName: "helloWorld",
      requestMethod: request.method,
      requestPath: request.path,
      requestQuery: request.query,
      requestHeaders: request.headers,
    });

    // Get the name from the query parameter, or use a default
    const name = request.query.name || 'World';

    // Use the environment variable
    const greeting = GREETING.value();

    // Prepare the response
    const responseMessage = `${greeting} ${name}!`;

    // Set response headers
    response.set('Content-Type', 'application/json');

    // Send the response
    response.status(200).json({
      message: responseMessage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    // Log the error
    logger.error("Error in helloWorld function", error);

    // Send an error response
    response.status(500).json({
      error: "An internal error occurred",
      timestamp: new Date().toISOString()
    });
  }
});

// If you're not using any other functions, you can keep them commented out
// export const anotherFunction = onCall((data, context) => {
//   // Function logic here
// });

// Ensure the file is treated as a module
export {};

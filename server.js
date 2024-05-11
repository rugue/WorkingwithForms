// Import required modules
const http = require("node:http");
const fs = require("fs");

// Set server hostname and port
const hostname = "localhost";
const port = 4000;

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle POST requests to root URL
  if (req.method === "POST" && req.url === "/") {
    let body = "";
    // // Read request body
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    // Process request body when data ends
    req.on("end", () => {
      try {
        // Parse request body as JSON
        const formData = JSON.parse(body);

        // Validate form fields
        if (!formData?.firstName || !formData?.lastName) {
          throw new Error("First name and last name are required.");
        }

        if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            formData?.email
          )
        ) {
          throw new Error("Invalid email address.");
        }
        if (formData?.mobileNumber?.length !== 11) {
          throw new Error("Mobile number must be 11 characters.");
        }
        if (!formData?.gender) {
          throw new Error("Gender is required.");
        }

        if (!["MALE", "FEMALE"].includes(formData?.gender)) {
          throw new Error("Gender must be one of the following (MALE, FEMALE)");
        }

        // Write form data to a file
        fs.writeFile(
          "database.json",
          JSON.stringify(formData, null, 2),
          (err) => {
            if (err) {
              // Respond with Internal Server Error if writing fails
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Internal Server Error");
            } else {
              // Respond with success message if writing succeeds
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "User created successfully" }));
            }
          }
        );
      } catch (error) {
        // Respond with Bad Request if any error occurs during processing
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end(error.message);
      }
    });
  } else {
    // Respond with Not Found for requests other than POST to root URL
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running and listening at http://${hostname}:${port}/`);
});

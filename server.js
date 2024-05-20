// Import required modules
const http = require("node:http");
const fs = require("fs");
const path = require("path");

// Set server hostname and port
const hostname = "0.0.0.0";
const port = process?.env?.PORT || 4000;

console.log("port", port);

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "GET" && req.url === "/") {
    // Serve the index.html file
    fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.method === "POST" && req.url === "/") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const formData = JSON.parse(body);

        // Validate form fields
        if (!formData.firstName || !formData.lastName) {
          throw new Error("First name and last name are required.");
        }

        if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            formData.email
          )
        ) {
          throw new Error("Invalid email address.");
        }

        if (formData.mobileNumber.length !== 11) {
          throw new Error("Mobile number must be 11 characters.");
        }

        if (!formData.gender) {
          throw new Error("Gender is required.");
        }

        if (!["MALE", "FEMALE"].includes(formData.gender)) {
          throw new Error("Gender must be one of the following (MALE, FEMALE)");
        }

        // Write form data to a file
        fs.writeFile(
          "database.json",
          JSON.stringify(formData, null, 2),
          (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Internal Server Error");
            } else {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "User created successfully" }));
            }
          }
        );
      } catch (error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end(error.message);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running and listening at http://${hostname}:${port}/`);
});

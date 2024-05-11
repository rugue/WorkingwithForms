## Simple HTML Form Project

This is a simple HTML form project that allows users to submit their information, including first name, last name, other names (optional), email, phone number, and gender. Upon submission, the form data is validated on both the client-side (HTML) and server-side (JavaScript) for errors.

### Running the Project

1. Prerequisites:

- Node.js and npm installed on your system

2. Clone the project:
   Bash
   git clone https://your-github-repo-url.git # Replace with your actual repo URL

3. Install dependencies: Navigate to the project directory and run:
   Bash
   npm install

4. Start the server:
   Bash
   node server.js

This will start the server on port 4000 by default. You can access the form in your browser at http://localhost:4000/.

### Testing the Code

1. Open http://localhost:4000/ in your browser.

2. Fill out the form with valid data.

3. Click the **"Submit"** button.

- If the data is valid, you should see an alert message indicating "User created successfully."

4. Try submitting the form with invalid data:

- Leave a field blank (first name, last name, email, phone number, or gender). You should see an alert message indicating the specific field that is required.
- Enter an invalid email address. You should see an alert message indicating "Invalid email address."
- Enter a phone number that is not 11 characters long. You should see an alert message indicating "Mobile number must be 11 characters."
- Enter a name that contains numbers. You should see an alert message indicating "First name should not contain number(s)" or "Last name should not contain number(s)".

**Note**: The validation for names not containing numbers is currently disabled on the server-side. You can uncomment the relevant lines in server.js to enable this validation.

This covers the basic testing of the form functionality and error handling. You can further test edge cases and specific scenarios as needed.

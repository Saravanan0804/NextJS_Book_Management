Running the Book Management Web Application Locally
This project is a simple web application built with Next.js, React, TypeScript, and Tailwind CSS to manage a list of books.

Prerequisites
Before running the project, ensure you have the following installed on your machine:

Node.js (v14.x or later)
npm (v7.x or later) or yarn (v1.22.x or later)
Git

Steps to Run the Project

1. Clone the Repository:

git clone https://github.com/your-username/your-project.git

2. Navigate to the Project Directory:

cd your-project

3. Install Dependencies:

If you're using npm:
npm install

If you're using yarn:
yarn

4. Start the Development Server:
npm run dev

Or with yarn:
yarn dev

5. Open the Application in Your Browser:

Once the development server starts, you can open the application in your web browser:

http://localhost:3000

6. Running Tests
To run any available unit tests for the components:
npm test

or with yarn:
yarn test

Additional Notes
This application fetches mock book data from a JSON file to simulate a backend API.
You can add new books using the form provided on the home page.
The book list supports sorting by title and author.
Pagination is implemented to navigate through the book list.

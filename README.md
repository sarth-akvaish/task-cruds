# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Backend

To get started with this project, follow the instructions below.

- Installation

- Clone the repository:
    - git clone https://github.com/sarth-akvaish/task-cruds.git

- Install dependencies:

    - cd your-repository
    - npm install

- Environment Variables
    - Create a .env file in the root directory of the project and add the following variables:
    - PORT=5000
    - PASSWORD=your-gmail-password
    - Note: Make sure to replace your-gmail-password with your actual Gmail password.

- Running the Server
    - Start the server using the following command:
        - npm start


- Routes
    - POST /sendEmail: Sends an email with selected items data.
        Request Body: Array of selected items data.

    - POST /createNew: Creates new form data.
        Request Body: Object containing name, phoneNumber, email, and hobbies.

    - GET /getAll: Retrieves all form data.

    - PUT /update/:id: Updates form data with the specified ID.
        Request Params: ID of the form data to be updated.
        Request Body: Updated form data object.
    - DELETE /delete/:id: Deletes form data with the specified ID.

# Project Setup Guide

Follow the steps below to set up and run the project.

## Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

## Steps to Run the Project

1. **Create a New MongoDB Connection**
   - Open the **MongoDB Compass** program.
   - Connect to your MongoDB server or create a new one.
   - Create a new database if needed, and take note of the connection string.

2. **Setup Environment Variables**
   - Create a new `.env` file in the root directory of the project.
   - Copy the contents of the `.env.example` file into the `.env` file.

3. **Install Dependencies**
   - Run the following command to install the required dependencies:
     ```bash
     npm install
     ```

4. **Run the Project**
   - Start the project with:
     ```bash
     npm run start
     ```

## Additional Notes

- Ensure the **Auth service** is running and properly configured.
- If you encounter any issues, refer to the `.env.example` file for configuration guidance or contact the development team.

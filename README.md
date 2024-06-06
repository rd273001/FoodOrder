# Food Order

This is a React Native application for ordering food, built with React Native for the frontend and Node.js with Express.js for the backend. The application allows users to search for food items, filter them by name, price, and type, and view detailed information about each item.

## Technologies Used

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#) &nbsp;&nbsp;
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#) &nbsp;&nbsp; 
[![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#) &nbsp;&nbsp;
[![Express.js](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)](#) &nbsp;&nbsp;
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](#) &nbsp;&nbsp;
[![Styled-Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](#) &nbsp;&nbsp;
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](#)

## Project Structure

The project is organized into two main directories:

- `client/`: Contains the React Native application code.
- `server/`: Contains the Node.js server code and API endpoints.

## Requirements

- Node.js (v14 or higher)
- React Native development environment (follow the [official React Native setup guide](https://reactnative.dev/docs/environment-setup))
- MongoDB Atlas account (for storing food data)

## Setup

1. Clone the repository:
git clone https://github.com/rd273001/FoodOrder.git

2. Navigate to the project directory:
cd FoodOrder

3. Install dependencies for both client and server:
- Navigate to "client" directory: `cd client` and run `npm install` OR `yarn install` 
- Navigate to "server" directory: `cd server` and run `npm install` OR `yarn install`

4. Create a `.env` file in the `server` directory and add your MongoDB Atlas connection string:
MONGODB_URI=your_mongodb_atlas_connection_string(ex: `mongodb+srv://<username>:<password>@cluster0.sbdsigv.mongodb.net/<database_name>?retryWrites=true&w=majority`)
PORT=3000

5. Create a `.env` file in the `client` directory and add BASE_URL(or you can add it in contsants file in utils or commons folder if no secret variables)
BASE_URL=http://192.168.29.129:3000/api/foods (http://your-ip:3000/api/foods)
- For local URL: you can check it with `ipconfig` command and see the IPv4 Address under Wireless LAN adapter Wi-Fi (Note: localhost is not used)
- For deployed URL: BASE_URL=http://deployed-url/api/foods

6. Start the development server:
- Navigate to server directory: cd server 
- run `npm start` or `yarn start`

7. In a new terminal window, start the React Native development server:
- Navigate to client directory: cd client 
- run `npm start` or `yarn start`

8. Run the app on your preferred platform (Android or iOS):
npx react-native run-android     # For Android
npx react-native run-ios         # For iOS

## Endpoints

The server exposes the following endpoints:

- `GET /`: Retrieves a list of food items. Supports query parameters for filtering by name (`?name=`), price (`?price=`), and type (`?type=`).

- `POST /addfood`: Adds a new food item to the database. Requires body as:
{
	name: String,
	price: Number,
	type: String
}
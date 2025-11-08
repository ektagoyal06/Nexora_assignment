E-com cart
An E-Commerce website to shop anything related to electronics, clothes, accessories and other things.
This project is a MERN-based e-commerce cart system where users can browse products, add them to the cart, proceed to checkout, and place an order. The order details are then stored in MongoDB.

Features

-Display list of products

-Add/remove products from cart

-Calculate cart totals dynamically

-Checkout modal collects user details

-Order Success Modal displays summary

-Orders stored in MongoDB


Tech Stack

-Frontend: React + Tailwind CSS

-Backend: Node.js, Express.js

-Database: MongoDB + Mongoose

Setup Instructions

1. Clone the Repository:
   
git clone <your-repository-url>

cd e-com cart

2.Install Dependencies

Backend

cd backend

npm install

Frontend

cd frontend

npm install

3.Configure Environment Variables

Create a .env file in the backend folder:

MONGO_URI=your_mongodb_connection_string

PORT=5000

4.Run the Backend

cd backend

node server.js

5.Run the Frontend

cd frontend

npm run dev

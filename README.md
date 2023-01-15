# Authentication-API


Authentication API

This API allows users to register and login to a system using their email and password. It also includes features such as password reset and account verification.

Endpoints

POST /register: Allows a user to register for the system using their email and password.
POST /login: Allows a user to login to the system using their email and password.
POST /reset: Allows a user to request a password reset using their email.
POST /changepassword: Allows a user to change their password using a reset token.

Requirements

Node.js 
MongoDB
Express.js
JSON Web Token (JWT)
bcryptjs
nodemailer

Installation

Clone the repository

git clone https://github.com/[username]/authentication-api.git


Usage

To use the API, make sure to set up a MongoDB database and provide the necessary configuration in the .env file.

Contributing
If you would like to contribute to the development of this API, please feel free to submit a pull request.

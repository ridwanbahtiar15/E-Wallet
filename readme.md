# E Wallet Back-End Express JS

<br>
<br>
<div align="center">
  <img src="https://res.cloudinary.com/doncmmfaa/image/upload/v1705848222/E-Wallet%20By%20FWG%2016/Frame_12_yzmexw.png" alt="Logo"  width="340" height="100"/>
</div>
<br>
<br>
Introducing a digital wallet that's not just about transactions but a seamless journey in the digital realm. It empowers users with features like peer-to-peer transfers, easy top-ups, and a comprehensive transaction history tracker. This project, a collaborative team effort, unfolded its magic over a dynamic week, following the agile SCRUM methodology. Fueled by defined requirements, our goal was clear, and the result is a digital wallet experience that goes beyond just handling money – it fosters a connection between users and their financial journey.

## Technologies used in this project

- [Express JS](https://pkg.go.dev/github.com/gin-gonic/gin#section-readme) \
  Express JS is a minimalist and flexible Node.js web application framework.

- [JSON Web Token](https://jwt.io/introduction) \
  JSON Web Token (JWT) is a compact, URL-safe means of representing claims between two parties.

- [Cloudinary](https://cloudinary.com/documentation) \
  Cloudinary is a cloud-based service for managing and optimizing media assets such as images and videos in web development.

- [Midtrans](https://docs.midtrans.com/) \
  Midtrans is a payment gateway service that simplifies online transactions.

- [PG](https://github.com/brianc/node-postgres) \
  Node-Postgres, commonly abbreviated as pg, is a Node.js driver for PostgreSQL databases.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in your root directory

```bash
  DB_HOST = "YOUR DB_HOST"
  DB_NAME = "YOUR DB_NAME"
  DB_USER = "YOUR DB_USER"
  DB_PASSWORD = "YOUR DB_PASSWORD"
  JWT_KEY = "YOUR JWT_KEY"
  ISSUER = "YOUR ISSUER"
  GOOGLE_CLIENT_ID = "YOUR GOOGLE_CLIENT_ID"
  GOOGLE_CLIENT_SECRET = "YOUR GOOGLE_CLIENT_SECRET"
  GOOGLE_REFRESH_TOKEN = "YOUR GOOGLE_REFRESH_TOKEN"
  CLOUDINARY_NAME = "YOUR CLOUDINARY_NAME"
  CLOUDINARY_KEY = "YOUR CLOUDINARY_KEY"
  CLOUDINARY_SECRET = "YOUR CLOUDINARY_SECRET"
  MAIL_SERVICES = "YOUR MAIL_SERVICES"
  MAIL_AUTH_TYPE = "YOUR MAIL_AUTH_TYPE"
  MAIL_USER = "YOUR MAIL_USER"
  MIDTRANS_ID_MERCHANT = "YOUR MIDTRANS_ID_MERCHANT"
  MIDTRANS_CLIENT_KEY = "YOUR MIDTRANS_CLIENT_KEY"
  MIDTRANS_SERVER_KEY = "YOUR MIDTRANS_SERVER_KEY"
```

## Run Locally

1. Clone the project

```bash
  $ git clone https://github.com/GilangRizaltin/E-Wallet-Frontend
```

2. Go to the project directory

```bash
  $ cd E-Wallet-Frontend
```

3. Install dependencies

```bash
  $ npm install
```

4. Start the server

```bash
  $ npm run dev
```

## API Reference

#### Authentication & Authorization

| Method | Endpoint           | Description                        |
| :----- | :----------------- | :--------------------------------- |
| `post` | `"/auth/register"` | register user                      |
| `post` | `"/auth/login"`    | get access and identity of user    |
| `post` | `"/auth/logout"`   | delete access and identity of user |

#### Users

| Method | Endpoint          | Description      |
| :----- | :---------------- | :--------------- |
| `get`  | `"/user/profile"` | Get profile user |

#### Order Transaction

| Method | Endpoint         | Description             |
| :----- | :--------------- | :---------------------- |
| `get`  | `"/transaction"` | Get transaction history |

## Documentation

[Postman Documentation](https://documenter.getpostman.com/view/29696636/2s9YXcekas#e12578b7-6960-4f71-a976-29d4280d568d)

## Related Project

[Front End (React JS)](https://github.com/GilangRizaltin/E-Wallet-Frontend)

## Collaborators

- [@Akbar Syarif](https://github.com/akbarsyarif)
- [@F Thema W](https://github.com/themawaras)
- [@Ridwan Bahtiar](https://github.com/ridwanbahtiar15)

## Support

For support, email gilangzaltin@gmail.com

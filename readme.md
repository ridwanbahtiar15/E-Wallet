# E Wallet Back-End Team Project with React JS

<div align="center">
  <img src="https://res.cloudinary.com/doncmmfaa/image/upload/v1705848222/E-Wallet%20By%20FWG%2016/Frame_12_yzmexw.png" alt="Logo" />
</div>

Introducing a digital wallet that's not just about transactions but a seamless journey in the digital realm. It empowers users with features like peer-to-peer transfers, easy top-ups, and a comprehensive transaction history tracker. This project, a collaborative team effort, unfolded its magic over a dynamic week, following the agile SCRUM methodology. Fueled by defined requirements, our goal was clear, and the result is a digital wallet experience that goes beyond just handling money – it fosters a connection between users and their financial journey.

## Technologies used in this project

- Express JS \
  Express JS is a minimalist and flexible Node.js web application framework. \
  [Express JS Documentation](https://pkg.go.dev/github.com/gin-gonic/gin#section-readme)

- JSON Web Token \
  JSON Web Token (JWT) is a compact, URL-safe means of representing claims between two parties. \
  [JSON Web Token Documentation](https://jwt.io/introduction)

- Cloudinary \
  Cloudinary is a cloud-based service for managing and optimizing media assets such as images and videos in web development. It simplifies tasks like image uploading, transformation, and delivery, offering a seamless solution for handling multimedia content in applications. \
  [Cloudinary Documentation](https://cloudinary.com/documentation)

- Cors \
  CORS is a security feature implemented in web browsers that controls how web pages in one domain can request and interact with resources from another domain. In web development, CORS is crucial for managing and securing cross-origin HTTP requests, ensuring proper communication between different domains. \
  [Cors Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

- Midtrans \
  Midtrans is a payment gateway service that simplifies online transactions. \
  [Midtrans Documentation](https://docs.midtrans.com/)

- PG \
  Node-Postgres, commonly abbreviated as pg, is a Node.js driver for PostgreSQL databases. \
  [PG Documentation](https://github.com/brianc/node-postgres)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

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

Clone the project

```bash
  $ git clone https://github.com/GilangRizaltin/E-Wallet-Frontend
```

Go to the project directory

```bash
  $ cd E-Wallet-Frontend
```

Install dependencies

```bash
  $ npm install
```

Start the server

```bash
  $ npm run dev
```

## API Reference

#### Authentication & Authorization

```http
  /auth
```

| Method | Endpoint      | Description                        |
| :----- | :------------ | :--------------------------------- |
| `post` | `"/register"` | register user                      |
| `post` | `"/login"`    | get access and identity of user    |
| `post` | `"/logout"`   | delete access and identity of user |

#### Users

```http
  /user
```

| Method | Endpoint     | Description      |
| :----- | :----------- | :--------------- |
| `get`  | `"/profile"` | Get profile user |

#### Order Transaction

```http
  /transaction
```

| Method | Endpoint | Description             |
| :----- | :------- | :---------------------- |
| `get`  | `"/"`    | Get transaction history |

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

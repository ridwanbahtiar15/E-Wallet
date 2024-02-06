# E-Wallet With Express JS

<p align="center">
        <img src="https://res.cloudinary.com/dhxdnljzm/image/upload/v1706291094/logo_w324ef.png" width="30px" alt="logo"></img>
        <img src="https://res.cloudinary.com/dhxdnljzm/image/upload/v1706291094/e-wallet_vovsln.png" width="100px" alt="logo"></img>
<p align="center">

This project is about to create a powerfull and most valuable financial website that can transfering amount of money between users.

## Built With

- [Node JS](https://nodejs.org)
- [Express JS](https://expressjs.com)
- [Postgre SQL](https://www.postgresql.org/)
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
- [Multer](https://www.npmjs.com/package/multer)
- [Cloudinary](https://www.npmjs.com/package/cloudinary)

## Configure app

Create file `.env` then edit it with your settings
according to your needs. You will need:

<pre>
<code>
DB_HOST = Your Database Host
DB_NAME = Your Database Host
DB_USER = Your Database User
DB_PASS = Your Database Password
JWT_KEY = Your JWT Key
ISSUER = Your Issuer
MAIL_SERVICE = Your Mail Service
MAIL_AUTH_TYPE = Your Auth Type
MAIL_USER Your = Email
GOOGLE_CLIENT_ID = Your Google Client Id
GOOGLE_CLIENT_SECRET = Your Google Client Secret
GOOGLE_REFRESH_TOKEN = Your Google Token
CLOUDINARY_NAME = Your Cloudinary Name
CLOUDINARY_KEY = Your Cloudinary Key
CLOUDINARY_SECRET = Your Cloudinary Secret
MIDTRANS_ID_MERCHANT = Your Midtrans ID Merchant
MIDTRANS_CLIENT_KEY = Your Midtrans Client Key
MIDTRANS_SERVER_KEY =  Your Midtrans Server Key
</code>
</pre>

## Install And Run Locally

1.  Clone project from github repository

        $ git clone https://github.com/ridwanbahtiar15/E-Wallet-Frontend

2.  go to folder coffee-shop

        $ cd E-Wallet-Frontend

3.  install dependencies

        $ npm install

4.  Start the server

        $ npm run dev

## Api Refrences

Auth
| Route | Method | Description |
| -------------- | ----------------------- | ------ |
| /auth/login | POST | Login user |
| /auth/register | POST | Register user |
| /auth/logout | POST | Logout user |

Users
| Route | Method | Description |
| -------------- | ----------------------- | ------ |
| /user/profile | POST | Get user profile |

Order Transaction
| Route | Method | Description |
| -------------- | ----------------------- | ------ |
| /transaction | POST | Get transaction history |

## Related Project

- [Front End With React JS](https://github.com/ridwanbahtiar15/E-Wallet-Frontend)

## Collaborator

- [Akbar Syarif](https://github.com/akbarsyarif)
- [Gilang Rizaltin](https://github.com/GilangRizaltin)
- [F Thema W](https://github.com/themawaras)

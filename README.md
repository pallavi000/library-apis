# Introduction

Library Management system build using React Js , Nest Js and MySql.
The system allows users to perform CRUD operations on Books,Genre, Author,Users,Member. User can borrow their favorite book and return before due date.
We have also implemented the features of authentication and authorization. Proper permissions and role must be provided to provided to access protected and sensitive api.

[![ReactJS](https://img.shields.io/badge/react.js-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
![NestJS](https://img.shields.io/badge/nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

## Table of contents
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
  

## Tech Stack
- React Js
- MUI
- Nest Js
- Typescript
- MySql


## Getting started
- Clone this project using `git clone ` command;
- Navigate inside frontend folder `cd frontend`
- Install the project dependencies with `npm install`;
- Run the project in dev mode with `npm run dev`.

- Navigate inside Backend folder `cd backend`
- Install the project dependencies with `npm install`;
- Create your `.env` from `.env.example` either manually or with `cp .env.example .env`
- Fill the `.env` file with your PORT, JWT_SECRET and JWT_EXPIRES_IN;
- Run the project in dev mode with `npm run start:dev`.
  

## Project structure

```
.
├── frontend ├── public
             ├── src  |── types
                      ├── api
                      ├── assets
                      ├── component
                      ├── constants
                      ├── context
                      ├── hooks
                      ├── pages
                      ├── routes
                      ├── theme
                      ├── utils

├── backend ├── config
            ├── types
            ├── config
            ├── database
            ├── exception
            ├── filters
            ├── guards
            ├── interceptors
            ├── middleware
            ├── models
            ├── utils
            ├── test
            └── utils
```

## swagger docs
- run the project locally.
- `http://localhost:5000/api/v1/docs#/`

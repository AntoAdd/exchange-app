# Exchange application

A web-based bartering platform that allows users to exchange items with each other through offers and counteroffers, featuring real-time notifications.

## Features

Specifically, a user can:
- `Add Items`:  upload the items that he wants to trade and that can be used in his offers or counteroffers.
- `Publish offers`: create new offers, each with one of the uploaded items, that become visible to all users in the application.
- `Publish counteroffers`: publish a counteroffer to an offer that he likes. Each counteroffer can contain one or more items.
- `Receive notifications`: receive real-time notifications when another user does something that affects his offers/counteroffers (e.g a user deletes an offer to which you published a counteroffer).
- `See trade history`: visualize the history of all trades made in the past. Each trade contains info about items and user involved in the trade.

## Technologies used

- `React` (frontend) - version: 18.3.1
- `Springboot` (backend) - version: 3.2.4
    - Main dependencies:
        - `spring-web`: a module of the Spring framework used to build RESTful web services.
        - `spring-data-jpa`: to manage the connection and communication with the database and reducing effort to implement the data persistance layer of the app.
        - `spring-security`: framework that provides authentications and authorization to Java applications.
        - `spring-websocket`: provide classes to configure message broker and other websocket functionalities.
- `PostgreSQL` (database) - version: 17
- `Bootstrap` (UI styling) - version: 5.3.3

## Installation and Run

**Prerequisites:**
- Docker Desktop installed

**Steps**:

1. Clone the repository: `git clone <repository url>`
2. Navigate to project: `cd exchange-app`
3. Build and run: `docker compose up --build`
4. Access the application at `http://localhost:3000`

**Updating after code changes:**
```bash
git pull
docker compose down
docker compose up --build
```
**Resetting the database:**

When modifications on the DB occur, to re initialize the DB (executing the `DBschema.sql` script again at the startup), execute the following:

```bash
docker compose down -v
docker compose up --build
```

## Usage

To use the application:

1. Register an account
2. Login with the user credentials
3. Add items that you want to exchange
4. Publish offers with the new added items or browse for published offers and make counteroffers to start trades.

## License

MIT License

Copyright (c) [2025] [Antonio Addesa]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
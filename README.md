# Frontend for Innoscripta test task
### How to start the app locally:
* Clone this repo `git clone https://github.com/PyagayElena/innoscripta-pizza`;
* Go to the app folder `cd innoscripta-pizza`;
* Install the dependencies for back-end `npm install`;
* Go to the client folder `cd client`;
* Install the dependencies for front-end `npm install`;
* Go back to the app folder `cd ..`;
* Run the app `npm run dev`.

The app starts at `http://localhost:3000/`. Open this link in browser and you will be able to test the app.

Note. When you register a new user please use your real e-mail. You will get notifications when you create an order.

### Functions
In this app you can:
* Register a new user.
* Login with your credentials.
* Close the page and open it again, your session and cart will be saved.
* Change user data: phone, address, preferred currency.
* Change currency in the cart. Also it will sync with user settings by default.
* Not to wait every time when the products are loaded from the server. After the first time loaded they store locally.
* See previous detailed orders.

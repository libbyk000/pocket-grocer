# pocket-grocer

### Project Description
Pocket Grocer is a web application that empowers individuals, as well as those living in communal living spaces, to keep track of grocery items and respective expiration dates in order to minimize their food waste. The 3 main operational use cases with which this application aims to help users are:
1. Keeping track of their groceries in both the fridge and pantry
2. Creating household "groups" in which they can add other users, and see and share the items in that household
3. Filtering and sorting the items in their grocery inventory

### Team members
1. Fadel - Frontend developer
2. Libby - Frontend developer
3. Myka - Backend developer + Product Manager + User Testing
4. Sophia - Backend developer + Product Manager + User Testing
5. Shaurya - General developer
6. Tushar - General developer

### How to build/run and test system
Ensure that before you do any of these steps, run the following in the root directory of the pocket-grocer repo:
```
npm install
```
#### Build/run:
To build the system manually, navigate to the root directory of the pocket-grocer repo and run:
```
npm start
```
Now visit localhost:8000 in your browser of choice, and you should see the front end of the Pocket Grocer website
#### Test:
GitHub Actions automates this process upon every push to master, however, if one chooses to do so locally test via CLI navigate to the root directory of the pocket-grocer repo and run:
```
npm install cypress --save-dev
```
Then, 
```
node_modules/.bin/cypress open
```
This should open a Cypress in a new window - you will see a list of all integration tests. 
Click "Run [some number] integration specs" and this will run all Cypress tests.

### Want to help make Pocket Grocer better?
Thanks for your interest! Check out our [developer guidelines](DEVELOPERGUIDELINES.md).
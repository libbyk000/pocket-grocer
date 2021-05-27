# USER MANUAL

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

### Obtaining the Source Code
Clone this repo (the frontend repo). This method assumes you have already set up an SSH key on your machine linked to your GitHub account. If you have not yet done that, here is [GitHub's instructions for connecting to GitHub with SSH](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)

Open your terminal and run the following command:
```
git clone git@github.com:libbyk000/pocket-grocer.git
```
NOTE: You will need to clone the backend repo as well. However, please note that the following instructions are for the front end. Instructions for how to run the backend are located [here](https://github.com/shaurya2109/pg-backend/blob/master/UserDocumentation.md).
```
git clone git@github.com:shaurya2109/pg-backend.git
```

### Installing software
Npm is short for Node Package Manager. Ensure that before you do any of the following steps, [download Node here](hhttps://nodejs.org/en/download/).

Then, again open your terminal, navigate to the root directory of pocket-grocer repo and run the following commands (in this order):
```
npm install
```
```
npm install cypress --save-dev
```

### How to build/run
To build/run the system, navigate to the root directory of the pocket-grocer repo in your terminal and run:
```
npm start
```
Now visit localhost:8000 in your browser of choice, and you should see the front end of the Pocket Grocer website and can begin interacting!

PLEASE NOTE THAT IN ORDER FOR THE SYSTEM TO WORK, YOU NEED TO ALSO RUN THE BACKEND LOCALLY. PLEASE SEE THEIR [USER DOCUMENTATION](https://github.com/shaurya2109/pg-backend/blob/master/UserDocumentation.md) FOR INSTRUCTIONS.
### How to use the system
1. Create an account on our sign up page.
2. Log in with your created credentials.
3. Add a new item to your inventory by selecting the "+" in the bottom nav bar.
4. Enter the information of your recent groceries.
5. Repeat steps 3 and 4 for as many of your items as you want.
6. View item information by tapping/clicking their names - you can toggle them from being shared to personal in this view.
7. Sort/filter using the top button.
8. Toggle between seeing the number of days until an item expires and an emoji (red for expired, yellow for almost expired, green for not expiring soon).
9. Edit who is in your household by selecting the person icon in the bottom nav bar.
10. Create a new group, add yourself to an existing group, or delete your account from here.

### Bug Reporting
We will use [GitHub Issues](https://github.com/libbyk000/pocket-grocer/issues) to keep track of bugs. Navigate to this page and add "new issue" in the event of a new issue.
1. Write a ~10 word description of the bug to be the title. A good summary should quickly and uniquely identify a bug report. It should explain the problem, not the suggested solution.
2. Write a detailed, ordered list of steps to reproduce the issue.
3. After your steps, precisely describe the observed (actual) result and the expected result. Clearly separate facts (observations) from speculations.

See [Mozilla bug report writing guidelines](https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines) for more information.

### Known Bugs
See [GitHub Issues](https://github.com/libbyk000/pocket-grocer/issues).

### Want to help make Pocket Grocer better?
Thanks for your interest! Check out our [developer guidelines](DEVELOPERGUIDELINES.md).
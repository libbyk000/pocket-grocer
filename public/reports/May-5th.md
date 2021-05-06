May 5th Status Report

Navigate to ‘Weekly Status Reports’ on this page for detailed instructions:
https://homes.cs.washington.edu/~rjust/courses/2021Spring/CSE403/project.html 

## **Team report**

### **Goals from the previous week**  

#### **Backend**
- Continue working on REST APi
- API endpoints, Create User, Delete User, Login
- Create dummy tables in the database for testing

#### **Frontend**
- Error messaging
- Make the legend for the items page (expiration)
- Add delete account button to account page
- Peer code review of backend, testing on mobile/desktop
 
### **Progress and Issues**

  #### **Backend**


  #### **Frontend**
Decided we won’t have a legend
Added delete account button and confirmation
Implemented sorting and filtering (JS)
ItemView page on click from Items page
Restructured HTML for easier JS access - mostly items page and account page
Expiration dates show on button click for Items page
Added quantity and “have you bought this recently” to addItem page
Error display infrastructure set up for forms and required forms
Made 404 page
Transitioned Static Web App to be a Node.js App
Set up CI/CD and testing with Cypress

### **Goals for the following week**

  #### **Backend**
Finalized the Users table and Inventory table
Got rid of a few attributes in the Inventory table (quantity and groupname)
Wrote API endpoints for checking if a user exists, adding a user account, deleting a user account, logging in user, checking if a user is already in a group, checking if a groupname already exists (since they are unique), removing a user from a group, adding a user to a group, creating a group
Implemented all of the methods in Query.java to then run the sql commands to perform the actions required by the endpoints stated above.
Started writing some unit tests in TestQuery.java
Worked on setting up CI build

  #### **Frontend**
Enable toggling of sharing attribute on Item
Write and set up an automated testing infrastructure
Implement static delete account capabilities on account page
Change form parameters to match post request requirements
 
## May 6th Project Meeting Agenda
Go over progress
Look at the Beta Assignment due next tuesday

## **_Contributions of individual team members_**

### **Last week’s plan**
  - Libby: Create error dialogs, and finalize modals. Continue usability testing on desktop/mobile.
  - Fadel: Connect forms to backend through post requests.
  - Sophia:   Add more tables to the database solely for testing purposes, add methods in Query.java responsible for Adding user, deleting user, and logging in.
  - Myka: Work on adding methods to Query.java and help with anything the backend needs.  
 - Tushar: Finish writing all the prepared statements that will be used to query data from the database. Apart from this we will also start researching on how to host the API so that the frontend team can call them and fetch the data. 
  - Shuarya: Finish implementing the endpoints of the API in the Server.java file
 
### **Progress** 
- Libby: Implemented confirmation modals for front end, quantity parameter for addItem page, looking into setting up automated testing with Mocha, created 404 page, worked on creating the CI/CD, implement static delete account capabilities on account page
- Fadel: Implemented sorting and filtering, itemView click from items page, expiration dates shown on click from items page, added “have you bought this recently” toggle, error display, worked on creating the CI/CD
- Sophia: Wrote the SQL prepared statements in Query.java as well as the methods/checks ti see if a user exists (userExists()), add a user profile (addUser), delete a user’s profile, check if a user’s login input is valid, checking if a groupname already exists, checking if a user is already a member in a group, updating a groupname for a user (this is to add a user to a group as well as remove a user from a group). Finalized the Inventory and Users table information and worked with frontend to clarify functionality. Met with Shaurya and Tushar to test Query.java and SQL database functionality via postman. Filled out the APi endpoint spreadsheet with Shaurya.
- Myka: Worked on weekly report and met with the back end team to assist troubleshooting errors
- Shaurya:
- Tushar: 
 
### **Next week’s plan**
- Libby: Help with JS stuff when Fadel asks
- Fadel: Enable toggling of sharing attribute on Item, change form parameters to match post request requirements, show and hide the confirmation modal for account page
- Sophia: Add any more endpoints that we need in Query.java, help write Unit tests in TestQuery.java, help debug any issues that arise for the backend 
- Myka: Meet with Tushar to go over testing info and make a plan
- Shaurya:
- Tushar: 
 

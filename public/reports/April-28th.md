## **Team report**

### **Goals from the previous week**

#### **Backend**

- Continue to finalize all of the tables we will need
- Continue finalizing the API endpoints
- Be able to edit our tables in our database (add people, edit grocery items, mark item as shared)
- Implement API endpoints: Create Account, Delete Account, Create Group, Add Member to group

#### **Frontend**

- Finish add items page
- Implement item page
- Add select options for filter and sort to all items page (make flex)
- Start looking into front end testing
- Add error messaging
- Create custom.js (module pattern) and hook up to all pages

### **Progress and Issues**

#### **Backend**

- Decided on using Spark instead of spring for the REST Api, and JDBC to connect to the Azure SQL database
- Compiled all of the files we would need to support spark and JDBC and tried adding those directly to Github but ran into lots of errors so we started with a clean IntelliJ project, added our files, and then pushed that to the repo
- Decided to have two main files, Server.java which runs the REST Api, and then Query.java which runs all of the prepared statements to query data to and from the database
- Ran into some issues when trying to create an IntelliJ project with all of our files, but it was fixed by Shaurya
- Successfully connected to the database through JDBC and added a dummy table when running our main method in Query.java

  #### **Frontend**

- Finished the following pages: add items page, item page, sort/filter modal
- Implemented add user to household modal and ability to delete member from household
- Changed icons of expired/almost expired, not expired
- Toggle added to item view to change from shared to not shared
- Added ability to delete item
- Added JS template

### **Goals for the following week**

#### **Backend**

- Continue working on REST APi
- API endpoints, Create User, Delete User, Login
- Create dummy tables in the database for testing

  #### **Frontend**

- Error messaging
- Make the legend for the items page (expiration)
- Add delete account button to account page
- Peer code review of backend, testing on mobile/desktop

## April 29th Project Meeting Agenda

- Go over progress

## **_Contributions of individual team members_**

### **Last week’s plan**

- Libby: Finish add items page, implement item page
- Fadel: Add select options for filter and sort to all items page (make flex), start looking into testing, add error messaging, create custom.js (module pattern) and hook up to all pages
- Sophia: Finalize the list of tables, help implement the next APi endpoints (Create Account, Delete Account, Create Group, Add Member to group)
- Myka: Finalize list of tables, help implement API endpoints
- Shaurya: Set up the API architecture using Java and Spring Boot to begin sending and receiving HTTP requests. Deploy an under development test version of the API.
- Tushar: Set up the Azure SQL database and incorporate the JDBC API in the API architecture to interact with the database.

### **Progress**

- Libby: Worked with Fadel to modify HTML to support easy access in JavaScript.
- Fadel: Setup skeleton scripts to submit forms, and simple to-do list type manipulation of the item view.
- Sophia: Helped set up the IntelliJ project and work through some issues that occurred when trying to connect to the server. Added some tables to the Database. Organized the completion of the Architecture assignment
- Myka: Helped set up the IntelliJ project and work through some issues that occurred when trying to connect to the server. Set up the weekly report and worked with Sophia to create the first couple tables.
- Tushar: Helped in connecting the azure SQL database with the project. Also setup prepared statements that will be used to query data from the database.
- Shuarya: Set up the IntelliJ project and created the Server files. Set up the dependencies for the project and wrote a coding outline.

### **Next week’s plan**

- Libby: Create error dialogs, and finalize modals. Continue usability testing on desktop/mobile.
- Fadel: Connect forms to backend through post requests.
- Sophia: Add more tables to the database solely for testing purposes, add methods in Query.java responsible for Adding user, deleting user, and logging in.
- Myka: Work on adding methods to Query.java and help with anything the backend needs.
- Tushar: Finish writing all the prepared statements that will be used to query data from the database. Apart from this we will also start researching on how to host the API so that the frontend team can call them and fetch the data.
- Shuarya: Finish implementing the endpoints of the API in the Server.java file

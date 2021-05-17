May 12th Status Report

Navigate to ‘Weekly Status Reports’ on this page for detailed instructions:
https://homes.cs.washington.edu/~rjust/courses/2021Spring/CSE403/project.html 

## **Team report**

### **Goals from the previous week**  

  #### **Backend**
Finalized the Users table and Inventory table
Got rid of a few attributes in the Inventory table (quantity and groupname)
Wrote API endpoints for checking if a user exists, adding a user account, deleting a user account, logging in user, checking if a user is already in a group, checking if a group name already exists (since they are unique), removing a user from a group, adding a user to a group, creating a group
Implemented all of the methods in Query.java to then run the sql commands to perform the actions required by the endpoints stated above.
Started writing some unit tests in TestQuery.java
Worked on setting up CI build

  #### **Frontend**
 Enable toggling of sharing attribute on Item
Write and set up an automated testing infrastructure
Implement static delete account capabilities on account page
Change form parameters to match post request requirements

### **Progress and Issues**

  #### **Backend**
Fixed the CI deployment issue, switched to Azure instead of Heroku
Added unit tests
Implemented more use cases (adding an inventory item, retrieving all items for a user, deleting an item, changing a shared value for an item)
Updated documentation to reflect current changes
Added to the repo README to instruct someone how to properly build and test the backend

  #### **Frontend**
Fadel implemented all of the JS for the whole website
 Enable toggling of sharing attribute on Item
Change form parameters to match post request requirements
Set up an automated testing infrastructure
Implement static delete account capabilities on account page


### **Goals for the following week**

  #### **Backend**
Implement the password hashing
Implement user cookies to show when a user is logged on
Incorporate a list of recently purchased items for the drop down
Create a new test file that uses separate tables than what is used for our user data

  #### **Frontend**
Fix quantity for addItem
Write testing code
Finish the account page to display housemate/groupmates dynamically (connected to backend)
 
### May 13th Project Meeting Agenda
Go over progress
Divide up work for the Implementation & Documentation assignment 
 
## **_Contributions of individual team members_**

### **Last week’s plan**

Libby: Help with JS stuff when Fadel asks
Fadel: Enable toggling of sharing attribute on Item, change form parameters to match post request requirements, show and hide the confirmation modal for account page
Sophia: Add any more endpoints that we need in Query.java, help write Unit tests in TestQuery.java, help debug any issues that arise for the backend 
Myka: Meet with Tushar to go over testing info and make a plan
Shaurya:
Tushar: 
 
### **Progress** 

  - Libby: Helped Fadel, set up an automated testing infrastructure, implement static delete account capabilities on account page
  - Fadel: Implemented all of the JS for the whole front end (including the specific goals of enabling toggling of sharing attribute on Item, change form parameters to match post request requirements) set up an automated testing infrastructure
  - Sophia:   Added Server.java endpoints to add an inventory item, retrieve items, change the shared value on an item, and deleting an item. Worked with Fadel to fix issues on the backend like changing the response codes to be unique, changing the expected format for the json parameters, debug some issues, edit the APi doc to reflect all of our changes, and make sure everything was running smoothly for the demo. Filled out and presented the Architecture and Design section of the presentation for the Beta Assignment.
  - Myka: Worked with Tushar to start testing the backend, added testing methods to TestQuery.java, worked on and presented the Process and Timeline section of the presentation and edited together each group members part to create the final presentation. Helped coordinate and organize this week's assignment. 
  - Tushar:   
  - Shuarya:  
 
### **Next week’s plan**

  - Libby:  Write testing code
  - Fadel:   Fix quantity for addItem, finish the account page to display housemate/groupmates dynamically (connected to backend)
  - Sophia:   Implement hashing of passwords, help out with documentation assignment 
  - Myka: Continue writing testing code
  - Tushar:   
  - Shuarya:  



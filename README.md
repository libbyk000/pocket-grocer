# pocket-grocer

### Project Description
Pocket Grocer is a web application that empowers individuals, as well as those living in communal living spaces, to keep track of grocery items and respective expiration dates in order to minimize their food waste. The 4 main tasks with which this application aims to help users are:
1. Keeping track of their inventory in both the fridge and pantry
2. Creating household groups in which people can add other users, and see and share the items in that household
3. Filtering and sorting the items in their inventory
4. Viewing commonly purchased grocery items for themselves and for the household

### Team members
1. Fadel - Frontend developer
2. Libby - Frontend developer
3. Myka - Backend developer + Product Manager + User Testing
4. Sophia - Backend developer + Product Manager + User Testing
5. Shaurya - General developer
6. Tushar - General developer

### How to build and test system
GitHub Actions automates this process upon every push to master, however, if one chooses to do so locally:

To test via CLI navigate to the root directory of the pocket-grocer repo and run
```
npm install cypress --save-dev
```
Then, 
```
node_module/.bin/cypress open
```


### Repository Layout
* .github
    * main_pocket-grocer-403.yml - build and deploy
    * main.yml - runs cypress testing scripts
* public
    * main html files for all pages
    * assets
        * css
            * stylesheets
        * js
            * scripts
        * sass
            * compiled css from original template (we don't edit this folder)
        * webfonts
            * font awesome fonts
    * images
        * contains background images and icons
    * reports
        * weekly reports
## Before getting started

Thank you so much for your interest in contributing to Pocket Grocer! We appreciate you.

# How to contribute

## Obtaining source code
The PocketGrocer web app uses multiple repositories. This is the repository containing all of the front end code, and [this repository](https://github.com/shaurya2109/pg-backend) contains all of the back end code.

Please clone both repositories before getting started.

## Directory structure
* .github/workflows
    * main_pocket-grocer-403.yml - build and deploy script
    * main.yml - cypress testing script
* cypress/integration
    *  cypress testing files (add tests here)
* public
    * main html files for all pages (add new HTML here)
    * assets
        * css
            * stylesheets (add new CSS here)
        * js
            * javascript files (add new JS here)
        * sass
            * compiled css from original template (we don't edit this folder)
        * webfonts
            * font awesome fonts
    * images
        * contains background images and icons
    * reports
        * weekly reports

## Build process
Provide clear instructions for how to use your project’s build system to build all system components.


## Test process
How to test the software. Provide clear instructions for how to run the system’s test cases. In some cases, the instructions may need to include information such as how to access data sources or how to interact with external systems. You may reference the user documentation (e.g., prerequisites) to avoid duplication.

## Adding new tests
How to add new tests. Are there any naming conventions/patterns to follow when naming test files? Is there a particular test harness to use?

## Build/Release
How to build a release of the software. Describe any tasks that are not automated. For example, should a developer update a version number (in code and documentation) prior to invoking the build system? Are there any sanity checks a developer should perform after building a release?

## Coding conventions

In order to sanitize coding standards, please follow [this HTML style guide](https://courses.cs.washington.edu/courses/cse154/codequalityguide/html/), [this CSS style guide](https://courses.cs.washington.edu/courses/cse154/codequalityguide/css/), and [this JavaScript style guide](https://courses.cs.washington.edu/courses/cse154/codequalityguide/javascript/).






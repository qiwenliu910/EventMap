# EventMap

This is a project for CSC309.

It is a website for public safety under the recent global pandemic and protests.

It supports users to sign up and post dangerous events on a map to alert other users of dangers that have occurred in the area.

It is constructed by ReactJS, google Map API, ExpressJS for client server interaction, MongoDB as database.

## Installation and testing
In the project directory "csc309teamproject", you can run:
### `npm install`
To download packages required to run this web app
<br /><br />
### `npm start`
To start the web app

## Testing credentials
| UserEmail       | Password |
|-----------------|----------|
| admin@admin.com | admin    |
| user@user.com   | user     |
| user2@user2.com | user2    |
| user3@user3.com | user3    |

## General changes since phase 1
Essentially out web app is now powered by a real backend with a database. We added the view for creating events in this release along with many undisclosed page content details that were not in Phase 1. 
Based on the feedback of our Phase 1, we unified the UI theme across our website to ensure consistensy and at the same time kept our creative customization on top of the bland Bootstrap library.<br>

Demo Site: https://whispering-thicket-29549.herokuapp.com/

## Recommended testing procedures
This section explains a recommended route to go through all sections of our web app.
### Default HomeView
This is the view you see after starting the web app.<br />
Anonymous guests are able to view events by clicking markers on the map. They can view the details of the event on the right side panel but are not able to casting vote on the event. <br />
You can select a filter on the menu's filter dropdown to only see a specific type of events.

### SignUpView
You can navigate to sign up view by clicking the button labeled "Sign up" on the top right corner of the menu.<br />
On this view, we recommend you to first click "create account" button to test our frontend field validation and fill in the fields one be one. Once all the fields are filled and are validated, upon submission, this view will contact the backend and create the account.


### SignInView
You can navigate to forgot password view by clicking "Sign in" on the top right corner of the menu.<br/>
We recommend you to use the admin account credentials provided above to test the following view's features as it covers everything that a normal user can access in addition to admin portal features. 
<br />
After signing in, you will be redirect to the home page and if you click any of the events now, you should be able to acces the voting feature. The top right corner of the menu should now be replaced by a user info section with a dropdown. This is a customized component we designed on top of the bootstrap framework. It looks much better than the original bootstrap dropdown.

### AccountInfoView
You can navigate to this view by clicking the user info dropdown on the top right corner of the menu and select "Account Info". (Note: you can only see the dropdown if you are logged in) <br />
This page shows basic information of the user with the user's avatar and activities. We highly value users privacy on our website and as a result, there is no too detailed user information revealed on this page.

### MyEventsView
You can navigate to this view by clicking the user info dropdown on the top right corner of the menu and select "My Events". (Note: you can only see the dropdown if you are logged in) <br />
This page should display a list of events and their details. With the buttons on the right of each entry, you can check the detail of a specific event that you posted by clicking the details button. Or modify or delete the event.

### CreateAnEventView
You can navigate to this view by clicking the user info dropdown on the top right corner of the menu and select "Create An Event". (Note: you can only see the dropdown if you are logged in) <br />
This is an interface for a user to create a new event on the map. You can select the marker location by putting in the address. It will automatically populate a list with its guesses of the address based on what you have typed in and fill in the coordinates for you.

### ProfileSettingsView
You can navigate to this view by clicking the user info dropdown on the top right corner of the menu and select "Profile Settings". (Note: you can only see the dropdown if you are logged in) <br />
A user can modify the user's display name, password and status of the account in this view. It has several sections and you can navigate through them by clicking the menu items on the left. 

### AdminPortal
You can navigate to this view by clicking the user info dropdown on the top right corner of the menu and select "Admin Portal". (Note: you can only see the dropdown if you are logged in as an **admin** user) <br />
You can nagvigate to user and event management by clicking the menu on the left. You can edit user details and event details.

### QuickViewView
You can navigate to this view by clicking the "Quick View" button on the menu. This will show a list of events on the map. if offers an alternative view to see general details of the events. 

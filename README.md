# team24

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

## Recommended testing procedures
This section explains a recommended route to go through all sections of our web app.
### Default HomeView
This is the view you see after starting the web app.<br />
Anonymous guests are able to view events by clicking markers on the map. They can view the details of the event on the right side panel but are not able to casting vote on the event. <br />
You can select a filter on the menu's filter dropdown to only see a specific type of events.

### SignUpView
You can navigate to sign up view by clicking the button labeled "Sign up" on the top right corner of the menu.<br />
On this view, we recommend you to first click "create account" button to test our frontend field validation and fill in the fields one be one. Once all the fields are filled and are validated, upon submission, this view will contact the backend and create the account. In phase 1, this will return a function not implemented error.


### ForgotPasswordView
You can navigate to forgot password view by clicking "Sign in" on the top right corner of the menu and click "Forgot password" under the password field. <br />
This view does not have much content to test in phase 1. But the source code covers certain conditions that will happen when the request is valid.

### SignInView
You can navigate to forgot password view by clicking "Sign in" on the top right corner of the menu.<br/>
We recommend you to use the admin account credentials provided above to test the following view's features as it covers everything that a normal user can access in addition to admin portal features. 
<br />
After signing in, you will be redirect to the home page and if you click any of the events now, you should be able to acces the voting feature. The top right corner of the menu should now be replaced by a user info section with a dropdown. **This is a customized component we designed on top of the bootstrap framework. It looks much better than the original bootstrap dropdown**.

### AccountInfoView
You can navigate to this view by clicking the user info dropdown on the top right corner of the menu and select "Account Info". (Note: you can only see the dropdown if you are logged in) <br />
This page shows basic information of the user with the user's avatar and activities. We highly value users privacy on our website and as a result, there is no too detailed user information revealed on this page.

### MyEventsView
You can navigate to this view by clicking the user info dropdown on the top right corner of the menu and select "My Events". (Note: you can only see the dropdown if you are logged in) <br />
This page should display a list of events and their details.**This is a customized user friendly page with little dependency on bootstrap's system.**

### CreateAnEventView
You can navigate to this view by clicking the user info dropdown on the top right corner of the menu and select "Create An Event". (Note: you can only see the dropdown if you are logged in) <br />
This is an interface for a user to create a new event on the map. You can select the marker location by putting in the address. It will automatically populate a list with its guesses of the address based on what you have typed in and fill in the coordinates for you. In the future, we will look into supporting dropping markers on a live map. Due to the complexity of the google map component, this is not included in Phase 1.

### ProfileSettingsView
You can navigate to this view by clicking the user info dropdown on the top right corner of the menu and select "Profile Settings". (Note: you can only see the dropdown if you are logged in) <br />
A user can modify the user's display name, avatar and other details of the account in this view. It has several sections and you can navigate through them by clicking the menu items on the left. **This is a customized user friendly page with a facny view and little dependency on bootstrap's system.**

### AdminPortal
You can navigate to this view by clicking the user info dropdown on the top right corner of the menu and select "Admin Portal". (Note: you can only see the dropdown if you are logged in as an **admin** user) <br />
The default page of this view is a dashboard, this is the page we designed to show analytical data in as future improvements. <br />
You can nagvigate to user and event management by clicking the menu on the left. For our paging component testing, we will only show up to 3 items on the table at a time, this is configurable in future phases. You can edit user details and event details in phase 1 as we have created the views for them.

### QuickViewView
You can navigate to this view by clicking the "Quick View" button on the menu. This will show a list of events on the map. if offers an alternative view to see general details of the events. **This is a customized user friendly page with a facny view and little dependency on bootstrap's system.**



## Requests to external servers
All components that requires exchanging data with a potential external server are decoupled with the interfaces defined in "DummyBackend.js". For example, if a page requires to retrieve a list of event data from the server or to tell the server to update certain data will call functions defined in this fake backend. In phase 1, this backend will serve immutable hard coded data. All parts involves data update will fail and return a function not implemented error and an error message in the debugging console.

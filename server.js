/* server.js for react-express-authentication */
"use strict";

const log = console.log;

const express = require("express");
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { Event } = require("./models/event");
const { User } = require("./models/user");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));


// Helper functions
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

//DB place holders for testing
const eventData = {
  eventList: [
    {
      CRIME_ID: 1,
      TITLE: "Rabbit is killed",
      ADDRESS: "123 UofT St",
      AUTHOR: "user",
      DATE: "2020/01/18",
      TYPE: 3,
      VOTE: 10,
      SEVERITY: 0,
      DESCRIPTION: "A student's rabbit was killed.",
      coordinates: [
        -79.3957,
        43.662
      ]
    },
    {
      CRIME_ID: 2,
      TITLE: "Laptop stolen",
      ADDRESS: "321 MP St",
      AUTHOR: "user2",
      DATE: "2020/01/31",
      TYPE: 1,
      VOTE: 60,
      SEVERITY: 1,
      DESCRIPTION: "A student's laptop was stolen.",
      coordinates: [
        -79.3959,
        43.665
      ]
    },
    {
        CRIME_ID: 3,
        TITLE: "COVID-19 case",
        ADDRESS: "123 Bahen St",
        ARTHOR: "user",
        DATE: "2020/01/20",
        TYPE: 0,
        VOTE: 200,
        SEVERITY: 2,
        DESCRIPTION: "A new COVID-19 case is discovered.",
        coordinates: [
          -79.396,
          43.67
        ]
      },
    {
        CRIME_ID: 4,
        TITLE: "A fire in the building",
        ADDRESS: "321 SS Dr",
        ARTHOR: "user3",
        DATE: "2018/01/21",
        TYPE: 2,
        VOTE: 300,
        SEVERITY: 3,
        DESCRIPTION: "A student burned themselves.",
        coordinates: [
          -79.391,
          43.669
        ]
      },
    {
        CRIME_ID: 5,
        TITLE: "Fire at Queen's Park Subway Station",
        ADDRESS: "Intersetion of College St and University Ave",
        ARTHOR: "user",
        DATE: "2020/04/05",
        TYPE: 2,
        VOTE: 210,
        SEVERITY: 2,
        DESCRIPTION: "A fire started in the subway station at Queen's Park. The cause is unknown.",
        coordinates: [
          -79.3903,
          43.6599
        ]
      },
    {
        CRIME_ID: 6,
        TITLE: "COVID-19 case in store",
        ADDRESS: "220 Yonge St",
        ARTHOR: "user3",
        DATE: "2020/03/19",
        TYPE: 0,
        VOTE: 70,
        SEVERITY: 1,
        DESCRIPTION: "COVID-19 case comfirmed at the Eaton Center.",
        coordinates: [
          -79.3807,
          43.6544
        ]
      },
    {
        CRIME_ID: 7,
        TITLE: "Fire started at the Cube",
        ADDRESS: "40 St George St",
        ARTHOR: "user2",
        DATE: "2019/10/13",
        TYPE: 2,
        VOTE: 100,
        SEVERITY: 1,
        DESCRIPTION: "At the Bahen Centre for Information Technology, the cafe named The Cube had a fire. No one was injured.",
        coordinates: [
          -79.3977,
          43.6596
        ]
      },
    {
        CRIME_ID: 8,
        TITLE: "Student was attacked",
        ADDRESS: "130 St George St",
        ARTHOR: "user",
        DATE: "2020/02/10",
        TYPE: 3,
        VOTE: 350,
        SEVERITY: 3,
        DESCRIPTION: "A student was attacked and a bucket of fecal matter was dumped on them in Robarts Library.",
        coordinates: [
          -79.3997,
          43.6645
        ]
      },
    {
        CRIME_ID: 9,
        TITLE: "A backpack was stolen",
        ADDRESS: "255 Huron St",
        ARTHOR: "user2",
        DATE: "2019/11/23",
        TYPE: 1,
        VOTE: 70,
        SEVERITY: 1,
        DESCRIPTION: "A student's backpack was stolen in the McLennan building.",
        coordinates: [
          -79.3984,
          43.6609
        ]
      },
    {
        CRIME_ID: 10,
        TITLE: "COVID-19 case at Sidney",
        ADDRESS: "100 St George St",
        ARTHOR: "user3",
        DATE: "2020/02/02",
        TYPE: 0,
        VOTE: 400,
        SEVERITY: 3,
        DESCRIPTION: "A student was found to have COVID-19 at Sidney Smith Hall.",
        coordinates: [
          -79.3985,
          43.6625
        ]
      }
    ]
}
const userData = {
  usersList: [
    {
      id: 1,
      email: "user@user.com",
      username: "user",
      displayName: "fox",
      password: "user",
      admin: false,
      events:[1,3,5,8],
      upvote: [],
      downvote: []
    },
    {
      id: 2,
      email: "user2@user2.com",
      username: "user2",
      displayName: "bunny",
      password: "user2",
      admin: false,
      events:[2,7,9],
      upvote: [],
      downvote: []
    },
    {
      id: 3,
      email: "user3@user3.com",
      username: "user3",
      displayName: "bear",
      password: "user3",
      admin: false,
      events:[4,6,10],
      upvote: [],
      downvote: []
    },
    {
      id: 4,
      email: "admin@admin.com",
      username: "admin",
      displayName: "raccoon",
      password: "admin",
      admin: true,
      events:[],
      upvote: [],
      downvote: []
    }
  ]
}

const API_VERSION = "v1";

app.post(`/api/${API_VERSION}/login`, (req, res) => {
  const data = userData
  for(let i = 0; i < data.usersList.length; i++){
    if (req.body.user === data.usersList[i].email && req.body.password === data.usersList[i].password){
      res.json({
          result: true,
          token: "random_123456789",
          user: data.usersList[i]
      });
      return;
    }
  }
  res.json({
    result: false
  });
});


app.get(`/api/${API_VERSION}/events/:id`, (req, res) => {
  const eventId = req.params.id
  const data = eventData
  for (let i = 0; i < data.eventList.length; i++) {
    if (parseInt(data.eventList[i].CRIME_ID) === parseInt(eventId)) {
        res.json({
          result: true,
          token: "random_123456789",
          event: data.eventList[i]
        });
        return;
    }
  }
  res.json({
    result: false,
    token: "random_123456789",
    event: null
  });
});
app.get(`/api/${API_VERSION}/events`, (req, res) => {
  const eventId = req.params.id
  const data = eventData
  let events = [];
  if (req.body.skip >= 0 && req.body.take >= 0) {
    events = data.eventList.slice(req.body.skip, req.body.skip + req.body.take);
  }
  else {
    events = data.eventList;
  }
  res.json({
    events: events,
    totalEntries: events.length
  });
});

app.get(`/api/${API_VERSION}/users/:id`, (req, res) => {
  const eventId = req.params.id
  const data = userData
  for (let i = 0; i < data.usersList.length; i++) {
    if (parseInt(data.usersList[i].id) === parseInt(eventId)) {
        res.json({
          result: true,
          token: "random_123456789",
          user: data.usersList[i]
        });
        return;
    }
  }
  res.json({
    result: false,
    token: "random_123456789",
    event: null
  });
});

app.get(`/api/${API_VERSION}/users`, (req, res) => {
  const eventId = req.params.id
  const data = userData
  let users = [];
  if (req.body.skip >= 0 && req.body.take >= 0) {
    users = data.usersList.slice(req.body.skip, req.body.skip + req.body.take);
  }
  else {
    users = data.usersList;
  }
  res.json({users: users});
});

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/csc309teamproject/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/login", "/dashboard"];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(__dirname + "/csc309teamproject/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});

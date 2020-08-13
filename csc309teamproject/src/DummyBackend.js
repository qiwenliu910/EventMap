import * as dataEvents from "./data/crimeData.json"
import * as userData from "./data/userData.json"


function DummyBackend(app) {
  this.app = app;
  this.data = {
    events: dataEvents.crimeList,
    users: userData.users
  };
}


DummyBackend.prototype = {
  API_VERSION: 'v1',
  log: function (msg) {
    console.log(msg);
  },
  api: function (method) {
    return `/api/${this.API_VERSION}/${method}`;
  },
  get: function (method) {
    return fetch(this.api(method),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          this.log(`API Error "${method}"(${res.status})`);
          return res.json();
        }
      });
  },
  post: function (method, body) {
    return fetch(this.api(method),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          this.log(`API Error "${method}"(${res.status})`);
          return res.json();
        }
      });
  },
  readCookie: function () {
    this.get("check-session")
    .then(json => {
        if (json.result === true && json.currentUser) {
            this.app.setState({ currentUser: json.currentUser });
        }
    })
    .catch(error => {
        console.log(error);
    });
  },
  logout: function () {

    return new Promise((resolve) => {
      fetch(`/api/${this.API_VERSION}/logout`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.status === 200) {
          this.app.setState({ currentUser: { _id: -1, displayName: "" } });
          resolve();
        } else {
          resolve();
        }
      })
      .catch((error) => {
        console.log(error);
        resolve();
      });
    });
  },
  getEvents: function (skip, take) {
    return new Promise((resolve) => {
      fetch(`/api/${this.API_VERSION}/events?skip=${skip}&take=${take}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.status === 200) {
          // return a promise that resolves with the JSON body
          return res.json();
        } else {
          alert('Could not call get events');
          resolve(false);
        }
      })
      .then((json) => {
        resolve(json);
      }).catch((error) => {
        console.log(error);
        resolve(null);
      });
    });
  },
  getEvent: function (eventId) {
    return new Promise((resolve) => {
      console.log(this.app.state)
      console.log(eventId)
      fetch(`/api/${this.API_VERSION}/events/`+eventId,
      {
        method: 'GET'
      })
      .then((res) => {
        if (res.status === 200) {
          // return a promise that resolves with the JSON body
          return res.json();
        } else {
          alert('Could not call get event');
          resolve(false);
        }
      })
      .then((json) => {
        console.log(json);
        resolve(json.event);
      }).catch((error) => {
        console.log(error);
        resolve(null);
      });
    });
  },
  getUsers: function (skip, take) {
    return new Promise((resolve) => {
      this.get(`users?skip=${skip}&take=${take}`)
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        this.log(error);
        resolve(null);
      });
    });
  },
  getUser: function (userId) {
    return new Promise((resolve) => {
      fetch(`/api/${this.API_VERSION}/users/`+userId,
      {
        method: 'GET',
      })
      .then((res) => {
        if (res.status === 200) {
          // return a promise that resolves with the JSON body
          return res.json();
        } else {
          alert('Could not call login');
          resolve(null);
        }
      })
      .then((json) => {
        console.log(json);
        resolve(json.user);
      }).catch((error) => {
        console.log(error);
        resolve(null);
      });
    });
  },
  authenticateUser: function (email, password) {

    return new Promise((resolve) => {
      fetch(`/api/${this.API_VERSION}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then((res) => {
        if (res.status === 200) {
          // return a promise that resolves with the JSON body
          return res.json()
          // resolve(res.json());
        } else {
          alert('Could not call login');
          resolve(false);
        }
      })
      .then((json) => {
        console.log(json);
        if (json.result === true) {
          this.app.setState({ currentUser: json.user });
          resolve(true);
        }
        else {
          resolve(false);
        }
      }).catch((error) => {
        console.log(error);
        resolve(false);
      });
    });
  },
  changeVote : function (crime, dataFromChild, currentUser, flag) {
    return new Promise((resolve) => {
      fetch(`/api/${this.API_VERSION}/changeVote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          crime: crime,
          vote: crime.vote,
          dataFromChild:dataFromChild,
          currentUser:currentUser,
          flag: flag
        })
      })
      .then((res) => {
        if (res.status === 200) {
          // return a promise that resolves with the JSON body
          return res.json()
          // resolve(res.json());
        } else {
          alert('Could not change vote');
          resolve(false);
        }
      })
      .then((json) => {
        if (json.status === true) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }).catch((error) => {
        console.log(error);
        resolve(false);
      });
    });

  },
  createUser: function (user) {
    return new Promise(resolve => {
      this.post("createUser", {
        email: user.email,
        displayName: user.displayName,
        password: user.password
      })
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        this.log(error);
        resolve({
          success: false,
          message: "webservice error"
        });
      });
    });
  },
  createEvent: function (event) {
    return new Promise((resolve) => {
      fetch(`/api/${this.API_VERSION}/createEvent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: event.title,
          address: event.address,
          author: event.author,
          date: event.date,
          type: event.type,
          vote: 0,
          severity: event.severity,
          description: event.details,
          coordinateX: event.coordinateX,
          coordinateY: event.coordinateY
        })
      })
      .then((res) => {
        if (res.status === 200) {
          // return a promise that resolves with the JSON body
          return res.json()
          // resolve(res.json());
        } else {
          alert('Could not call post event');
          resolve(false);
        }
      })
      .then((json) => {
        if (json.status === true) {
          this.app.setState({currentUser:{
            _id: this.app.state.currentUser._id,
            email: this.app.state.currentUser.email,
            displayName: this.app.state.currentUser.displayName,
            password: this.app.state.currentUser.password,
            admin: this.app.state.currentUser.admin,
            events: [ ...this.app.state.currentUser.events,json.event._id],
            upvote: this.app.state.currentUser.upvote,
            downvote: this.app.state.currentUser.downvote
          }})
          resolve(true);
        }
        else {
          resolve(false);
        }
      }).catch((error) => {
        console.log(error);
        resolve(false);
      });
    });
  },
  resetPassword: function(email) {
    return new Promise((resolve) => {
      this.notImplemented();
      resolve({
        success: false,
        message: "Function not implemented"
      });
    });
  },
  updateEvent: function (event) {
    return new Promise((resolve) => {
      this.notImplemented();
      for (let i = 0; i < this.data.events.length; i++) {
        if (parseInt(this.data.events[i].CRIME_ID) === parseInt(event.CRIME_ID)) {
          this.data.events[i] = event;
          resolve(true);
        }
      }
      resolve(false);
    });
  },
  deleteEvent: function (eventId) {
    return new Promise((resolve) => {
      fetch(`/api/${this.API_VERSION}/deleteEvent/`+eventId,
      {
        method: 'DELETE'
      })
      .then((res) => {
        if (res.status === 200) {
          // return a promise that resolves with the JSON body
          // this.app.setState({ currentUser:{events: this.app.state.currentUser.events.filter((e)=> e._id != eventId)}})
          console.log(this.app.state)
          return res.json()
          // resolve(res.json());
        } else {
          alert('Could not call delete event');
          resolve(false);
        }
      })
      .then((json) => {
        if (json.status === true) {
          this.app.setState({currentUser:{
            _id: this.app.state.currentUser._id,
            email: this.app.state.currentUser.email,
            displayName: this.app.state.currentUser.displayName,
            password: this.app.state.currentUser.password,
            admin: this.app.state.currentUser.admin,
            events: this.app.state.currentUser.events.filter((e)=> e != eventId),
            upvote: this.app.state.currentUser.upvote,
            downvote: this.app.state.currentUser.downvote
          }})
          resolve(true);
        }
        else {
          resolve(false);
        }
      }).catch((error) => {
        console.log(error);
        resolve(false);
      });
    });
  },
  updateUser: function (user) {
    return new Promise((resolve) => {
      this.notImplemented();
      resolve(false);
    });
  },
  deleteUser: function (userId) {
    return new Promise((resolve) => {
      this.notImplemented();
      resolve(false);
    });
  },
  notImplemented: function () {
    const msg = "This function involves data update and is not implemented in phase 1";
    console.log(msg);
  }
};


export default DummyBackend;

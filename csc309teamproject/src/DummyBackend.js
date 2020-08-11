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
          this.app.setState({ currentUser: { id: -1, username: "" } });
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
        resolve({
          events: json.events,
          
        });
      }).catch((error) => {
        console.log(error);
        resolve(null);
      });
    });
  },
  getEvent: function (eventId) {
    return new Promise((resolve) => {
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
      fetch(`/api/${this.API_VERSION}/users?skip=${skip}&take=${take}`,
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
        resolve({
          users: json.users,
          totalEntries: json.totalEntries
        });
      }).catch((error) => {
        console.log(error);
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
  changeVote : function (crime, dataFromChild) {
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
          dataFromChild:dataFromChild
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
    // return new Promise((resolve) => {
    //   this.notImplemented();
    //   resolve({
    //     success: false,
    //     message: "Function not implemented"
    //   });
    // });
    return new Promise((resolve) => {
      fetch(`/api/${this.API_VERSION}/createUser`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          displayName: user.displayName,
          password: user.password
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
        console.log(userData)
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
      this.notImplemented();
      resolve(false);
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

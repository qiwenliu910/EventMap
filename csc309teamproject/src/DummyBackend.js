import * as dataEvents from "./data/crimeData.json"


function DummyBackend(app) {
  this.app = app;
}


DummyBackend.prototype = {
  logout: function () {
    this.app.setState({ currentUser: { id: -1, username: "" } });
  },
  getEvents: function (skip, take) {
    return new Promise((resolve) => {
      let events = dataEvents.crimeList.slice(skip, skip + take);
      setTimeout(function () {
        resolve({
          events: events,
          totalEntries: dataEvents.crimeList.length
        });
      }.bind(this), 1000);

    });
  }

};


export default DummyBackend;
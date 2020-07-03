import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/view/Home';
import About from './components/view/About';
import Events from './components/view/Events';
import AdminDashboard from './components/view/AdminDashboard';
import AdminEventManagement from './components/view/AdminEventManagement';
import AdminEventDetails from './components/view/AdminEventDetails';
import Login from './components/view/Login';
import Account from './components/view/Account';
import CreateAccount from './components/view/CreateAccount';
import ResetPassword from './components/view/ResetPassword';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from './components/layout/Header';
import Backend from "./DummyBackend"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        id: -1,
        username: "default",
        password: "default",
        admin: false,
        events: [],
        upvote: [],
        downvote: []
      },
      filter:null
    };

    this.actions = new Backend(this);
  }

  myCallback = (dataFromChild) => {
    this.setState({filter: dataFromChild});
  }
  render(){
    console.log(this.state.currentUser);
    return (
          <BrowserRouter key={this.state.filter}>
            <Header state={this.state} actions={this.actions} callbackFromParent = {this.myCallback}/>
            <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
              { /* Each Route below shows a different component depending on the exact path in the URL  */ }
              <Route exact path='/' render={() =>
                              (<Home state={this.state} actions={this.actions} />)}/>
              <Route path='/account' render={() =>
                              (<Account state={this.state} actions={this.actions} />)}/>
              <Route exact path='/about' render={() =>
                              (<About state={this.state}/>)}/>
              <Route exact path='/events' render={() =>
                              (<Events state={this.state} actions={this.actions}/>)}/>
              <Route exact path='/admin/dashboard' render={() =>
                              (<AdminDashboard state={this.state} actions={this.actions} />)}/>
              <Route exact path='/admin/events' render={() =>
                              (<AdminEventManagement state={this.state} actions={this.actions} />)}/>
              <Route exact path='/admin/event/:id' render={(props) =>
                              (<AdminEventDetails eventId={props.match.params.id} state={this.state} actions={this.actions} />)}/>
              <Route exact path='/login' render={() =>
                              (<Login state={this.state} actions={this.actions}/>)}/>
              <Route exact path='/resetpassword' render={() =>
                              (<ResetPassword state={this.state}/>)}/>
              <Route exact path='/createaccount' render={() =>
                              (<CreateAccount state={this.state}/>)}/>
            </Switch>
          </BrowserRouter>
      );
  }
}

export default App;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/view/Home';
import About from './components/view/About';
import AdminDashboard from './components/view/AdminDashboard';
import AdminEventManagement from './components/view/AdminEventManagement';
import Login from './components/view/Login';
import Account from './components/view/Account';
import CreateAccount from './components/view/CreateAccount';
import ResetPassword from './components/view/ResetPassword';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from './components/layout/Header';
import * as userData from "./data/userData.json"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        id: -1,
        username: "default",
        password: "default",
        events: []
      },
      users: userData.users
    };

    this.actions = {
      logout: () => {
        this.setState({ currentUser: { id: -1, username: "" }});
      }
    };
  }

  changeUser = (user) =>{
    this.setState({currentUser:user,users:this.state.users})
  }

  render(){
    console.log(this.state.currentUser)
    return (
          <BrowserRouter>
            <Header currentUser={this.state.currentUser} actions={this.actions}/>
            <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
              { /* Each Route below shows a different component depending on the exact path in the URL  */ }
              <Route exact path='/' render={() =>
                              (<Home state={this.state}/>)}/>
              <Route path='/account' render={() =>
                              (<Account state={this.state}/>)}/>
              <Route exact path='/about' render={() =>
                              (<About state={this.state}/>)}/>
              <Route exact path='/admin/dashboard' render={() =>
                              (<AdminDashboard state={this.state} actions={this.actions} />)}/>
              <Route exact path='/admin/events' render={() =>
                              (<AdminEventManagement state={this.state} actions={this.actions} />)}/>
              <Route exact path='/login' render={() =>
                              (<Login state={this.state} changeUser={this.changeUser}/>)}/>
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

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/view/Home';
import About from './components/view/About';
import Login from './components/view/Login';
import CreateAccount from './components/view/CreateAccount';
import ResetPassword from './components/view/ResetPassword';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from './components/layout/Header';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        id: 0,
        username: "default",
        password: "default"
      },
      users: [
        {
          id: 1,
          username: "user",
          password: "user"
        },
        {
          id: 2,
          username: "user2",
          password: "user2"
        },
        {
          id: 3,
          username: "user3",
          password: "user3"
        }
      ]
    };
    
  
  }

  render(){
    console.log(this.state.currentUser)
    return (
        <div>
          
          <BrowserRouter>
            <Header/>
            <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
              { /* Each Route below shows a different component depending on the exact path in the URL  */ }
              <Route exact path='/' render={() => 
                              (<Home state={this.state}/>)}/>
              <Route exact path='/about' render={() => 
                              (<About state={this.state}/>)}/>
              <Route exact path='/login' render={() => 
                              (<Login state={this.state}/>)}/>
              <Route exact path='/resetpassword' render={() => 
                              (<ResetPassword state={this.state}/>)}/>
              <Route exact path='/createaccount' render={() => 
                              (<CreateAccount state={this.state}/>)}/>
            </Switch>
          </BrowserRouter>
        </div>
      );
  }
}

export default App;

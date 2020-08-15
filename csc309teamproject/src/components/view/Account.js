import React from 'react';
import { Route, Switch} from 'react-router-dom';
import AccountPage from '../Account/AccountPage'
import AccountEvents from '../Account/AccountEvents'
import AccountSettings from '../Account/AccountSettings'
import CreateEvent from '../Account/CreateEvent'

class Account extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
        { /* Each Route below shows a different component depending on the exact path in the URL  */ }
        <Route exact path='/account/events' render={() =>
                        (<AccountEvents state={this.props.state} actions={this.props.actions}/>)}/>
        <Route exact path='/account/info' render={() =>
                        (<AccountPage state={this.props.state} actions={this.props.actions}/>)}/>
        <Route exact path='/account/eventcreate' render={() =>
                        (<CreateEvent state={this.props.state} actions={this.props.actions}/>)}/>
        <Route path='/account/settings' render={() =>
                        (<AccountSettings state={this.props.state} actions={this.props.actions}/>)}/>
      </Switch>
    );
  }
}


export default Account;

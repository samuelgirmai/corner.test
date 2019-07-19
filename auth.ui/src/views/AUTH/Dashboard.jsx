import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';

import UserStats from 'views/AUTH/UserStats.jsx';
import CapStats from 'views/AUTH/CapStats.jsx';

class Dashboard extends Component {
  render() {
    return (
      <div className="main-content">
      <Grid fluid>
        <UserStats/>
        <CapStats/>
      </Grid>
      </div>
    );
  }
}

export default Dashboard;

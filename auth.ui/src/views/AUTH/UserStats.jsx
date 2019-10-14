import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import {Grid, Row, Col} from 'react-bootstrap';
import {Card} from 'components/Card/Card.jsx';
import {StatsCard} from 'components/Card/StatsCard.jsx';

import CONFIG from 'config/config'
import STREAM from 'stream/stream'
import STORE from 'store/main'
import AUTH from 'logic/auth'
import _ from 'lodash'

class UserStats extends Component {
  constructor(props){
    super(props);

    this.state = {
      users_count: STORE.read('stats', 'users_count'),
      offline: 0,
      online: 0
    }

    STREAM.listen("/auth/stats", [{
      e_name: 'e_stats',
      cb: this.onStats
    }]);
  }

  componentDidMount(){
    this.heartbeatMonitor();
  }

  getState = async() => {
    let s = await AUTH.get_heartbeat();

    if(s.status == "ok"){
      this.setState({
        offline: s.result.state.offline.length,
        online: s.result.state.online.length + 1
      });
    }
    else {
      this.setState({
        online: 0
      });
    }
  }

  heartbeatMonitor = () => {
    setInterval(this.getState, 5000);
  }

  getStats = async(arg) => {
    await AUTH.get_stats("users_count", arg);

    this.setState({
      users_count: STORE.read('stats', 'users_count')
    });
  }

  onStats = (p) => {
    //alert(JSON.stringify(p, 0, '  '));
    switch(p.data.type){
      case 'users_count':
        /*write stats to store*/
        STORE.write('stats', p.data);

        /*update view*/
        this.setState({
          users_count: p.data.val
        });
        break;
    }
  }

  render() {
    return (
   
      <div>
      <Row>
        <Col md={3}>
          <StatsCard
            bigIcon={<i className="fa fa-user-o"></i>}
            statsText="Persons"
            statsValue={this.state.users_count.person.toString()}
            statsIcon={<a onClick={ () => this.getStats("person")}><i className="fa fa-refresh"></i></a>}
            statsIconText="Updated now"
          />
        </Col>
        <Col md={3}>
          <StatsCard
            bigIcon={<i className="fa fa-desktop"></i>}
            statsText="Clients"
            statsValue={this.state.users_count.client.toString()}
            statsIcon={<a onClick={() => this.getStats("client")}><i className="fa fa-refresh"></i></a>}
            statsIconText="Updated now"
          />
        </Col>
        <Col md={3}>
          <StatsCard
            bigIcon={<i className="fa fa-server"></i>}
            statsText="Services"
            statsValue={this.state.users_count.service.toString()}
            statsIcon={<a onClick={() => this.getStats("service")}><i className="fa fa-refresh"></i></a>}
            statsIconText="Updated now"
          />
        </Col>
        <Col md={3}>
          <StatsCard
            bigIcon={<i className="fa fa-signal"></i>}
            statsText="Online"
            statsValue={this.state.online.toString()}
            statsIcon={<a onClick={() => this.getStats("service")}><i className="fa fa-refresh"></i></a>}
            statsIconText="Updated now"
          />
        </Col>
      </Row>
      </div>
    
    );
  }
}

export default UserStats;

//import API_SOCK from '../../../../api/api_sock'
import CONFIG from 'config/config';
import STREAM from 'api/stream';
import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

//import API_STREAM from 'api/api_sock';
import {Card} from 'components/Card/Card.jsx';
import {StatsCard} from 'components/Card/StatsCard.jsx';
import {Tasks} from 'components/Tasks/Tasks.jsx';

import STORE from 'store/main'

class AccountStats extends Component {
  constructor(props){
    super(props);

    this.state = {
      person: STORE.read('stats', 'person_count'),
      service: STORE.read('stats', 'service_count'),
      client: STORE.read('stats', 'client_count'),
    }

    let handle = {
      onStat: this.updateDashboard
    }

    STREAM.connect(CONFIG.stream);
  }

  updateDashboard = (stat) => {
    switch(stat.payload.stat){
      case 'person_count':
        this.setState({
          person: stat.payload.data
        });
        break;
      case 'service_count':
        this.setState({
          service_count: stat.payload.data
        });
        break;
      case 'client_count':
        this.setState({
          client: stat.payload.data
        });
        break;
    }
  }

  updatePerson = () => {
    this.setState({
      person: ++this.state.person,
      client: ++this.state.client
    })
  }

  updateService = () => {
    this.setState({
      service: ++this.state.service,
      client: ++this.state.client
    })
  }

    render() {
        return (
                    <Row>
                        <Col lg={4} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-note text-success"></i>}
                                statsText="Client"
                                statsValue={this.state.client.toString()}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="Updated now"
                            />
                        </Col>
                        <Col lg={4} sm={6}>
                            <StatsCard
                                bigIcon={<i className="fa fa-hospital-o text-success"></i>}
                                statsText="Service"
                                statsValue={this.state.service.toString()}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="Updated now"
                            />
                        </Col>
                        <Col lg={4} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-users text-success"></i>}
                                statsText="Person"
                                statsValue={this.state.person.toString()}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="Updated now"
                            />
                        </Col>
                     </Row>
        );
    }
}

export default AccountStats;

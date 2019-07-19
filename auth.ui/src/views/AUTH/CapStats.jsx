//import API_SOCK from '../../../../api/api_sock'
import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash'
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col, Badge} from 'react-bootstrap';

import {Card} from 'components/Card/Card.jsx';
import {StatsCard} from 'components/Card/StatsCard.jsx';
import UserStats from 'views/AUTH/UserStats.jsx';

import STORE from 'store/main'
import AUTH from 'logic/auth'

var optionsBar = {
  seriesBarDistance: 10,
  axisX: {
    showGrid: true
  },
  height: "245px"
};

var responsiveBar = [
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];

class CapStats extends Component {
  constructor(props){
    super(props);

    this.state = {
      stats: STORE.read('stats', 'caps_count')
    }
  }

  formatCaps = () => {
    /*
     * remove the first element which is
     * ALL caps count
     */
    let st = this.state.stats.slice(1);

    let f = {
      series: [_.map(st, (c) => c.cnt)],
      labels: _.map(st, (c) => c.name)
    }

    return f;
  }

  badgeCapCount = (name, count) => {
    return(<div>{name+" "}<Badge variant="light">{count}</Badge></div>)
  }

  /*TODO: the following will be used on refresh
  getStats = async() => {
    await AUTH.get_stats("caps_count", null);

    this.setState({
      stats: STORE.read('stats', 'caps_count');
    });
  }*/

  render() {
    return (
        <div>
          <Row>
            <Col md={12}>
              <Card
                id="chartActivity"
                title={this.badgeCapCount("Capability (CAP) Distribution", "TOTAL CAPs = "+this.state.stats[0].cnt)}
                statsIcon={<i className="fa fa-cogs"></i>}
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.formatCaps()}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
              />
            </Col>
          </Row>
        </div>
    );
  }
}

export default CapStats;


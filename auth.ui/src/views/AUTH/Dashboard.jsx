//import API_SOCK from '../../../../api/api_sock'
import React, { Component } from 'react';
import moment from 'moment'
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';

import SweetAlert from 'react-bootstrap-sweetalert';

import {Card} from 'components/Card/Card.jsx';
import {StatsCard} from 'components/Card/StatsCard.jsx';
import {Tasks} from 'components/Tasks/Tasks.jsx';
import AccountStats from 'views/CBHI/AccountStats.jsx';
import CommonSelector from 'views/CBHI/CommonSelector.jsx';

import STORE from 'store/main'
import NET from 'api/net'

var optionsBar = {
    seriesBarDistance: 10,
    axisX: {
        showGrid: false
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

var optionsGrowth = {
  low: 0,
  high: 80,
  showArea: false,
  height: "245px",
  axisX: {
    showGrid: false,
  },
  lineSmooth: true,
  showLine: true,
  showPoint: true,
  fullWidth: true,
  chartPadding: {
    right: 50
  }
};

var responsiveGrowth = [
  ['screen and (max-width: 640px)', {
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];

var legendBar = {
    names: ["Claims","Settlements"],
    types: ["fa fa-question-circle-o text-info","fa fa-money text-danger"]
};

var legendPie = {
    names: ["Active", "Renewal", "Dropout"],
    types: ["fa fa-circle text-info", "fa fa-circle text-warning", "fa fa-circle text-danger"]
};

function _format_growth(growth)
{
  let series = [
    growth.agent,
    growth.provider,
    growth.consumer
  ];

  return {
    series: series,
    labels: ['Q1', 'Q2', 'Q3', 'Q4']
  }
}

function _format_validity(series)
{
  return {
    series: series,
    labels: [series[0]+'%', series[1]+'%', series[2]+'%']
  };
}

function _format_settlement(growth)
{
  let series = [
    growth.claim,
    growth.settlement
  ];

  return {
    series: series,
    labels: ['Mes', 'Tik', 'Hid', 'Tah', 'Tir', 'Yek', 'Meg', 'Mia', 'Gin', 'Sen', 'Ham', 'Neh']
  }
}

var legendUserGrowth = {
    names: ["Agents", "Providers","Consumers"],
    types: ["fa pe-7s-note text-info","fa fa-hospital-o text-danger","fa pe-7s-users text-warning"]
};

class Dashboard extends Component {
  constructor(props){
    super(props);

    let ccert_validity = STORE.read('stats', 'ccert_validity');

    let user_growth = {
      person: 0,
      client: 0,
      service: 0
    }

    let clm_stt = {
      claim: STORE.read('stats', 'claim_growth'),
      settlement: STORE.read('stats', 'settlement_growth')
    }

    this.state = {
      person: 0,
      client: 0,
      service: 0
    }
  }

  /*getGrowthStat = async() => {
    await API_REST.read_stats();

    let growth = {
      consumer: STORE.read('stats', 'consumer_growth'),
      provider: STORE.read('stats', 'provider_growth'),
      agent: STORE.read('stats', 'agent_growth')
    }

    this.setState({
        growth: _format_growth(growth)
    });
  }

  getValidityStat = async() => {
    await API_REST.read_stats();

    let ccert_validity = STORE.read('stats', 'ccert_validity');
    
    this.setState({
        validity: _format_validity(ccert_validity)
    });
  }*/

  getCaps = async() => {
    this.setState({
        caps: 0
    });
  }

    createLegend(json){
        var legend = [];
        for(var i = 0; i < json["names"].length; i++){
            var type = json["types"][i];
            legend.push(
                <i className={type} key={i}></i>
            );
            legend.push(
                json["names"][i]
            );
            legend.push("  ");
        }
        return legend;
    }

    openPrint = (title) => {
      this.setState({
        print: (
                <SweetAlert
                    error
                    style={{display: "block",marginTop: "-100px"}}
                    title="Can Not Print Report"
                    onConfirm={() => this.setState({ print: null })}
                    onCancel={() => this.setState({ print: null })}
                    confirmBtnBsStyle="info"
                >
                    Printer not configured
                </SweetAlert>
        )
      });
    }

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <legend>Dashboard</legend>
                    <AccountStats/>
                    <Row>
                        <Col md={6}>
                            <Card
                                statsIcon="fa fa-history"
                                id="chartHours"
                                title="User Base Growth"
                                category="Quarterly user growth"
                                stats="Updated now"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={this.state.growth}
                                            type="Line"
                                            options={optionsGrowth}
                                            responsiveOptions={responsiveGrowth}
                                        />
                                        {this.state.print}
                                    </div>
                                    }
                                legend={
                                    <div className="legend">
                                        {this.createLegend(legendUserGrowth)}
                                    </div>
                                }
                                stats={
                                  <div>
                                    <a className="btn btn-simple btn-icon" onClick={this.openPrint}><i className="fa fa-print"></i> Print Report</a>  <a className="btn btn-simple btn-icon" onClick={this.getGrowthStat}><i className="fa fa-refresh"></i> Refresh</a>
                                  </div>
                                }
                            />
                        </Col>
                        <Col md={6}>
                            <Card
                                statsIcon="fa fa-clock-o"
                                title="Active and Dropout consumers"
                                category="Certificate validity"
                                content={
                                    <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                                        <ChartistGraph data={this.state.validity} type="Pie"/>
                                    </div>
                                }
                                legend={
                                    <div className="legend">
                                        {this.createLegend(legendPie)}
                                    </div>
                                }
                                stats={
                                  <div>
                                    <a className="btn btn-simple btn-icon" onClick={this.openPrint}><i className="fa fa-print"></i> Print Report</a> <a className="btn btn-simple btn-icon" onClick={this.getValidityStat}><i className="fa fa-refresh"></i> Refresh</a>
                                  </div>
                                }
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Card
                                id="chartActivity"
                                title={"Claims and Settlements ("+moment().format("YYYY")+")"}
                                category="Total Claims and Settlements by month"
                                statsIcon={<i className="fa fa-check"></i>}
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={this.state.settlement}
                                            type="Bar"
                                            options={optionsBar}
                                            responsiveOptions={responsiveBar}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">
                                        {this.createLegend(legendBar)}
                                    </div>
                                }
                                stats={
                                  <div>
                                    <a className="btn btn-simple btn-icon" onClick={this.openPrint}><i className="fa fa-print"></i> Print Report</a> <a className="btn btn-simple btn-icon" onClick={this.getSettlementStat}><i className="fa fa-refresh"></i> Refresh</a>
                                  </div>
                                }
                            />
                        </Col>
                    </Row>

                </Grid>
            </div>
        );
    }
}

export default Dashboard;

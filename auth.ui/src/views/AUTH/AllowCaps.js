
import STORE from 'store/main';
import AUTH from 'logic/auth';
import React from 'react';
import _ from 'lodash';

//import message from 'antd';
import{
  Grid, Row, Col, Button,
  FormGroup, FormControl, ControlLabel
} from 'react-bootstrap';

import SweetAlert from 'react-bootstrap-sweetalert';

import Select from 'react-select'

import Card from 'components/Card/Card.jsx';
import {StatsCard} from 'components/Card/StatsCard.jsx';

var chkId;

class AllowCaps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      services: STORE.read('services', null),
      caps: STORE.read('caps', null),
      service: null,
      cap: [],
      price: 0,
      selectService: null,
      selectCap: null,
      alert: null
    };
  }

  componentDidMount() {
    this.setState({
      selectService: this.getSelectService()
    });
  }

  getSelectService = () => {
    let services = this.state.services;

    let selectService = [];
  
    for(let i=0; i<services.length; ++i){
      let item = {
         value: services[i].user_id,
         label: services[i].name
       }

       selectService.push(item);
    }

    return selectService;
  }

  getSelectCap = (s) => {
    let caps = this.state.caps;

    let selectCap = [];

    let f = _.filter(caps, {'service_id': s.value});

    for(let i=0; i<f.length; ++i){
      let item = {
        value: f[i].cap_id,
        label: f[i].desc
      }

      selectCap.push(item);
    }

    return selectCap;
  }

  
  onSelectService = (value) => {
    let caps = this.getSelectCap(value);
    this.setState({service: value, selectCap: caps});
  }

  onSelectCap = (value) => {
    this.setState({cap: value, price: value.length})
  }

  /*onConfirm = () => {
    var uid = this.props.args.user_id;

    var caps = this.state.cap.map(function(o){
      return o.value
    });

    this.setState({
      alert: (
        <SweetAlert
          success
          style={{display: "block",marginTop: "-100px"}}
          title="Allow Caps"
          onConfirm={() => this.setState({ alert: null })}
          onCancel={() => this.setState({ alert: null })}
          confirmBtnBsStyle="info"
        >
          Consumer Registred
        </SweetAlert>
      )
    });
  }*/

  onAllowCap = async() => {
    let uid = this.props.args.user_id;

    let caps = this.state.cap.map(function(o){
      return o.value
    });
  
    
    let r = await AUTH.allow_caps(uid, caps);

    if(r.status == "err"){
      alert(r.status)
      //message.error(r.status);
    }
    else {
      alert(r.status);
      //message.success(r.status);
    }
  }

  render() {
    if(!this.state.selectService){
      return (<div></div>);
    }
   
    return (
       <div className="main-content">
         <Grid fluid>
           <Card
             content={
               <div>
               <Row>
                    <Col md={4} mdOffset={8}>
                       <StatsCard
                          bigIcon={this.state.cap.length}
                         
                          statsIcon={<i className={this.props.args.icon}></i>}
                          statsIconText={this.props.args.user_id}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <ControlLabel>Service</ControlLabel>
                            <Select name="service" placeholder="Select service"
                                  value={this.state.service}
                                  options={this.state.selectService}
                                  onChange={(value) => this.onSelectService(value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <ControlLabel>Capabilities</ControlLabel>
                             <Select name="caps" placeholder="Select caps"
                                  closeOnSelect={false}
                                  multi={true}
                                  value={this.state.cap}
                                  options={this.state.selectCap}
                                  onChange={(value) => this.onSelectCap(value)}
                              />
                        </FormGroup>
                    </Col>
                </Row>
             
                <Row>
                     <Col md={10} mdOffset={5}>
                       <Button onClick={this.onAllowCap}>Allow Caps</Button>
                     </Col>
                </Row>
              </div>
             }
	  />
        </Grid>
        //{this.state.alert}
      </div>
    )
  }
}

export default AllowCaps;


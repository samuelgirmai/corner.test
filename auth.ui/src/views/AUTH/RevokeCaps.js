import STORE from 'store/main';
import AUTH from 'logic/auth';
import React from 'react';
import _ from 'lodash';

import{
  Grid, Row, Col, Button,
  FormGroup, FormControl, ControlLabel
} from 'react-bootstrap';

import Select from 'react-select'

import Card from 'components/Card/Card.jsx';
import {StatsCard} from 'components/Card/StatsCard.jsx';

var chkId;

class RevokeCaps extends React.Component {
  constructor(props) {
    super(props);

    let args = this.props.args;

    this.state = {
      tcaps: STORE.read('caps', null),
      acaps: _.filter(STORE.read(args.type, null), {'user_id': args.user_id}),
      service: null,
      cap: [],
      price: 0,
      selectService: null,
      selectCap: null,
    };
  }

  componentDidMount() {
    this.setState({
      selectCap: this.getSelectCap()
    });
  }

  getSelectCap = () => {
    let tcaps = this.state.tcaps;
    let acaps = this.state.acaps[0].cap;

    let selectCap = [];

    for(let i=0; i<acaps.length; ++i){
      let cap = _.filter(tcaps, {'cap_id': acaps[i]});

      if(!cap.length){
        break;
      }

      let item = {
        value: cap[0].cap_id,
        label: cap[0].desc
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

  onAllowCap = async() => {

    let uid = this.props.args.user_id;

    let caps = this.state.cap.map(function(o){
      return o.value
    });
  
    
    let r = await AUTH.revoke_caps(uid, caps);

    if(r.status == "err"){
      alert("status: err");
    }
    else {
      alert("status: ok");
    }
  }

  render() {
    if(!this.state.selectCap){
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
                {/*<Row>
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
                </Row>*/}
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
                       <Button onClick={this.onAllowCap}>Revoke Caps</Button>
                     </Col>
                </Row>
              </div>
             }
	  />
        </Grid>
      </div>
    )
  }
}

export default RevokeCaps;


import STORE from 'store/main';
import _ from 'lodash';

import AUTH from 'logic/auth';

import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Table,
    OverlayTrigger,
    Tooltip,
    FormGroup, ControlLabel
} from 'react-bootstrap';

import Select from 'react-select'
// react component that creates a switch button that changes from on to off mode
import Switch from 'react-bootstrap-switch';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

import img1 from 'assets/img/blog-1.jpg';
import img2 from 'assets/img/blog-2.jpg';
import img3 from 'assets/img/blog-3.jpg';
import img4 from 'assets/img/blog-4.jpg';
import img5 from 'assets/img/blog-5.jpg';


class ExtendedTables extends Component{
  constructor(props){
    super(props);
    let rows = [];

    this.state = {
      caps: STORE.read('caps', null),
      selectService: null,
      service: null
    }

    this.services = STORE.read('services', null);

  } 

  componentDidMount(){
    this.setState({
      selectService: this.getSelectService(),
      service: _.filter(this.getSelectService(), (i) => i.label === 'auth')[0]
    })

  }

  onSelectService = (value) => {
    this.setState({service: value})
  }

  getSelectService = () => {

    let selectService= [];

    for(let i=0; i<this.services.length; ++i){
      let item = {
        value: this.services[i].user_id,
        label: this.services[i].name
      }

      selectService.push(item);
    }

    return selectService;
  }

  del = () => {
    return(<Tooltip id="del" pointerColor="#C1DFDF">Delete CAP</Tooltip>);
  }

  onDeleteCap = async(service_id, cap_id) => {
    //alert(service_id +"  "+cap_id);
    let r = await AUTH.remove_cap(service_id, cap_id);

    alert(r.status);
  }

  list = () => {
    let table = [];

    if(this.state.service)
      table =_.filter(this.state.caps, (c) => c.service_id === this.state.service.value)
 
    let rows = [];
        for(let i=0; i<table.length; i++){
          rows.push(                                            
            <tr key={i}>
                <td className="text-left">{i+1}</td>
                <td className="text-description">{table[i].desc}</td>
                <td className="text-left">{table[i].uri}</td>
                <td className="text-left">{table[i].cap_id}</td>
                <td className="text-center">
                <OverlayTrigger placement="top" overlay={this.del()}>
                    <Button simple bsStyle="danger" bsSize="xs" onClick={()=> {this.onDeleteCap(table[i].service_id, table[i].cap_id)}}>
                        <i className="fa fa-trash"></i>
                    </Button>
                </OverlayTrigger>
              </td>
            </tr>
          )
        }

      return rows;
    }

    render(){

        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={"Total Capabilities ("+this.state.caps.length+")"}
                                category="List of capabilities per services"
                                content={
                                  <div>
                                  <Row>
                                  <Col md={3}>
                                      <FormGroup>
                                          <ControlLabel>Select a service</ControlLabel>
                                           <Select name="services" placeholder="Select Services"
                                                closeOnSelect={true}
                                                value={this.state.service}
                                                options={this.state.selectService}
                                                autoFocus={true}
                                                onChange={(value) => this.onSelectService(value)}
                                            />
                                      </FormGroup>
                                  </Col>
                              </Row>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th className="text-center">#</th>
				        	                              <th className="text-description">Cap Name</th>
                                                <th className="text-left">Cap URI</th>
                                                <th className="text-left">Cap ID</th>
                                                <th className="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
					                                {this.list()}
                                        </tbody>
                                    </Table></div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default ExtendedTables;

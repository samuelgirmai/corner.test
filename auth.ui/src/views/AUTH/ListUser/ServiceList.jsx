import STORE from 'store/main';

import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Table,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
// react component that creates a switch button that changes from on to off mode
import Switch from 'react-bootstrap-switch';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';
import ModalContainer from 'views/AUTH/ModalContainer';
import AllowCaps from 'views/AUTH/AllowCaps';
import RevokeCaps from 'views/AUTH/RevokeCaps';
import ServiceReg from 'views/AUTH/RegUser/ServiceReg';

import img1 from 'assets/img/blog-1.jpg';
import img2 from 'assets/img/blog-2.jpg';
import img3 from 'assets/img/blog-3.jpg';
import img4 from 'assets/img/blog-4.jpg';
import img5 from 'assets/img/blog-5.jpg';


/*var table = [
  {
    user_id: "123121",
    name: "Auth",
    host: "127.0.0.1",
    port: 5555,
    date: "30/08/2016",
  },
  {
    user_id: "123121",
    name: "Auth",
    host: "127.0.0.1",
    port: 5555,
    date: "30/08/2016",
  }
]*/

class ExtendedTables extends Component{
  constructor(props){
    super(props);
    
    
    let rows = [];

    this.state = {
      services: STORE.read('services', null),
      allow: null,
      revoke: null,
      register: null
    }
  }

  componentDidMount(){
    //this.setState({refresh: 1});
  }

  add = () => {
    return(
      <Tooltip id="add">Allow CAPs</Tooltip>
    );
  }

  remove = () => {
    return(
      <Tooltip id="remove">Revoke CAPs</Tooltip>
    );
  }

  clean = () => {
    this.setState({allow: null});
  }

  openAllowCaps = (user_id) => {
    let args = {
      user_id: user_id,
      type: "services",
      icon: "fa fa-server"
    }

    this.setState({
      allow: (
        <ModalContainer mount={AllowCaps} args={args} clean={this.clean}/>
      )
    });
  }

  openRevokeCaps = (user_id) => {
    let args = {
      user_id: user_id,
      type: "services",
      icon: "fa fa-server"
    }

    this.setState({
      revoke: (
        <ModalContainer mount={RevokeCaps} args={args} clean={this.clean}/>
      )
    });
  }

  openRegService = () => {
    this.setState({
      register: (
        <ModalContainer mount={ServiceReg} clean={this.clean}/>
      )
    });
  }

  list = () => {
    let table = this.state.services;

    let rows = [];

    for(let i=0; i<table.length; i++){
      rows.push( 
        <tr>
          <td className="text-center">{i+1}</td>
          <td className="text-center">{table[i].user_id}</td>
          <td className="text-center">{table[i].name}</td>
          <td className="text-center">{table[i].host}</td>
          <td className="text-center">{table[i].license}</td>
          <td className="text-center">
            <OverlayTrigger placement="top" overlay={this.add()}>
              <Button simple bsStyle="success" bsSize="xs" onClick={() => {this.openAllowCaps(table[i].user_id)}}>
                <i className="fa fa-plus"></i>
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={this.remove()} onClick={() => {this.openRevokeCaps(table[i].user_id)}}>
              <Button simple bsStyle="danger" bsSize="xs">
                <i className="fa fa-minus"></i>
              </Button>
            </OverlayTrigger>
          </td>
        </tr>
      )
    }

    return rows;
  }

  render(){
    if(!this.state.services.length){
      return (
        <div className="main-content text-center">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Button className="text-center" simple  bsSize="xs" onClick={this.openRegService}>
                  <i className="fa fa-server"></i> New Service
               </Button>
             </Col>
             {this.state.register}
           </Row>
         </Grid>
       </div>
      );
    }

    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                content={
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Service ID</th>
                        <th className="text-center">Service Name</th>
                        <th className="text-center">Host</th>
                        <th className="text-center">License</th>
                        <th className="text-center">CAPS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.list()}
                    </tbody>
                  </Table>
                }
              />
              {this.state.allow}
              {this.state.revoke}
              {this.state.register}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ExtendedTables;

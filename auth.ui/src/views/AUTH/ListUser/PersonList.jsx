import CONFIG from 'config/config';
import STORE from 'store/main';
import STREAM from 'stream/stream';
import AUTH from 'logic/auth';

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

import PersonReg from 'views/AUTH/RegUser/PersonReg';

import img1 from 'assets/img/blog-1.jpg';
import img2 from 'assets/img/blog-2.jpg';
import img3 from 'assets/img/blog-3.jpg';
import img4 from 'assets/img/blog-4.jpg';
import img5 from 'assets/img/blog-5.jpg';

var clr;
var st;

class RegPerson extends Component{
  constructor(props){
    super(props);
    
    
    let rows = [];

    this.state = {
      persons: STORE.read('persons', null),
      allow: null,
      revoke: null,
      reg: null
    }
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

  del = () => {
    return(
      <Tooltip id="del">Delete User</Tooltip>
    );
  }

  clean = () => {
    this.setState({allow: null, revoke: null, reg: null});
  }

  openAllowCaps = (user_id) => {
    let args = {
      user_id: user_id,
      type: "persons",
      icon: "fa fa-user"
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
      type: "persons",
      icon: "fa fa-user"
    }

    this.setState({
      revoke: (
        <ModalContainer mount={RevokeCaps} args={args} clean={this.clean}/>
      )
    });
  }

  onDeleteUser = async(user_id) => {
    let r = await AUTH.remove_person(user_id);

    if(r.status == "ok"){
      alert(r.status);
      /*reload store*/
      this.setState({
        persons: STORE.read('persons', null)
      });
    }
    else {
      alert(r.status);
    }
  }

  openRegPerson = () => {
    this.setState({
      reg: (
        <ModalContainer mount={PersonReg} clean={this.clean}/>
      )
    });
  }

  list = () => {
    let table = this.state.persons;

    let rows = [];

    for(let i=0; i<table.length; i++){
      rows.push(                                            
        <tr>
          <td className="text-center">{i+1}</td>
          <td className="text-center">{table[i].user_id}</td>
          <td className="text-center">{table[i].name}</td>
          <td className="text-center">{table[i].fname}</td>
          <td className="text-center">{table[i].dob}</td>
          <td className="text-center">{table[i].gender}</td>
          <td className="text-center">
          <OverlayTrigger placement="top" overlay={this.add()}>
            <Button simple bsStyle="success" bsSize="xs" onClick={() => {this.openAllowCaps(table[i].user_id)}}>
              <i className="fa fa-plus"></i>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={this.remove()}>
            <Button simple bsStyle="danger" bsSize="xs" onClick={() => {this.openRevokeCaps(table[i].user_id)}}>
              <i className="fa fa-minus"></i>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={this.del()}>
            <Button simple bsStyle="danger" bsSize="xs" onClick={() => {this.onDeleteUser(table[i].user_id)}}>
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
    if(!this.state.persons.length){
      return (
        <div className="main-content text-center">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Button className="text-center" simple  bsSize="xs" onClick={this.openRegPerson}>
                  <i className="fa fa-user"></i> New Person
               </Button>
             </Col>
             {this.state.reg}
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
                        <th className="text-center">Person ID</th>
                        <th className="text-center">First Name</th>
                        <th className="text-center">Last Name</th>
                        <th className="text-center">Date of Birth</th>
                        <th className="text-center">Gender</th>
                        <th className="text-center">Actions</th>
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
              {this.state.reg}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default RegPerson;

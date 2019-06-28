import STORE from 'store/main';
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
import ClientReg from 'views/AUTH/RegUser/ClientReg';

import img1 from 'assets/img/blog-1.jpg';
import img2 from 'assets/img/blog-2.jpg';
import img3 from 'assets/img/blog-3.jpg';
import img4 from 'assets/img/blog-4.jpg';
import img5 from 'assets/img/blog-5.jpg';

/*var table = [
  {
    user_id: "123121",
    name: "Auth",
    date: "30/08/2016",
  },
  {
    user_id: "123121",
    name: "Auth",
    date: "30/08/2016",
  }
]*/

class RegClient extends Component{
  constructor(props){
    super(props);
    
    
    let rows = [];

    this.state = {
      clients: STORE.read('clients', null),
      allow: null,
      revoke: null,
      reg: null
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

  del = () => {
    return(
      <Tooltip id="del">Delete User</Tooltip>
    );
  }

  clean = () => {
    this.setState({revoke: null, allow: null});
  }

  openAllowCaps = (user_id) => {
    let args = {
      user_id: user_id,
      type: "clients",
      icon: "fa fa-desktop"
    }

    this.setState({
      allow: (
        <ModalContainer mount={AllowCaps} args={args} clean={this.clean} />
      )
    });
  }

  openRevokeCaps = (user_id) => {
    let args = {
      user_id: user_id,
      type: "clients",
      icon: "fa fa-desktop"
    }

    this.setState({
      revoke: (
        <ModalContainer mount={RevokeCaps} args={args} clean={this.clean}/>
      )
    });
  }

  onDeleteUser = async(user_id) => {
    let r = await AUTH.remove_client(user_id);

    if(r.status == "ok"){
      alert(r.status);
      /*reload store*/
      this.setState({
        clients: STORE.read('clients', null)
      });
    }
    else {
      alert(r.status);
    }
  }

  openRegClient = () => {
    this.setState({
      reg: (
        <ModalContainer mount={ClientReg} clean={this.clean}/>
      )
    });
  }

  list = () => {
    let table = this.state.clients;

    let rows = [];

    for(let i=0; i<table.length; i++){
      rows.push(                                            
        <tr>
          <td className="text-center">{i+1}</td>
          <td className="text-center">{table[i].user_id}</td>
          <td className="text-center">{table[i].name}</td>
          <td className="text-center">{table[i].license}</td>
          <td className="text-center">
            <OverlayTrigger placement="top" overlay={this.add()}>
              <Button simple bsStyle="success" bsSize="xs" onClick={() => {this.openAllowCaps(table[i].user_id)}}>
                <i className="fa fa-plus"></i>
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={this.remove()}>
              <Button simple bsStyle="danger" bsSize="xs">
                <i className="fa fa-minus" onClick={() => {this.openRevokeCaps(table[i].user_id)}}></i>
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
    if(!this.state.clients.length){
      return (
        <div className="main-content text-center">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Button className="text-center" simple  bsSize="xs" onClick={this.openRegClient}>
                  <i className="fa fa-desktop"></i> New Client
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
            <Col md={10} mdOffset={1}>
              <Card
                content={
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Client ID</th>
                        <th className="text-center">Client Name</th>
                        <th className="text-center">LICENSE</th>
                        <th className="text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.list()}
                    </tbody>
                  </Table>
                }
              />
              {this.state.revoke}
              {this.state.allow}
              {this.state.reg}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default RegClient;

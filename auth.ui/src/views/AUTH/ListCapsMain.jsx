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
      caps: STORE.read('caps', null)
    }
  }

  componentDidMount(){
    //alert(JSON.stringify(this.a, 0, '  '))
    //this.setState({refresh: 1});
  }

  del = () => {
    return(<Tooltip id="del" pointerColor="#C1DFDF">Delete CAP</Tooltip>);
  }

  list = () => {
    let table = this.state.caps;

    let rows = [];
        for(let i=0; i<table.length; i++){
          rows.push(                                            
            <tr>
                <td className="text-left">{i+1}</td>
                <td className="text-description">{table[i].desc}</td>
                <td className="text-left">{table[i].uri}</td>
                <td className="text-left">{table[i].cap_id}</td>
                <td className="text-center">
                <OverlayTrigger placement="top" overlay={this.del()}>
                    <Button simple bsStyle="danger" bsSize="xs">
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
                                title={"Capabilities ("+this.state.caps.length+")"}
                                category="List of capabilities exported by all services"
                                content={
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
                                    </Table>
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

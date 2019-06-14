import React, { Component } from 'react';
import { Grid, Row, Col, Modal } from 'react-bootstrap';

import {Card} from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

class CommonModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      show: true,
    }
  }

  close = () => {
    this.setState({
      show: false
    });

    this.props.clean();
  }

  render(){
    //let lgClose = () => this.setState({ lgShow: false });

    return(
          <Modal show={this.state.show} onHide={this.close} bsSize={this.props.bsSize}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <this.props.mount args={this.props.args}/>
            </Modal.Body>
          </Modal>
    );
  }
}

export default CommonModal;

import React from 'react';

import{
    Row, Col,
    FormGroup, FormControl, ControlLabel,
    Image
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import AUTH from 'logic/auth';

class ServiceReg extends React.Component{
    constructor(props){
        super(props);

        this.sii = {
          name: "",
          desc: "",
          host: "",
          port: "",
          address: {
            email: "",
            phone_number: ""
          }
        }
    }

    onReg = async() => {
      this.sii.host = this.sii.host+":"+this.sii.port;

      let r = await AUTH.create_service(this.sii);

      //this.sii.host = "";

      if(r.status == "err"){
        alert(r.status);
      }
      else {
        alert(r.status);
      }
    }

    render(){
      return (      
                        <Col md={12}>
                            <Card
                                textCenter
                                tableFullWidth
                                content={

            <div className="main-content">
                {/*this.state.photo*/}
                <legend>Service Information</legend>
               <Row>
                   <Col md={4} mdOffset={1}>
                        <FormGroup>
                            <ControlLabel>Service Name</ControlLabel>
                            <FormControl type="text" name="name" placeholder="ex: Auth" onChange={ (e) => {this.sii.name = e.target.value}}/>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <ControlLabel>REST API Host</ControlLabel>
                            <FormControl type="text" name="host" placeholder="127.0.0.1" onChange={(e)=>{this.sii.host = e.target.value}}/>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <ControlLabel>REST API Port</ControlLabel>
                            <FormControl type="text" name="port" placeholder="5500" onChange={(e)=>{this.sii.port=e.target.value}}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={10} mdOffset={1}>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl type="textarea" name="lname" placeholder="What this service does.." onChange={(e)=>{this.sii.desc = e.target.value}}/>
                        </FormGroup>
                    </Col>
		</Row>
		<Row>
                    <Col md={5} mdOffset={1}>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" name="email" placeholder="service@tigrai.gov"  onChange={(e)=>{this.sii.address.email = e.target.value}}/>
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup>
                            <ControlLabel>Phone Number</ControlLabel>
                            <FormControl type="text" name="phone_number" placeholder="+259141111111" onChange={(e)=>{this.sii.address.phone_number = e.target.value}}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                <Col md={10} mdOffset={5}>
                  <Button onClick={this.onReg}>Register Service</Button>
                </Col>
                </Row>
            </div>
	   }/>
           </Col>
        );
    }
}

export default ServiceReg;

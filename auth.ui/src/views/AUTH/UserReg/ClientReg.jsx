import React from 'react';

import{
    Row, Col,
    FormGroup, FormControl, ControlLabel,
    Image
} from 'react-bootstrap';

import Datetime from 'react-datetime'
import Select from 'react-select'
import TagsInput from 'react-tagsinput'
import Button from 'elements/CustomButton/CustomButton.jsx';
import Card from 'components/Card/Card.jsx';

class ClientReg extends React.Component{
    constructor(props){
        super(props);

        this.cii = {
          name: "",
          desc: "",
          address: {
            email: "",
            phone_number: ""
          }
        }
    }

    onReg = () => {
      alert(JSON.stringify(this.cii, 0, ' '));
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
                <legend>Client Information</legend>
               <Row>
                   <Col md={10} mdOffset={1}>
                        <FormGroup>
                            <ControlLabel>Client Name</ControlLabel>
                            <FormControl type="text" name="name" placeholder="ex: Citizen Registration" onChange={ (e) => {this.cii.name = e.target.value}}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={10} mdOffset={1}>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl type="textarea" name="desc" placeholder="What this client does.." onChange={(e)=>{this.cii.desc = e.target.value}}/>
                        </FormGroup>
                    </Col>
		</Row>
		<Row>
                    <Col md={5} mdOffset={1}>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" name="email" placeholder="client@startup.gov" onChange={(e)=>{this.cii.address.email = e.target.value}}/>
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup>
                            <ControlLabel>Phone Number <span className="text-danger">*</span></ControlLabel>
                            <FormControl type="text" name="phone_number" placeholder="+25914222222" onChange={(e)=>{this.cii.address.phone_number = e.target.value}}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                <Col md={10} mdOffset={5}>
                  <Button onClick={this.onReg}>Register Client</Button>
                </Col>
                </Row>
            </div>
	   }/>
           </Col>
        );
    }
}

export default ClientReg;

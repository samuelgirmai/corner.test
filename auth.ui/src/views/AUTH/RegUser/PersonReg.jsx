import React from 'react';

import{
    Row, Col,
    FormGroup, FormControl, ControlLabel,
    Image
} from 'react-bootstrap';

import Datetime from 'react-datetime'
import Select from 'react-select'
import TagsInput from 'react-tagsinput'

import ImageUploader from 'react-images-upload'
//import Address from 'views/AUTH/Address.jsx'

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import AUTH from 'logic/auth';

import PersonalInfo from 'views/AUTH/PersonalInfo';
import Address from 'views/AUTH/Address';

class PersonReg extends React.Component{
    constructor(props){
        super(props);

        this.pii = {
          name: "",
          fname: "",
          mname: "blob",
          mfname: "blob",
          dob: "",
          gender: "",
          address: {
            region: "tigray",
            zone: "",
            woreda: "",
            house_number: "001",
            kebele: "",
            phone_number: []
          }
        }
    }

    onReg = async() => {
      let r = await AUTH.create_person(this.pii);

      if(r.status == "err"){
        alert(r.status);
      }
      else {
        alert(r.status);
      }
    }

    render(){
      return (      
        <Card
          textCenter
          tableFullWidth
          content={
            <div className="main-content">
                 <Row>
                 <Col md={5} mdOffset={1}>
                    <PersonalInfo pinfo={this.pii}/>                  
                 </Col>
                 <Col md={5}>
                    <Address address={this.pii.address}/>
                 </Col>
                 </Row>
                 <Row>
                 <Col md={10} mdOffset={5}>
                   <Button onClick={this.onReg}>Register Person</Button>
                 </Col>
                 </Row>
            </div>
	 }/>
      );
    }
}

export default PersonReg;

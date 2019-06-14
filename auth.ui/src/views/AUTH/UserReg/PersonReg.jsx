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

//import CommonModal from 'views/CBHI/CommonModal.jsx'
//import PhotoPreview from 'views/CBHI/PhotoPreview'
import STREAM from 'api/stream';
import CONFIG from 'config/config';
import AUTH from 'logic/auth';

import photo_placeholder from "views/AUTH/assets/img/photo_placeholder.png";

import PersonalInfo from 'views/AUTH/PersonalInfo';
import Address from 'views/AUTH/Address';

class Step1 extends React.Component{
    constructor(props){
        super(props);

        this.pii = {
          name: "",
          fname: "",
          dob: "",
          gender: "",
          address: {
            region: "tigray",
            zone: "",
            wereda: "",
            kebele: "",
            phone_number: []
          }
        }
    }

    onReg = async() => {
      let r = await AUTH.create_person(this.pii);

      if(r.status == "err"){
        alert("status: err"+r.result.info);
      }
      else {
        alert("status: ok");
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

export default Step1;

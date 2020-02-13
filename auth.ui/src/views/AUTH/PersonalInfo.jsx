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
import moment from 'moment';
//import CommonModal from 'views/CBHI/CommonModal.jsx'
//import PhotoPreview from 'views/CBHI/PhotoPreview'
import STREAM from 'api/stream';
import CONFIG from 'config/config';

import photo_placeholder from "views/AUTH/assets/img/photo_placeholder.png";

class PersonalInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          gender: ""
        }
    }

    onChangeText = (t) => {
      this.props.pinfo[t.name] = t.value
    }

    clean = () => {
      this.setState({
        photo: null
      });
    }

    render(){
      return (      
                 <div>
                 <legend>Personal Information</legend>
                     <FormGroup>
                       <ControlLabel>First Name</ControlLabel>
                       <FormControl type="text" name="name" placeholder="ex: Hayelom Berhane" onChange={(event) => {this.onChangeText(event.target)}}/>
                      </FormGroup>
     
                      <FormGroup>
                        <ControlLabel>Last Name</ControlLabel>
                        <FormControl type="text" name="fname" placeholder="ex: Berihu" onChange={(event) => {this.onChangeText(event.target)}}/>
                      </FormGroup>
                  
                      <FormGroup>
                        <ControlLabel>Gender</ControlLabel>
                        <Select name="gender" value={this.state.gender}
                          options={[
                            {value: 1,label:"M"},
                            {value: 2,label:"F"},
                          ]}
                          onChange={(t) =>{this.props.pinfo.gender = t.label; this.setState({gender: t})} }
                        />
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>Date of Birth</ControlLabel>
                          <Datetime name="dob"
                            timeFormat={false}
                            inputProps={{placeholder:"Date of Birth"}}
                            onChange={(t)=>{this.props.pinfo.dob=moment(t).format('DD/MM/YYYY')}}
                        />
                      </FormGroup>
                  </div>

        );
    }
}

export default PersonalInfo;

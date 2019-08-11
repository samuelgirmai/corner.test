import React from 'react';

import{
    Row, Col,
    FormGroup, FormControl, ControlLabel,
    Image
} from 'react-bootstrap';

import Datetime from 'react-datetime'
import Select from 'react-select'
import TagsInput from 'react-tagsinput'

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

class Address extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          phones: [],
        }
    }

    /*handlePhoneTags = (phones) => {
      this.props.address.phone_number = phones
      this.setState({phones});
    }*/

    render(){
      return (      
                  <div>
                       <legend>Personal Address</legend>
                       <FormGroup>
                         <ControlLabel>Zone</ControlLabel>
                         <Select name="zone" value={this.state.zone}
                           options={[
                             {value: 1,label:"East"},
                           ]}
                           onChange={(t) => {this.props.address.zone=t.label; this.setState({ zone: t})}}
                         />
                       </FormGroup>
                      <FormGroup>
                        <ControlLabel>Wereda</ControlLabel>
                        <Select name="woreda" value={this.state.woreda}
                          options={[
                            {value: 1,label:"Wukro"},
                          ]}
                          onChange={(t) => {this.props.address.woreda=t.label; this.setState({ woreda: t})}}
                        />
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>Kebele</ControlLabel>
                        <FormControl placeholder="Enter Kebele" type="text" onChange={(t)=>{this.props.address.kebele=t.target.value}}/>
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>Phone Number</ControlLabel>
                        <FormControl type="text" name="phone_number" placeholder="+25914222222" onChange={(t)=>{this.props.address.phone_number=t.target.value}}/>
                      </FormGroup>
                   
                      {/*<FormGroup>
                        <ControlLabel>Phone Number</ControlLabel>
                        <TagsInput value={this.state.phones} 
                          addKeys={[9, 32]}
                          inputProps={{placeholder: "Add phone"}}
                          onChange={this.handlePhoneTags}
                          tagProps={{className: 'react-tagsinput-tag tag-azure' }}
                        />
                      </FormGroup>*/}
                  </div>
        );
    }
}

export default Address;

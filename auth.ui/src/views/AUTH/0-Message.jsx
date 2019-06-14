import React, { Component } from 'react';
import {
    FormGroup, ControlLabel, FormControl,
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import FormInputs from 'components/FormInputs/FormInputs.jsx';
import UserCard from 'components/Card/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import {message} from 'antd'

import STORE from 'store/main'
import API_REST from 'api/setup/api_rest'

import Logo from 'views/Home/UploadLogo'



class Setting extends Component {
    constructor(props){
      super(props);

      //this.handleNotification = this.handleNotification.bind(this);

      this.state = {
        old_passwd: null,
        passwd: null,
        confirm_passwd: null,

        /*profile*/
        name: null,
        category: null,
        email: null,
        desc: null,
        /*logo*/
        logo: null
      }

      this.profile = STORE.read('my_profile', '');
    }

    componentDidMount(){
      this.setState({_notificationSystem: this.refs.notificationSystem});
    }

    onUpdateProfile = async() => {
      let profile = {
        name: this.state.name,
        category: this.state.category,
        email: this.state.email,
        desc: this.state.desc
      }

      let res = await API_REST.update_profile(profile);

      if(res.error){
        message.error(res.error, 3);
      }
      else{
        message.success(res.status, 3);
      }
      //alert(JSON.stringify(res, 0, '  '));
    }

    onUpdateSecurity = async() => { 
      let security = {
        old_passwd: this.state.old_passwd,
        passwd: this.state.passwd
      }

      let res = await API_REST.update_security(security);

      if(res.error){
        message.error(res.error, 3);
      }
      else{
        message.success(res.status, 3);
      }
    }

    onUpdateLogo = async() => {
      let session = STORE.read('session');

      let logo = {
        data: {
          skey: session.skey,
        },
        file: this.state.logo
      }

      let res = await API_REST.signup_logo(logo);

      if(res.error){
        message.error(res.error, 3);
      }
      else{
        message.success(res.status, 3);
      }
    }

    onLogoSelected = (file) => {
      this.state.logo = file;
    }

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Edit Security"
                                content={
                                    <form>
                                        <FormInputs
                                            ncols = {["col-md-4" , "col-md-4", "col-md-4"]}
                                            proprieties = {[{
                                                 label : "Old Password",
                                                 type : "password",
                                                 bsClass : "form-control",
                                                 placeholder : "Old Password",
                                                 onChange: (event) => this.setState({old_passwd: event.target.value }) 
                                                },
                                                {
                                                 label : "New Password",
                                                 type : "password",
                                                 bsClass : "form-control",
                                                 placeholder : "New Password",
                                                 onChange: (event) => this.setState({passwd: event.target.value })
                                                },
                                                {
                                                 label : "Confirm Password",
                                                 type : "password",
                                                 bsClass : "form-control",
                                                 placeholder : "Confirm Password",
                                                 onChange: (event) => this.setState({confirm_passwd: event.target.value })
                                                }
                                            ]}
                                        />
                                        <Button
                                            bsStyle="info"
                                            pullRight
                                            fill
                                          
                                            onClick={this.onUpdateSecurity}
                                        >
                                            Change Password
                                        </Button>
                                        <div className="clearfix"></div>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Card
                                title="Edit Basic Profile"
                                content={
                                    <form>
                                        <FormInputs
                                            ncols = {["col-md-5" , "col-md-3" , "col-md-4"]}
                                            proprieties = {[
                                                {
                                                 label : "Company Name (disabled)",
                                                 type : "text",
                                                 bsClass : "form-control",
                                                 placeholder : this.profile.name,
                                                 //disabled : true,
                                                 onChange: (event) => this.setState({name: event.target.value })
                                                },
                                                {
                                                 label : "Category",
                                                 type : "text",
                                                 bsClass : "form-control",
                                                 placeholder : this.profile.category,
                                                 onChange: (event) => this.setState({category: event.target.value })
                                                },
                                                {
                                                 label : "Email address",
                                                 type : "email",
                                                 bsClass : "form-control",
                                                 placeholder : this.profile.email,
                                                 onChange: (event) => this.setState({email: event.target.value })
                                                }
                                            ]}
                                        />
                                        <div className="row">
                                            <div className="col-md-12">
                                                <FormGroup controlId="formControlsTextarea">
                                                    <ControlLabel>Company Description</ControlLabel>
                                                    <FormControl rows="5" 
                                                        componentClass="textarea" 
                                                        bsClass="form-control" 
                                                        placeholder={this.profile.desc}
                                                        onChange={(event) => this.setState({desc: event.target.value })}

                                                    />
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <Button
                                            bsStyle="info"
                                            pullRight
                                            fill
                                            onClick={this.onUpdateProfile}
                                        >
                                            Update Profile
                                        </Button>
                                        <div className="clearfix"></div>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Change Official Logo"
                                content={
                                    <form>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <FormGroup controlId="formControlsTextarea">
                                                <ControlLabel>Company Logo</ControlLabel>
                                                <Logo logo={this.profile.logo} onChange={this.onLogoSelected}/>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <Button
                                            bsStyle="info"
                                            pullRight
                                            fill
                                            onClick={this.onUpdateLogo}
                                        >
                                            Update Logo
                                        </Button>
                                        <div className="clearfix"></div>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Setting;

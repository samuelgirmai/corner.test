import React, { Component } from 'react';
import {
    FormGroup, FormControl
} from 'react-bootstrap';

import Button from 'elements/CustomButton/CustomButton.jsx';

//import avatar from 'assets/img/default-avatar.png';
import avatar from 'assets/img/ehia.jpg';

import Dash from 'containers/Dash/Dash.jsx'

class LockScreenPage extends Component{
    constructor(props){
      super(props);
      this.state = {
        unlock: false
      }
    }

    unlock = () => {
        this.setState({
          unlock: true
        });
    }

    render(){
        if(this.state.unlock){
          this.state.unlock = false
          return (
            <div>route</div>
          )
        }
        return (
            <form className="ng-untouched ng-pristine ng-valid">
                <div className="user-profile">
                    <div className="author">
                        <img alt="..." className="avatar" src={avatar} />
                    </div>
                    <h4>Administrator</h4>
                    <FormGroup>
                        <FormControl
                            type="password"
                            placeholder="Enter Password"
                        />
                    </FormGroup>
                    <Button wd neutral round onClick={this.unlock}>
                        Unlock
                    </Button>
                </div>
            </form>
        );
    }
}

export default LockScreenPage;

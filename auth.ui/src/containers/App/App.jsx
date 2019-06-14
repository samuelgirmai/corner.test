import React, {Component} from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import {
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx'
import {BarLoader} from 'react-spinners'

import INIT from 'init/main'

// dinamically create app routes

import appRoutes from 'routes/app.jsx';

class App extends Component{
    constructor(props){
      super(props);

      this.state = {
        loading: true
      };
    }


    componentDidMount(){
      this.LoadData();
    }

    LoadData = async() => {
      let t = await INIT.init();

      
      /*check for success*/

      this.setState({
        loading: false
      })
    }

    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.action === "PUSH" && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }
    render(){
        if(this.state.loading){
          return(
            <div style={style}>
              <BarLoader
                style={style}
                width={300}
                color={'#C1DFDF'}
                loading={this.state.loading}
              />
            </div>
          );
        }

        return (
            <Switch>
                {
                    appRoutes.map((prop,key) => {
                        return (
                            <Route path={prop.path} component={prop.component} key={key} />
                        );
                    })
                }
            </Switch>
        );
    }
}

export default App;

const style = { 
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate3d(-50%,-50%,0)'
}

import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Accordion, PanelGroup, Panel,
    Nav, NavItem,
    Tab
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import PersonList from 'views/AUTH/ListUser/PersonList.jsx';
import ServiceList from 'views/AUTH/ListUser/ServiceList.jsx';
import ClientList from 'views/AUTH/ListUser/ClientList.jsx';
//import AccountStats from 'views/CBHI/AccountStats.jsx';

class AccountListMain extends Component{
    constructor(props){
      super(props);
    }

    componentDidUpdate(e){
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this._reactInternalInstance._currentElement._owner._instance._reactInternalInstance._currentElement._owner._instance.componentDidUpdate(e);
        }
    }
    isMac(){
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    render(){
        const tabsIcons = (
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey="person">
                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="person">
                                <i className="fa fa-user"></i> Person
                            </NavItem>
                            <NavItem eventKey="client">
                                <i className="fa fa-desktop"></i> Client
                            </NavItem>
                            <NavItem eventKey="service">
                                <i className="fa fa-server"></i> Service
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="person">
                               <PersonList/> 
                            </Tab.Pane>
                            <Tab.Pane eventKey="client">
                                <ClientList/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="service">
                                <ServiceList/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                ctFullWidth
                                content={tabsIcons}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default AccountListMain;

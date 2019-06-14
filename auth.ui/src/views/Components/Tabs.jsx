import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Accordion, PanelGroup, Panel,
    Nav, NavItem,
    Tab
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Register from 'views/Register/Register.jsx';

class Panels extends Component{
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
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey="info">
                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="info">
                                <i className="fa fa-info"></i> Info
                            </NavItem>
                            <NavItem eventKey="account">
                                <i className="fa fa-user"></i> Account
                            </NavItem>
                            <NavItem eventKey="style">
                                <i className="fa fa-cube"></i> Style
                            </NavItem>
                            <NavItem eventKey="settings">
                                <i className="fa fa-cog"></i> Settings
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="info">
                               <Register/> 
                            </Tab.Pane>
                            <Tab.Pane eventKey="account">
                                We are Houses Inc., a group of architects and interior designers based in Chicago and operating for clients worldwide. We’ve been designing stunningly beautiful houses and making clients happy for years.
                            </Tab.Pane>
                            <Tab.Pane eventKey="style">
                                Explore a wide variety of styles, personalise your finishes, and let us design the perfect home for you. It's what we do best and you can see proof in the products and reviews below.
                            </Tab.Pane>
                            <Tab.Pane eventKey="settings">
                                Explore a wide Houses Inc., a group of architects and interior designers based in Chicago and operating for clients worldwide. We’ve been designing stunningly beautiful houses and making clients happy for years.
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
                                title="Tabs & Icons"
                                category="Tabs with icons and full width"
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

export default Panels;

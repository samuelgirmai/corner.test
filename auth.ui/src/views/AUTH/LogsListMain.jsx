import moment from 'moment'
import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net
import $ from 'jquery';
import {
    Grid, Row, Col,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';

import ModalContainer from 'views/AUTH/ModalContainer.jsx';

import Card from 'components/Card/Card.jsx';
import STORE from 'store/main'
import AUTH from 'logic/auth'
// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');


const head = ['Type', 'Log ID', 'Status', 'Micro Service', 'CAP URL', 'Date', 'Actions'];

class LogList extends Component{
    constructor(props){
      super(props);

      this.state = {
        list: this.table(STORE.read('logs', null)),
        print: null,
        open: false,
      }

      //this.data = this.format(STORE.read('provider', null));
    }

    table = (data) => {
       let list = [];

       if(!data){
         return [];
       }

       for(let i=0; i<data.length; ++i){
         let rec = [];

         rec.push(data[i].type);
         rec.push(data[i].log_id);
         rec.push(data[i].log.status);
         rec.push(data[i].log.uservice);
         rec.push(data[i].log.uri);
         rec.push(moment.unix(data[i].time).format("DD/MM/YYYY"));

         list.push(rec);
       }

       return list;
    }

    onRefresh = async() => {
      let r = await AUTH.list_logs();

      if(r.status == "err"){
        return;
      }

      alert(JSON.stringify(r, 0, '  '));

      this.setState({
        list: this.table(r.result.logs)
      });
    }

    componentDidMount(){
       $("#loglist").DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [[8, 10, 25, -1], [8, 10, 25, "All"]],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records",
            }
        });

        var tbl = $('#loglist').DataTable();

        /*tbl.on( 'click', '.remove', function (e) {
            var $tr = $(this).closest('tr');
            tbl.row($tr).remove().draw();
            e.preventDefault();
        });*/
    }

    clean = () => {
      this.setState({
        print: null
      });
    }

    componentWillUnmount(){
        $('.data-table-wrapper')
        .find('table')
        .DataTable()
        .destroy(true);
    }

    render() {
        const remove = (
          <Tooltip id="open">Open</Tooltip>
        );

        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title=""
                                content={
                                    <div className="fresh-datatables">
                                        <table id="loglist" ref="main" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{width:"100%"}}>
                                            <thead>
                                                <tr>
                                                    <th className="text-center">{ head[0] }</th>
                                                    <th className="text-center">{ head[1] }</th>
                                                    <th className="text-center">{ head[2] }</th>
                                                    <th className="text-center">{ head[3] }</th>
                                                    <th className="text-center">{ head[4] }</th>
                                                    <th className="text-center">{ head[5] }</th>
                                                    <th className="disabled-sorting text-center">{ head[6] }</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.list.map((prop,key) => {
                                                        return (
                                                            <tr key={key}>
                                                                {
                                                                    prop.map((prop,key)=> {
                                                                        return (
                                                                            <td className="text-center" key={key}>{prop}</td>
                                                                        );
                                                                    })
                                                                }
                                                                <td className="td-actions text-center">
                                                                    <OverlayTrigger placement="top" overlay={remove}>
                                                                      <a className="btn btn-simple btn-sucess btn-icon remove"><i className="fa fa-folder-o"></i></a>
                                                                    </OverlayTrigger>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        {this.state.print}
                                    </div>
                                }
                                stats={
                                  <div className="legend">
                                    <a className="btn btn-simple btn-icon" onClick={this.onRefresh}><i className="fa fa-refresh"></i> Refresh</a>
                                  </div>
                                }

                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default LogList;

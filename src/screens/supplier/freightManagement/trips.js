import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader, Badge} from 'reactstrap';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {refreshing} from "../../../helpers/notifications";
import {LRView} from "../../../helpers/api";
import Loader from "../../../components/loader";
import {Link} from "react-router-dom";
import Button from "reactstrap/es/Button";
import Upload from '../../../components/upload'


const columns = [
    {
        dataField: 'lr_billingparty',
        text: 'LR Billing Party',
        sort: true

    },
    {
        dataField: 'lr_declared',
        text: 'LR Declared',
        sort: true,

    }, {
        dataField: 'lr_invoice_date',
        text: 'LR Date',
        sort: true
    },
    {
        dataField: 'lr_consignor_name',
        text: 'LR Consignor Name',
        sort: true

    },
    {
        dataField: 'lr_consignee_name',
        text: 'LR Consignee Name',
        sort: true

    },
    {
        dataField: 'Edit LR',
        text: 'Edit LR',
        sort: true,
        formatter: (cell, row) => (
            <div>
                <Link to={`/freight/edit-lr/${row.id}`}>
                    <Button color="primary">
                        Edit LR
                    </Button>
                </Link>
            </div>
        )

    },
    {
        dataField: 'Print LR',
        text: 'Print LR',
        sort: true,
        formatter: (cell, row) => (
            <div>
                <Link to={`/freight/request-for-quotation/bids/${row.id}`}>
                    <Button color="primary">
                        Print LR
                    </Button>
                </Link>
            </div>
        )

    },


    {
        dataField: 'Upload POD',
        text: 'Upload POD',
        sort: true,
        isDummyField:true,
        formatter: (cell, row) => (
            <div>
                <Upload to={`/freight/request-for-quotation/bids/${row.id}`}>
                </Upload>


            </div>
        )

    },
];


export default () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const loadApiData = async () => {
            refreshing();
            const trucks = await LRView();
            setData(trucks)
        };

        loadApiData();
    }, []);

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"/>Financial<small className="text-muted"/>
                </CardHeader>
                <CardBody>
                    <ToolkitProvider
                        keyField="id"
                        data={data}
                        columns={columns}
                        search

                    >
                        {
                            props => (
                                <div>
                                    <div style={{paddingTop: 10, paddingBottom: 10, float: 'right'}}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Search.SearchBar {...props.searchProps} />
                                    </div>
                                    <BootstrapTable
                                        {...props.baseProps}
                                        hover
                                        condensed
                                        striped

                                        bordered={false}
                                        pagination={paginationFactory()}
                                        noDataIndication={Loader}
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </CardBody>
            </Card>
        </div>
    );
}

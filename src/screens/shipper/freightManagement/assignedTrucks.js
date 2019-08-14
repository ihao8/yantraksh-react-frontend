import React, {useState, useEffect} from 'react';
import {Card, NavLink, Nav, NavItem, CardBody, CardHeader, Button, ButtonGroup} from 'reactstrap';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {BeatLoader} from "react-spinners";
import {assignedTrucks} from "../../../helpers/api";
import {refreshing} from "../../../helpers/notifications";


const columns = [{
    dataField: 'truck_type',
    text: 'Truck Type',
    sort: true
}, {
    dataField: 'origin',
    text: 'Origin',
    sort: true

}, {
    dataField: 'destination',
    text: 'Destination',
    sort: true
}, {
    dataField: 'total_trucks',
    text: 'NO. of trucks',

}, {
    dataField: 'material_type',
    text: 'Material Type',
    sort: true
}, {
    dataField: 'posted_on',
    text: 'Date',
    sort: true,
}, {
    dataField: 'offered_price',
    text: 'Offered Price',
    sort: true
}, {
    dataField: 'Action',
    text: 'Action',
    sort: true,
    formatter: (row, cell) => (
        <Button color="primary">Bid Now</Button>
    )


},];


export default () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadApiData = async () => {
            refreshing();
            const trucks = await assignedTrucks();
            setData(trucks);
        };

        loadApiData();
    }, []);


    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"/> All Orders <small className="text-muted"/>
                </CardHeader>
                <CardBody>
                    <ToolkitProvider
                        keyField="id"
                        data={data}
                        columns={columns}
                        search
                        exportCSV={{onlyExportSelection: true, exportAll: true}}
                    >
                        {
                            props => (
                                <div>
                                    <div style={{paddingTop: 10, paddingBottom: 10}}>



                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                        <Search.SearchBar {...props.searchProps} />
                                    </div>
                                    <BootstrapTable
                                        {...props.baseProps}
                                        striped
                                        hover
                                        condensed
                                        pagination={paginationFactory()}
                                        noDataIndication={() => (<div style={{textAlign: 'center'}}><BeatLoader/></div>)}

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

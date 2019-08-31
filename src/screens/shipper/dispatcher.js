import React, {useState, useEffect} from "react";
import DataTable from "../../components/dataTable";
import {Col, Row, Card, CardBody, Button} from "reactstrap";
import {Map, GoogleApiWrapper} from 'google-maps-react'
import CardHeader from "reactstrap/es/CardHeader";
import {getDispatchHistory} from "../../helpers/api";

const apiKey = "AIzaSyBa6popp4h4-uNP98vV_-qhI9-GdHg1uQ8";

const DispatchMap = (props) => (
    <Map google={props.google}
         zoom={10}
         initialCenter={{
             lat: 35.5496939,
             lng: -120.7060049
         }}

    />
);

const DispatchMapWrapper = GoogleApiWrapper({
    apiKey: apiKey
})(DispatchMap);

const dispatchPlanColumns = [
    {
        dataField: 'id',
        text: 'ID',
        sort: true
    },
    {
        dataField: 'name',
        text: 'Truck',
        sort: true,
        isDummyField: true,
        formatter: (cell, row) => (
            <span>{row.truck_type} {row.truck_name}</span>
        )
    },
    {
        dataField: 'total_trucks',
        text: 'NO. of trucks',
        sort: true
    }, {
        dataField: 'weight',
        text: 'Weight',
        sort: true
    },
    {
        dataField: 'percent_filled',
        text: 'Volume utilisation',
        sort: true
    },
    {
        dataField: 'origin',
        text: 'Route',
        isDummyField: true,
        formatter: (cell, row) => (
            <span>{row.origin} -> {row.destination}</span>
        )
    },
    {
        dataField: 'distance',
        text: 'Route Distance',
        sort: true,
    },
    {
        dataField: 'route_tat',
        text: 'Date',
        sort: true,
    },
    {
        dataField: 'time',
        text: 'Dispatch Time',
        sort: true,
    },
    {
        dataField: 'Action',
        text: 'Action',
        sort: true,
        formatter: (row, cell) => (
            <Button color="primary">Raise RFQ</Button>
        )


    }


];
const dispatchListColumns = [
    {
        dataField: 'id',
        text: 'SKU ID',
        sort: true,
    },
    {
        dataField: 'name',
        text: 'Name',
        sort: true
    }, {
        dataField: 'pid',
        text: 'PID',
        sort: true,
    }, {
        dataField: 'quantity',
        text: 'Quantity',
        sort: true,
    }
];

const LoadingPlan = ({row}) => {

    return (
        <div className={"animated slideInDown lightSpeedIn"} style={{marginBottom: 60, marginTop: 20}}>
            <Row>
                <Col lg={7}>
                    <DataTable columns={dispatchListColumns} data={row.items}/>
                </Col>
                <Col lg={4}>
                    <iframe src={row.route_link} frameBorder="0" style={{'height':'100%'}} />
                    {/*<DispatchMapWrapper/>*/}
                </Col>
            </Row>
        </div>
    )
};

const expandRow = row => (
    <LoadingPlan row={row}/>
);

export default (props) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const getNetwork = async () => {
            const data = await getDispatchHistory();
            setData(data);
            console.log(data);
        };

        getNetwork();
    }, [setData]);

    return (
        <Row>
            <Col lg={12}>
                <Card>
                    <CardHeader>
                        <b>Dispatch Plan</b>
                    </CardHeader>

                    <CardBody>
                        <DataTable columns={dispatchPlanColumns} data={data} expandRow={{renderer: expandRow}}/>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

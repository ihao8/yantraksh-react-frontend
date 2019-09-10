import React from "react";
import DataTable from "../../../components/dataTable";
import {Button, Card, CardBody, Col, Row} from "reactstrap";
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react'
import CardHeader from "reactstrap/es/CardHeader";
import {assignedTrucks, trackNow} from "../../../helpers/api";
import {refreshing} from "../../../helpers/notifications";
import {BeatLoader} from "react-spinners";
const apiKey = "AIzaSyBa6popp4h4-uNP98vV_-qhI9-GdHg1uQ8";

//clase based mai connnnvert krlo is
//kese hota h ??
//nahii aata bc :/
//classs banao return wala render(){return ()} is return mai dal do or use state ki jnga this.state={},set plan kiplace prr this,setState({)

const styles = {
    height:'100%',


}


const DispatchMap = (props) => {
    console.log(props, "here");

    return <Map google={props.google}
                style={styles}
                zoom={5}
                center={{
                    lat: props.location[0].loc[0] || this.state.loading,
                    lng: props.location[0].loc[1] || this.state.loading,
                }}


    >
        <Marker
            name={'Your position'}
            style={styles}
            position={{
                lat: props.location[0].loc[0] || this.state.loading,
                lng: props.location[0].loc[1] || this.state.loading,
            }}
        />


    </Map>
};
const DispatchMapWrapper = GoogleApiWrapper({
    apiKey: apiKey,

})(DispatchMap);

class Tracking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plan: [{loc: [20.5937, 78.9629]}],
            data: [],
            loading:true,
        }
    }

    componentDidMount() {
        const getTrucks = async () => {
            refreshing();
            const truckData = await assignedTrucks();
            this.setState({data: truckData});
            console.log(truckData, "truck")
        };
        const getLoacation = async (id) => {
            const locationPlan = await trackNow(id);
            this.setState({data: locationPlan});
            this.setState({loading:false});

            console.log(locationPlan, "locationPlan");
        };

        getTrucks();
        getLoacation();
    }


    render() {

        console.log(DispatchMap);


        const assignedTruckColumns = [
            {
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
                dataField: 'scheduled_date',
                text: 'Date',
                sort: true,
            }, {
                dataField: 'offered_price',
                text: 'Offered Price',
                sort: true
            },
            {
                dataField: 'trackNow',
                isDummyField: true,
                text: 'Track Now',
                sort: true,
                formatter: (cell, row) => (
                    <div>

                        <Button color="primary" onClick={async () => {
                            const locationPlan = await trackNow(row.id);
                            console.log(locationPlan);
                            this.setState({
                                plan: locationPlan
                            })
                        }

                        }>

                            Track Now!

                        </Button>

                    </div>
                )

            }];


        const dispatchListColumns = [
            {
                dataField: 'Date and Time',
                text: 'Date and time ',
                sort: true,
                formatter: (cell, row) => {
                    return (row.createdAt)

                }
            },
            {
                dataField: 'tel',
                text: 'Location',
                sort: true,
                formatter: (cell, row) => {
                    return (row.address)
                }
            },

            {
                dataField: 'location',
                text: 'Location',
                sort: true,
                formatter: (cell, row) => {
                    return (row.loc[0])
                }
            },

            {
                dataField: 'location',
                text: 'Location',
                sort: true,
                formatter: (cell, row) => {

                    return (row.loc[1])
                }
            },
        ];


        return (
            <Row>
                {/*<DispatchMapWrapper/>*/}


                <Col md={6}>

                <Card >
                    <CardHeader>
                        <b>Assigned Trucks</b>
                    </CardHeader>
                    <CardBody>
                        <DataTable columns={assignedTruckColumns} data={this.state.data}/>
                    </CardBody>
                </Card>

                </Col>


                <Col md={6}>
                    <Card style={{height: '21vw'}}>
                        <CardHeader>
                            <b>Route</b>
                        </CardHeader>
                        <CardBody className={"trackingCard"}>

                            {<DispatchMapWrapper location={this.state.plan}/>}

                        </CardBody>

                    </Card>



                    <Card>
                        <CardHeader>
                            <b>Location Details</b>
                        </CardHeader>

                            <DataTable columns={dispatchListColumns} data={this.state.plan}/>
                    </Card>
                </Col>
            </Row>
        )


    }
}

export default Tracking

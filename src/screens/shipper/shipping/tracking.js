import React from "react";
import DataTable from "../../../components/dataTable";
import {Button, Card, CardBody, Col, Row} from "reactstrap";
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react'
import CardHeader from "reactstrap/es/CardHeader";
import {assignedTrucks, trackNow} from "../../../helpers/api";
import {refreshing} from "../../../helpers/notifications";

const apiKey = "AIzaSyBa6popp4h4-uNP98vV_-qhI9-GdHg1uQ8";



const styles = {
    height: '100%',


}


const DispatchMap = (props) => {
    console.log(props, "here");
    return <Map google={props.google}
                style={styles}
                zoom={7}
                center={{
                    lat: props.location[0].loc[0],
                    lng: props.location[0].loc[1],
                    // lat:33,
                    //     lng:72
                }}



    >
        <Marker
            name={'Your position'}
            style={styles}
            position={{
                lat: props.location[0].loc[0],
                lng: props.location[0].loc[1],
                // lat:33,
                // lng:72
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
            loading: true,
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
            this.setState({loading: false});

            console.log(locationPlan, "locationPlan");
        };

        getTrucks();
        getLoacation();
    }


    render() {

        console.log(DispatchMap);


        const assignedTruckColumns = [
            {
                dataField: 'id',
                text: 'Trip ID',
                sort: true

            },

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
                text: 'No. of trucks',

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
                                plan: locationPlan,
                                loading: false,
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
                dataField: 'curr_ETA',
                text: 'ETA',
                sort: true,
                formatter: (cell, row) => {
                    return (row.curr_ETA)
                }
            },


        ];


        return (
            <Row>
                {/*<DispatchMapWrapper/>*/}


                <Col md={6}>

                    <Card>
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

                            <DispatchMapWrapper location={this.state.plan} loading={this.state.loading}/>
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
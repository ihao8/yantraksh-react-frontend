import React, {Component} from 'react';
import {Card, NavLink, Nav, NavItem, CardBody, CardHeader, Button, ButtonGroup} from 'reactstrap';
import {loadOrders, markOrdersOnHold, markOrdersRTD, planVehiclesForOrders} from "../actions/data";
import {connect} from "react-redux";
import {ALL_ORDERS, DISPATCHED_ORDERS, ON_HOLD_ORDERS, RTD_ORDERS} from "../data/orderTitles";
import {refreshing} from "../helpers/notifications";
import {withRouter} from 'react-router-dom'
import Upload from "./upload";
import DataTable from "../components/dataTable";
import columns from "../data/columns/orders";
import {BeatLoader} from "react-spinners";


const filterData = (data, hold, rtd, dispatched) => {
    let xd = [];
    data.map((row) => {
        if (!row.is_dispatched && !row.rtd && hold)
            xd.push(row);

        if (row.is_dispatched && dispatched)
            xd.push(row);

        if (row.rtd && rtd)
            xd.push(row);

        return null
    });

    return xd;
};

class OrderTable extends Component {

    refPass = (node) => {
        this.tableNode = node;
    };

    getSelectedData = () => {
        return this.tableNode.selectionContext.selected;
    };

    async markHold() {
        const selected = this.getSelectedData();
        await this.props.markHold(selected, this.props.history.push);
    }

    async markRTD() {
        const selected = this.getSelectedData();
        await this.props.markRTD(selected, this.props.history.push);
    }

    planVehicle() {
        this.props.planVehicle(this.props.history.push);
        // this.props.history.push('/orders/dispatched')
    }

    componentDidMount() {
        if (!this.props.loaded)
            this.props.getOrders()
    }

    render() {
        const {
            orders = [],
            title,
            rtd = false,
            hold = false,
            dispatched = false,
            loading,
            loaded,
            getOrders,
            changing,
            props
        } = this.props;

        const leftButtons = (props) => (
            <div style={{display: 'inline-block'}}>
                <ButtonGroup>
                    <Button color={"warning"}
                            onClick={this.markHold.bind(this)}
                            disabled={title === ON_HOLD_ORDERS}>
                        <i className={"fa fa-pause-circle"}/> &nbsp;
                        Mark Hold
                    </Button>

                    <Button color="primary"
                            onClick={this.markRTD.bind(this)}
                            disabled={title === RTD_ORDERS}>
                        <i className={"fa fa-share"}/> &nbsp;
                        Ready to Dispatch
                    </Button>

                </ButtonGroup>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <Button color={"success"}
                        onClick={this.planVehicle.bind(this)}
                        disabled={title === DISPATCHED_ORDERS}>
                    <i className={"fa fa-rocket"}/> &nbsp;
                    Plan Vehicle
                </Button>
            </div>
        );

        const rightButtons = (props) => (
            <div style={{display: 'inline-block'}}>
                <Upload/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <Button color={"link"} onClick={() => {
                    refreshing();
                    getOrders();
                }}>
                    <i className={"fa fa-refresh"}/> &nbsp;
                    Refresh
                </Button>
            </div>
        );

        return (
            (
                <div>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"/>{title}
                            <small className="text-muted"/>
                            <span style={{float: 'right'}}>
                                {changing ? <BeatLoader/> : null}
                            </span>
                        </CardHeader>
                        <CardBody>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink href="/#/dashboard/orders"
                                             active={title === ALL_ORDERS}>{ALL_ORDERS}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/#/dashboard/orders/on-hold"
                                             active={title === ON_HOLD_ORDERS}>{ON_HOLD_ORDERS}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/#/dashboard/orders/ready-to-dispatch"
                                             active={title === RTD_ORDERS}>{RTD_ORDERS}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/#/dashboard/orders/dispatched"
                                             active={title === DISPATCHED_ORDERS}>{DISPATCHED_ORDERS}</NavLink>
                                </NavItem>
                            </Nav>
                            <DataTable
                                data={filterData(orders, hold, rtd, dispatched)}
                                loading={loading}
                                loaded={loaded}
                                columns={columns}
                                right={rightButtons}
                                left={leftButtons}
                                keyField={"id"}
                                select={{mode: "checkbox"}}
                                refPass={this.refPass.bind(this)}
                                {...props}
                            />
                        </CardBody>
                    </Card>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.data.orders.loading,
    loaded: state.data.orders.loaded,
    changing: state.data.orders.changing,
});

const mapDispatchToProps = (dispatch) => ({
    getOrders: () => dispatch(loadOrders()),
    markHold: (selected, redirect) => dispatch(markOrdersOnHold(selected, redirect)),
    markRTD: (selected, redirect) => dispatch(markOrdersRTD(selected, redirect)),
    planVehicle: (redirect) => dispatch(planVehiclesForOrders(redirect))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderTable));

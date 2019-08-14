import {lazy} from "react";
import {navToRoutes} from "../helpers/getRoutes";


const supplierNavigation = [];
const supplierRoutes = navToRoutes(supplierNavigation);


const shipperNavigation = [
    {
        url: '/dashboard',
        component: lazy(() => import('../screens/shipper/dashboard')),
        name: 'Dashboard',
        icon: 'cui-dashboard',
        badge: {
            variant: 'info',
            text: 'NEW',
        },
    },
    {
        title: true,
        name: 'Orders Management',
        wrapper: {
            element: '',
            attributes: {},
        },


    },

    {
        name: 'Orders Management',
        url: '/orders',
        icon: 'icon-puzzle',
        component: lazy(() => import('../screens/shipper/orderManagement/allOrders')),
        children: [
            {
                name: 'All Orders',
                component: lazy(() => import('../screens/shipper/orderManagement/allOrders')),

                url: '/orders',
                icon: 'icon-puzzle',
            },

            {
                name: 'Upload',
                component: lazy(() => import('../screens/shipper/orderManagement/upload')),
                url: '/orders/upload',
                icon: 'icon-puzzle',
            },

            {
                name: 'Orders on hold',
                component: lazy(() => import('../screens/shipper/orderManagement/holdOrders')),

                url: '/orders/on-hold',
                icon: 'icon-puzzle',
            },
            {
                name: 'Ready to Dispatch',
                component: lazy(() => import('../screens/shipper/orderManagement/rtdOrders')),

                url: '/orders/ready-to-dispatch',
                icon: 'icon-puzzle',
            },
            {
                name: 'Dispatched',
                component: lazy(() => import('../screens/shipper/orderManagement/dispatchedOrders')),

                url: '/orders/dispatched',
                icon: 'icon-puzzle',
            },

        ],
    },
    {
        name: 'Freight Management',
        url: '/freight',
        icon: 'icon-puzzle',

        children: [
            {
                name: 'Live Available Trucks',
                component: lazy(() => import('../screens/shipper/freightManagement/liveAvailableTrucks')),

                url: '/freight/live-available-trucks',
                icon: 'icon-puzzle',
            },
            {
                name: 'Assigned Trucks',
                component: lazy(() => import('../screens/shipper/freightManagement/assignedTrucks')),
                url: '/freight/assigned-trucks',
                icon: 'icon-puzzle',
            },

            {
                name: 'RFQ',
                component: lazy(() => import('../screens/shipper/freightManagement/RFQ')),

                url: '/freight/request-for-quotation',
                icon: 'icon-puzzle',
            },


        ],
    }
];
const shipperRoutes = navToRoutes(shipperNavigation);


export const getNavigations = category => {
    switch (category) {
        case 'supplier':
            return supplierNavigation;
        case 'shipper':
            return shipperNavigation;
        default:
            return []
    }
};

export const getRoutes = category => {
    switch (category) {
        case 'supplier':
            return supplierRoutes;
        case 'shipper':
            return shipperRoutes;
        default:
            return []
    }
};

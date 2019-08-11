import React, {lazy, Suspense, useEffect} from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import {checkUser} from "./actions/auth";


const HomeScreen = lazy(() => import('./screens/home'));
const SignInScreen = lazy(() => import('./screens/signInScreen'));
const SignUpScreen = lazy(() => import('./screens/signUpScreen'));
const DashboardScreen = lazy(() => import('./screens/dashboard'));
const NotFound404Screen = lazy(() => import('./screens/notFound404'));


const MainF = (props) => {

    useEffect(() => {
        props.checkUser()
    });

    return (
        <Router>
            <div className="App">
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path={"/"} component={HomeScreen}/>
                        <Route exact path="/sign-in/" component={SignInScreen}/>
                        <Route exact path="/sign-up/" component={SignUpScreen}/>
                        <Route path={'/dashboard/'} component={DashboardScreen} />
                        <Route component={NotFound404Screen} />
                    </Switch>
                </Suspense>
            </div>
        </Router>
    );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    checkUser: () => dispatch(checkUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainF);
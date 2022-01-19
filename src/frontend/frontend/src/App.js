import logo from './logo.svg';
import React, {Component} from "react";
import './App.css';
import Layout from "./hoc/Layout/Layout";
import {Route, Switch} from 'react-router-dom'
import NotFound from "./containers/NotFound";
import Results from "./containers/Results/Results";
import Cyclists from "./containers/Cyclists/Cyclists";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import DBCyclistsMain from "./containers/DB/Cyclists/DBCyclistsMain";
import DBTeamsMain from "./containers/DB/Teams/DBTeamsMain";
import Login from "./components/Login";
import AuthService from "./services/auth.service";


class App extends Component {

    state = {
        currentUser: undefined,
        showModeratorBoard: false
    }

    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            showModeratorBoard: false
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: true,
            });
        }
    }


    render() {
        console.log("APP")
        console.log(this.state)


        const routesModerator = (
            <Switch>
                <Route path="/DBCyclists" element={DBCyclistsMain}/>
                <Route path="/DBTeams" element={DBTeamsMain}/>
                <Route path="/results" element={Results}/>
                <Route path="/cyclists" element={Cyclists}/>
                <Route path="/" element={Results}/>
                <Route component={NotFound}/>
            </Switch>
        )

        const routesBasicUser = (
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route path="/DBCyclists" element={DBCyclistsMain}/>
                <Route path="/DBTeams" element={DBTeamsMain}/>
                <Route path="/results" element={Results}/>
                <Route path="/cyclists" element={Cyclists}/>
                <Route path="/" element={Results}/>
                <Route component={NotFound}/>
            </Switch>
        )


        return (
            <Layout>
                {this.state.showModeratorBoard ? routesModerator : routesBasicUser}
            </Layout>
        )
    }
}

export default App;

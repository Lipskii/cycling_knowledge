import logo from './logo.svg';
import React, {Component} from "react";
import './App.css';
import Layout from "./hoc/Layout/Layout";
import {Route, Routes} from 'react-router-dom';
import NotFound from "./containers/NotFound";
import Results from "./containers/Results/Results";
import Cyclists from "./containers/Cyclists/Cyclists";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import DBCyclistsMain from "./containers/DB/Cyclists/DBCyclistsMain";
import DBTeamsMain from "./containers/DB/Teams/DBTeamsMain";


class App extends Component {

  state = {
    currentUser: undefined,
    showModeratorBoard: true
  }

  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      showModeratorBoard: true
    };
  }

  componentDidMount() {
    //  const user = AuthService.getCurrentUser();
    //
    // if (user) {
    //   this.setState({
    //     currentUser: user,
    //     showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
    //   });
    // }
  }


  render() {
    console.log("APP")
    console.log(this.state)

    const routesModerator = (
        <Routes>
            <Route path="/DBCyclists" element={<DBCyclistsMain/>}/>
            <Route path="/DBTeams" element={<DBTeamsMain/>}/>
          <Route path="/results" element={<Results/>}/>
          <Route path="/cyclists" element={<Cyclists/>}/>
          <Route path="/" element={<Results/>}/>
          <Route component={<NotFound/>}/>
        </Routes>
    )

    const routesBasicUser = (
        <Routes>
          <Route path="/results" element={<Results/>}/>
            <Route path="/cyclists" element={<Cyclists/>}/>
          <Route  path="/" element={<Results/>}/>
          <Route element={<NotFound/>}/>
        </Routes>
    )

    return (
        <Layout>
          {this.state.showModeratorBoard ? routesModerator : routesBasicUser}
        </Layout>
    )
  }
}

export default App;

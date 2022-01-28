import React, {Component} from "react";
import axios from "axios";
import {Col, Row} from "react-bootstrap";
import SearchingField from "../Results/SearchingField";
import {Select} from "antd";
import RacesTable from "../Results/RacesTable";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import {StyledDivCentered1200} from "../../components/StyledComponents";
import TeamsTable from "./TeamsTable";

class SearchTeams extends Component {

    state = {
        countries: [],
        teamsLoading: true,
        filterCountryId: '',
        filterDivision: '',
        teams: [],
        pageLoading: true

    }


    componentDidMount() {
        axios.all([
            axios.get('/api/countries'),
            axios.get('/api/teams'),

        ])
            .then(axios.spread((countries, teams) => {
                this.setState({
                    countries: countries.data,
                    teams: teams.data,
                    teamsLoading: false,
                })
            }))
            .catch(error => console.log(error))
    }

    filter = () => {
        console.log(this.state)
        axios.all([
            axios.get('/api/teams?countryId=' + this.state.filterCountryId
                + "&division=" + this.state.filterDivision
            )
        ])
            .then(axios.spread((
                teams
            ) => {
                this.setState({
                    teams: teams.data
                })
            }))
            .catch(error => console.log(error))
            .finally(() => this.setState({
                teamsLoading: false,
            }))
    }

    render() {
        console.log(this.state)
        return (
            <Col>
                <Row>
                    <h3 style={{margin: "auto", marginBottom: "10px"}}>Search Teams</h3>
                </Row>


                <SearchingField
                    label={"Country:"}
                    placeholder={"Select country"}
                    defaultValue={"All countries"}
                    onChange={(id) => {
                        this.setState({
                            teamsLoading: true,
                            filterCountryId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All countries</Select.Option>
                    {this.state.countries.map(country =>
                        <Select.Option key={country.name} value={country.id}>
                            {country.name}
                        </Select.Option>)}
                </SearchingField>


                <SearchingField
                    label={"Division:"}
                    placeholder={"Select division"}
                    defaultValue={""}
                    onChange={(id) => {
                        this.setState({
                            teamsLoading: true,
                            filterDivision: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All Divisions</Select.Option>
                    <Select.Option value={"1"}>World Tour</Select.Option>
                    <Select.Option value={"2"}>Pro Teams</Select.Option>
                    <Select.Option value={"3"}>Continental Teams</Select.Option>
                </SearchingField>



                <Row style={{margin: "auto"}}>
                    {this.state.teams.length > 0 ? <TeamsTable
                        teams={this.state.teams}
                        teamsLoading={this.state.teamsLoading}
                    /> : <p style={{textAlign: "center"}}>No teams found</p>}
                </Row>


            </Col>
        )
    }
}

export default SearchTeams

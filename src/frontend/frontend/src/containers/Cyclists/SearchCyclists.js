import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import SearchingField from "../Results/SearchingField";
import {DatePicker, Select} from "antd";
import axios from "axios";
import CyclistsTable from "./CyclistsTable";

const {RangePicker} = DatePicker;

class SearchCyclists extends Component {

    state = {
        cyclists: [],
        cyclistsLoading: false,
        countries: [],
        countriesWithPeople: [],
        genders: [],
        teams: [],
        filterCountryId: '',
        filterGenderId: '',
        filterTeamId: '',
        filterYearAfter: '',
        filterYearBefore: ''
    }


    componentDidMount() {
        axios.all([
            axios.get('/api/countries'),
            axios.get('/api/countries?hasPeople=true'),
            axios.get('/api/genders'),
            axios.get('/api/teams'),
            axios.get('/api/cyclists')

        ])
            .then(axios.spread((countries, countriesWithPeople, genders, teams, cyclists) => {
                this.setState({
                    countries: countries.data,
                    countriesWithPeople: countriesWithPeople.data,
                    genders: genders.data,
                    teams: teams.data,
                    cyclists: cyclists.data
                })
            }))
            .catch(error => console.log(error))
    }

    filter = () => {
        console.log(this.state)
        axios.all([
            axios.get('/api/cyclists?countryId=' + this.state.filterCountryId
                + '&genderId=' + this.state.filterGenderId
                + '&teamId=' + this.state.filterTeamId
                + '&bornAfter=' + this.state.filterYearAfter
                + '&bornBefore=' + this.state.filterYearBefore
                )
        ])
            .then(axios.spread((
                cyclists,
            ) => {
                this.setState({
                    cyclists: cyclists.data
                })
            }))
            .catch(error => console.log(error))
            .finally(() => this.setState({
                pageLoading: false,
                cyclistsLoading: false
            }))
    }

    render() {
        console.log(this.state)
        return (
            <Col>
                <Row>
                    <h3 style={{margin: "auto", marginBottom: "10px"}}>Search Cyclists</h3>
                </Row>

                <SearchingField
                    label={"Country:"}
                    placeholder={"Select country"}
                    defaultValue={"All countries"}
                    onChange={(id) => {
                        this.setState({
                            cyclistsLoading: true,
                            filterCountryId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All countries</Select.Option>
                    {this.state.countriesWithPeople.map(country =>
                        <Select.Option key={country.name} value={country.id}>
                            {country.name}
                        </Select.Option>)}
                </SearchingField>

                <SearchingField
                    label={"Gender:"}
                    placeholder={"Select gender"}
                    defaultValue={""}
                    onChange={(id) => {
                        this.setState({
                            cyclistsLoading: true,
                            filterGenderId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>Male and Female</Select.Option>
                    {this.state.genders.map(gender =>
                        <Select.Option key={gender.id} value={gender.id}>
                            {gender.gender}
                        </Select.Option>)}
                </SearchingField>

                <SearchingField
                    label={"Team:"}
                    placeholder={"Select team"}
                    defaultValue={''}
                    onChange={(id) => {
                        this.setState({
                            cyclistsLoading: true,
                            filterTeamId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All teams</Select.Option>
                    {this.state.teams.map(team =>
                        <Select.Option key={team.id} value={team.id}>
                            {team.name}
                        </Select.Option>)}
                </SearchingField>


                <Row style={{marginBottom: "10px"}}>
                    <Col sm={2}>
                        <label>Born between:</label>
                    </Col>
                    <Col sm={10}>
                        <RangePicker
                            picker="year"
                            onChange={(e) => {

                                this.setState({
                                    cyclistsLoading: true,
                                    filterYearAfter: e[0]._d.toISOString().slice(0, 10),
                                    filterYearBefore: e[1]._d.toISOString().slice(0, 10)
                                }, () => this.filter())
                            }}
                        />
                    </Col>
                </Row>


                <Row>
                    {this.state.cyclists.length > 0 ? <CyclistsTable
                        cyclists={this.state.cyclists}
                        cyclistsLoading={this.state.cyclistsLoading}
                    /> : <p style={{textAlign: "center"}}>No cyclists found</p>}
                </Row>


            </Col>
        )
    }
}

export default SearchCyclists
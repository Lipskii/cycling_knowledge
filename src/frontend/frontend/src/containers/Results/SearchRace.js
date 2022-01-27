import {Col, Row} from "react-bootstrap";
import React, {Component} from "react";
import SearchingField from "./SearchingField";
import {DatePicker, Select} from "antd";
// import CompetitionsTable from "./CompetitionsTable";
import axios from "axios";
import RacesTable from "./RacesTable";


class SearchRace extends Component {

    state = {
        results: [],
        races: [],
        seasons: [],
        countries: [],
        categories: [],
        resultsLoading: true,
        filterCountryId: '',
        filterCategoryId: ''

    }


    componentDidMount() {
        axios.all([
            axios.get('/api/countries'),
            axios.get('/api/races'),
            axios.get('/api/categories'),
            axios.get('/api/seasons')

        ])
            .then(axios.spread((countries, races, categories, seasons) => {
                this.setState({
                    countries: countries.data,
                    races: races.data,
                    categories: categories.data,
                    seasons: seasons.data,
                    resultsLoading: false
                })
            }))
            .catch(error => console.log(error))
    }

    filter = () => {
        console.log(this.state)
        axios.all([
            axios.get('/api/races?countryId=' + this.state.filterCountryId
                + "&categoryId=" + this.state.filterCategoryId
                )
        ])
            .then(axios.spread((
                races
            ) => {
                this.setState({
                    races: races.data
                })
            }))
            .catch(error => console.log(error))
            .finally(() => this.setState({
                pageLoading: false,
            }))
    }

    render() {
        console.log(this.state)
        return (
            <Col>
                <Row>
                    <h3 style={{margin: "auto", marginBottom: "10px"}}>Search Races</h3>
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
                    {this.state.countries.map(country =>
                        <Select.Option key={country.name} value={country.id}>
                            {country.name}
                        </Select.Option>)}
                </SearchingField>


                <SearchingField
                    label={"Category:"}
                    placeholder={"Select category"}
                    defaultValue={"World Tour"}
                    onChange={(id) => {
                        this.setState({
                            resultsLoading: true,
                            filterCategoryId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All categories</Select.Option>
                    {this.state.categories.map(category =>
                        <Select.Option key={category.id} value={category.id}>
                            {category.name}
                        </Select.Option>)}
                </SearchingField>



                <Row style={{margin: "auto"}}>
                    {this.state.races.length > 0 ? <RacesTable
                        races={this.state.races}
                        racesLoading={this.state.racesLoading}
                    /> : <p style={{textAlign: "center"}}>No races found</p>}
                </Row>


            </Col>
        )
    }
}

export default SearchRace



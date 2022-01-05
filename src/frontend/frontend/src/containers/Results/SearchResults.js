import {Col, Row} from "react-bootstrap";
import React, {Component} from "react";
import SearchingField from "./SearchingField";
import {DatePicker, Select} from "antd";
// import CompetitionsTable from "./CompetitionsTable";
import axios from "axios";


class SearchResults extends Component {

    state = {
        competitions: [],
        resultsLoading: false,
        countries: [],
        filterCountryId: '',
        filterSeason: '',
        filterSeriesId: 9,
        filterSizeId: '',
        filterVenueId: '',
        series: [],
        sizes: [],
        venues: [],
    }


    componentDidMount() {
        this.setState({
            competitions: [],
            countries: [],
            series: [],
            sizes: [],
            venues: [],
        })
    }

    filter = () => {
        console.log(this.state)
        // axios.all([
        //     axios.get('/api/competitions?seriesMajorId=' + this.state.filterSeriesId
        //         + '&countryId=' + this.state.filterCountryId
        //         + '&venueId=' + this.state.filterVenueId
        //         + '&sizeOfHillId=' + this.state.filterSizeId
        //         + '&season=' + this.state.filterSeason
        //         ), //+ '?hasResults=true'
        //     axios.get('/api/venues?hasHills=true'
        //         + '&countryId='+ this.state.filterCountryId)
        // ])
        //     .then(axios.spread((
        //         competitionsData,
        //         venuesData
        //     ) => {
        //         this.setState({
        //             competitions:  competitionsData.data,
        //             competitionsLoading: false,
        //             venues: venuesData.data
        //         })
        //     }))
        //     .catch(error => console.log(error))
        //     .finally(() => this.setState({
        //         pageLoading: false,
        //     }))
    }

    render() {
        console.log(this.state)
        return (
            <Col>
                <Row>
                    <h3 style={{margin: "auto", marginBottom: "10px"}}>Search Results</h3>
                </Row>

                <SearchingField
                    label={"Category:"}
                    placeholder={"Select category"}
                    defaultValue={"World Tour"}
                    onChange={(id) => {
                        this.setState({
                            resultsLoading: true,
                            filterCategoriesId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All categories</Select.Option>
                    {this.state.series.map(category =>
                        <Select.Option key={category.id} value={category.id}>
                            {category.name}
                        </Select.Option>)}
                </SearchingField>

                <SearchingField
                    label={"Race:"}
                    placeholder={"Select race"}
                    defaultValue={''}
                    onChange={(id) => {
                        this.setState({
                            resultsLoading: true,
                            filterCountryId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All countries</Select.Option>
                    {this.state.countries.map(country =>
                        <Select.Option key={country.id} value={country.id}>
                            {country.name}
                        </Select.Option>)}
                </SearchingField>

                <SearchingField
                    key={this.state.venues}
                    label={"Organisation:"}
                    placeholder={"Select organisation"}
                    defaultValue={''}
                    onChange={(id) => {
                        this.setState({
                            resultsLoading: true,
                            filterVenueId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All organisations</Select.Option>
                    {this.state.venues.map(venue =>
                        <Select.Option key={venue.id} value={venue.id}>
                            {venue.name}, {venue.city.name}
                        </Select.Option>)}
                </SearchingField>

                <Row style={{marginBottom: "10px"}}>
                    <Col sm={2}>
                        <label>Season:</label>
                    </Col>
                    <Col sm={10}>
                        <DatePicker
                            picker="year"
                            placeholder={"Select season"}
                          //  defaultValue={'2021-01-01'}
                            onChange={(e) => {
                                console.log(e)
                                let year
                                if (e !== null) {
                                    year = e._d.getFullYear()
                                } else {
                                    year = ''
                                }
                                this.setState({
                                    resultsLoading: true,
                                    filterSeason: year
                                }, () => this.filter())
                            }}
                        />
                    </Col>
                </Row>


                {/*<Row style={{margin: "auto"}}>*/}
                {/*    {this.state.competitions.length > 0 ? <CompetitionsTable*/}
                {/*        competitions={this.state.competitions}*/}
                {/*        competitionsLoading={this.state.competitionsLoading}*/}
                {/*    /> : <p style={{textAlign: "center"}}>No competitions found</p>}*/}
                {/*</Row>*/}


            </Col>
        )
    }
}

export default SearchResults



import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import SearchingField from "../Results/SearchingField";
import {DatePicker, Select} from "antd";

const {RangePicker} = DatePicker;

class SearchCyclists extends Component {

    state = {
        competitions: [],
        cyclistsLoading: false,
        countries: [],
        filterCountryId: '',
        filterCountriesId: '',
        filterSeason: '',
        filterSeriesId: 9,
        filterSizeId: '',
        filterVenueId: '',
        genders: [],
        series: [],
        sizes: [],
        teams: [],
        venues: [],
    }


    componentDidMount() {
        this.setState({
            competitions: [],
            countries: [],
            genders: [],
            series: [],
            sizes: [],
            teams: [],
            venues: []
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
                    <h3 style={{margin: "auto", marginBottom: "10px"}}>Search Cyclists</h3>
                </Row>

                <SearchingField
                    label={"Country:"}
                    placeholder={"Select country"}
                    defaultValue={"All countries"}
                    onChange={(id) => {
                        this.setState({
                            cyclistsLoading: true,
                            filterCountriesId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All countries</Select.Option>
                    {this.state.series.map(country =>
                        <Select.Option key={country.id} value={country.id}>
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

                <SearchingField
                    label={"Status:"}
                    defaultValue={""}
                    placeholder={"Select status"}
                    onChange={(id) => {
                        this.setState({
                            cyclistsLoading: true,
                            filterActive: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>Active and retired</Select.Option>
                    <Select.Option value={true}>Active</Select.Option>
                    <Select.Option value={false}>Retired</Select.Option>
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

export default SearchCyclists
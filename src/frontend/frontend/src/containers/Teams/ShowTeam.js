import React, {Component} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import SearchingField from "../Results/SearchingField";
import {Select} from "antd";
import ResultsTable from "../Results/ResultsTable";
import Loader from "react-loader-spinner";
import CyclistsTable from "../Cyclists/CyclistsTable";
import TeamCyclistsTable from "./TeamCyclistsTable";

class ShowTeam extends Component {
    state = {
        team: '',
        cyclists: [],
        pageLoading: true,
        photos: [],
        resultsSeasons: [],
        filterSeasonId: '',
        cyclistsLoading: false,
    }


    componentDidMount() {
        axios.all([
            axios.get("/api/teams?id=" + this.props.match.params.team),
            axios.get("/api/seasons")
        ]).then(axios.spread((
            teamRes,
            seasonsRes
        ) => {
            this.setState({
                team: teamRes.data[0],
                cyclists: teamRes.data[0].teamCyclistSeasons,
                seasons: seasonsRes.data
            }, () => {

                this.loadPhoto('flags/' + this.state.team.country.code, 'teamFlag')


                //set flags and world cup starts
                // for (const result of this.state.cyclist.results) {
                //     this.loadPhoto('flags/' + result.stage.race.country.code, 'result_' + result.id)
                // }

                // this.setResultsSeasons()
                // this.filterResults(this.state.resultsSeasons[0])


                this.setState({
                    pageLoading: false,
                })
            })
        }))
            .catch(error => {
                console.log(error)
            })
    }

    filterCyclists = () => {
        console.log(this.state)
        axios.get("/api/teams/teamCyclistSeason?seasonId=" + this.state.filterSeasonId)
            .then(res => {
                console.log(res)
                this.setState({
                    cyclists: res.data
                })
            })
            .catch(e => console.log(e))
    }

    renderSwitch = (param) => {
        switch(parseInt(param)){
            case 1:
                return "World Tour";
            case 2:
                return "Pro Team";
            case 3:
                return "Continental Team";
            default:
                return "";
        }
    }


    loadPhoto = (code, element) => {
        if (code !== undefined) {
            import(`../../assets/${code}.png`)
                .then(res => {
                    let array = this.state.photos
                    array[element] = res.default
                    this.setState({
                        photos: array
                    })
                })
        }
    }

    render() {

        console.log(this.state)

        return (
            <div style={{marginLeft: "11%", marginRight: "11%", paddingBottom: "50px"}}>

                {this.state.pageLoading !== true ?
                    <Container fluid>
                        <Col>
                            <Row>
                                <h1 style={{marginBottom: "60px", width: "100%"}}>
                                    <img
                                        height={"100%"}
                                        className="mr-3"
                                        src={this.state.photos['teamFlag']}
                                        alt="Generic placeholder"
                                    /> {this.state.team.name} ({this.renderSwitch(this.state.team.division)})</h1>
                            </Row>
                        </Col>

                        <Col>

                            <SearchingField
                                label={"Season:"}
                                placeholder={"Select season"}
                                defaultValue={"Select season"}
                                onChange={(id) => {
                                    this.setState({
                                        cyclistsLoading: true,
                                        filterSeasonId: id
                                    }, () => this.filterCyclists())
                                }}
                            >
                                <Select.Option value={""}>All seasons</Select.Option>
                                {this.state.seasons.map(season =>
                                    <Select.Option key={season.season} value={season.id}>
                                        {season.season}
                                    </Select.Option>)}
                            </SearchingField>

                            <TeamCyclistsTable cyclists={this.state.cyclists}/>
                        </Col>


                    </Container>
                    :
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={80}
                        width={80}
                        style={{textAlign: 'center'}}
                    />}
            </div>
        )
    }

}

export default ShowTeam
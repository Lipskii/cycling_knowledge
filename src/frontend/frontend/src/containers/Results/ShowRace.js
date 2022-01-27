import React, {Component} from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import {Col, Container, Row, Tab, Table, Tabs} from "react-bootstrap";
import {Select} from "antd";
import SearchingField from "./SearchingField";
import ResultsTable from "./ResultsTable";


class ShowRace extends Component {
    state = {
        race: '',
        pageLoading: true,
        photos: [],
        resultsSeasons: [],
        filterSeasonId: '',
        filterStageId: '',
        results: [],
        seasons: [],
        stages: [],
    }


    componentDidMount() {
        axios.all([
            axios.get("/api/races?id=" + this.props.match.params.race),
            axios.get("/api/seasons")
        ]).then(axios.spread((
           raceRes,
           seasonsRes
        ) => {
            this.setState({
                race: raceRes.data[0],
                seasons: seasonsRes.data
            }, () => {

                this.loadPhoto('flags/' + this.state.race.country.code, 'raceFlag')


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

    filterResults = () => {
        axios.get("/api/results?stageId=" + this.state.filterStageId)
            .then(res => {
                console.log(res)
                this.setState({
                    results: res.data
                })
            })
            .catch(e => console.log(e))
    }

    filterStages = () => {
        axios.get("/api/stages?raceId=" + this.state.race.id +
        "&seasonId=" + this.state.filterSeasonId)
            .then(res => {
                console.log(res)
                this.setState({
                    stages: res.data
                })
            })
            .catch(e => console.log(e))
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

    setResultsSeasons = () => {
        for (const result of this.state.cyclist.results) {
            let array = this.state.resultsSeasons
            if (array.indexOf(result.stage.season.season) === -1) {
                array.push(result.stage.season.season)
                this.setState({
                    resultsSeasons: array.sort(function compareSeasons(a, b) {
                        return b - a
                    })
                })
            }
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
                                    src={this.state.photos['raceFlag']}
                                    alt="Generic placeholder"
                                /> {this.state.race.name} ({this.state.race.category.name})</h1>
                            </Row>
                        </Col>

                        <Col>

                            <SearchingField
                                label={"Season:"}
                                placeholder={"Select season"}
                                defaultValue={"Select season"}
                                onChange={(id) => {
                                    this.setState({
                                        resultsLoading: true,
                                        filterSeasonId: id
                                    }, () => this.filterStages())
                                }}
                            >
                                <Select.Option value={""} disabled>Select season</Select.Option>
                                {this.state.seasons.map(season =>
                                    <Select.Option key={season.season} value={season.id}>
                                        {season.season}
                                    </Select.Option>)}
                            </SearchingField>

                            <SearchingField
                                label={"Stage:"}
                                placeholder={"Select stage"}
                                defaultValue={"Select stage"}
                                disabled={!this.state.stages.length >0}
                                onChange={(id) => {
                                    this.setState({
                                        resultsLoading: true,
                                        filterStageId: id
                                    }, () => this.filterResults())
                                }}
                            >
                                <Select.Option value={""} disabled>Select stage</Select.Option>
                                {this.state.stages.map(stage =>
                                    <Select.Option key={stage.number} value={stage.id}>
                                        {parseInt(stage.number) === 0 ? <> GC </> : <>{stage.number}. {stage.startCity} - {stage.finishCity} ({stage.distance} km) </>}
                                    </Select.Option>)}
                            </SearchingField>

                            <ResultsTable results={this.state.results}/>
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

export default ShowRace


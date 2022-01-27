import React, {Component} from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import {Col, Container, Row, Tab, Table, Tabs} from "react-bootstrap";
import ShowCyclistResultsTable from "./ShowCyclistResultsTable";

class ShowCyclist extends Component {
    state = {
        cyclist: '',
        cyclistAge: '',
        pageLoading: true,
        photos: [],
        resultsSeasons: [],
        results: []
    }


    componentDidMount() {
        axios.all([
            axios.get("/api/cyclists?id=" + this.props.match.params.cyclist)
        ]).then(axios.spread((
           cyclistRes
        ) => {
            this.setState({
                cyclist: cyclistRes.data[0]
            }, () => {
                this.loadPhoto('flags/' + this.state.cyclist.person.country.code, 'cyclistFlag')


                //set flags and world cup starts
                for (const result of this.state.cyclist.results) {
                    this.loadPhoto('flags/' + result.stage.race.country.code, 'result_' + result.id)
                }

                this.setResultsSeasons()
                this.filterResults(this.state.resultsSeasons[0])

                //Calculate age
                let today = new Date(),
                    yearNow = today.getFullYear()
                let yearBorn = this.state.cyclist.person.dateOfBirth.slice(0, 4)

                this.setState({
                    cyclistAge: yearNow - yearBorn,
                    pageLoading: false,
                })
            })
        }))
            .catch(error => {
                console.log(error)
            })
    }

    filterResults = (season) => {
        const array = this.state.cyclist.results.filter(result => result.stage.season.season === season)
        this.setState({
            results: array
        })
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
                                    src={this.state.photos['cyclistFlag']}
                                    alt="Generic placeholder"
                                /> {this.state.cyclist.person.firstName} {this.state.cyclist.person.lastName}</h1>
                            </Row>
                        </Col>

                        <Col>
                            <Row>
                                {/*<img*/}
                                {/*    height={"150px"}*/}
                                {/*    className="mr-3"*/}
                                {/*    src={this.state.photos['jumperPhoto']}*/}
                                {/*    alt="Generic placeholder"*/}
                                {/*/>*/}
                                <img
                                    height={"150px"}
                                    className="mr-3"
                                    src={"http://localhost:8089/api/people/photo/" + this.state.cyclist.person.id}
                                    alt={"Generic placeholder"}
                                />
                                <Col style={{marginBottom: "10px"}}>
                                    <Row sm={1}>
                                        <Col>
                                            <b>Born: </b>
                                            {this.state.cyclist.person.dateOfBirth}
                                        </Col>
                                    </Row>
                                    {this.state.cyclistAge !== '' ?
                                        <Row sm={1}>
                                            <Col>
                                                <b>Age: </b> {this.state.cyclistAge}
                                            </Col>
                                        </Row> : null}
                                    <Row sm={1}>
                                        <Col>
                                            <b>Gender: </b>
                                            {this.state.cyclist.person.gender !== null ?
                                                <> {this.state.cyclist.person.gender.gender}</> : null}
                                        </Col>
                                    </Row>
                                    <Row sm={1}>
                                        <Col>
                                            <b>Teams: </b>
                                            {this.state.cyclist.teamCyclistSeasons.map(team => {
                                                return(
                                                    <ul>
                                                        {team.season.season}: {team.team.name}
                                                    </ul>
                                                )
                                            })}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>

                        <div style={{paddingTop: "20px"}}>
                            <Tabs
                                defaultActiveKey={this.state.resultsSeasons[0]}
                                onSelect={season => {
                                    this.filterResults(parseInt(season))
                                }}
                            >
                                {this.state.resultsSeasons.map(season => (
                                    <Tab eventKey={season} title={season}>
                                        <ShowCyclistResultsTable
                                            results={this.state.results}
                                            photos={this.state.photos}
                                        />
                                    </Tab>
                                ))}
                            </Tabs>
                        </div>

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

export default ShowCyclist


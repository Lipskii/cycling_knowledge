import Loader from "react-loader-spinner";
import {Accordion, Col, Container, Row} from "react-bootstrap";
import {Component} from "react";
import SearchRace from "./SearchRace";
import LatestResults from "./LatestResults";


class Results extends Component {
    state = {
        races: [],
        results: [],
        categories: [],
        countries: [],
        competitionsLoading: true,
        organisation: [],
        pageLoading: true,
    }
    componentDidMount() {
        this.setState({
                pageLoading: false
        })
    }

    render() {
        console.log(this.state)
        return (
            <div style={{marginLeft: "30px", paddingBottom: "10px"}}>
                {!this.state.pageLoading ? <Container fluid>
                    <Row>
                        <SearchRace/>
                    </Row>
                </Container> : <Loader
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

export default Results
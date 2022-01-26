import {Component} from "react";
import {Accordion, Col, Container, Row} from "react-bootstrap";
import SearchResults from "../Results/SearchResults";
import LatestResults from "../Results/LatestResults";
import Loader from "react-loader-spinner";
import SearchCyclists from "./SearchCyclists";

class Cyclists extends Component {
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
            <div style={{marginLeft: "30px", paddingBottom: "10px",marginRight: "30px"}}>
                {!this.state.pageLoading ? <Container fluid>
                    <Row>
                        <SearchCyclists/>
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

export default Cyclists
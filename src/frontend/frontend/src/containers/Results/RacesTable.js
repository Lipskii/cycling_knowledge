import {Pagination, Table} from "react-bootstrap";
import React, {useState} from "react";
import fisLogo from "../../assets/fis_logo.png";
import Loader from "react-loader-spinner";
import {LinkContainer} from "react-router-bootstrap";

const RacesTable = (props) => {
    const [activePage, setActivePage] = useState(1);


    return (
        <div style={{marginTop: "20px", width: "100%"}}>
            {props.competitionsLoading ?
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    style={{textAlign: 'center'}}
                /> :
                <div>
                    <h6>Found Races</h6>
                    <Table borderless hover striped size={"sm"}>
                        <tbody>
                        {props.races.map(race => {
                                return (
                                    <LinkContainer to={'/race/' + race.id} style={{cursor: "pointer"}}>
                                    <tr key={race.id} id={race.id}>
                                        <td><img
                                            alt={race.country.code}
                                            src={'./flags/' + race.country.code + '.png'}
                                            style={{
                                                height: "15px",
                                                marginRight: "5px"
                                            }}/>
                                        </td>
                                        <td>{race.category.name}</td>
                                        <td>{race.name}</td>

                                    </tr>
                                    </LinkContainer>
                                 )
                        })}
                        </tbody>
                    </Table>
                </div>
            }
        </div>


    )
}

export default RacesTable


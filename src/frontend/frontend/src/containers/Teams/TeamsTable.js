import React, {useState} from "react";
import Loader from "react-loader-spinner";
import {Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const TeamsTable = (props) => {
    const [activePage, setActivePage] = useState(1);

    const renderSwitch = (param) => {
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

    return (
        <div style={{marginTop: "20px", width: "100%"}}>
            {props.teamsLoading ?
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
                        {props.teams.map(team => {
                            return (
                                <LinkContainer to={'/team/' + team.id} style={{cursor: "pointer"}}>
                                    <tr key={team.id} id={team.id}>
                                        <td><img
                                            alt={team.country.code}
                                            src={'./flags/' + team.country.code + '.png'}
                                            style={{
                                                height: "15px",
                                                marginRight: "5px"
                                            }}/>
                                        </td>
                                        <td><b>{team.name}</b></td>
                                        <td>{renderSwitch(team.division)}</td>

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

export default TeamsTable
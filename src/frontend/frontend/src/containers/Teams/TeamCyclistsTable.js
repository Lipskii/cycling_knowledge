import {Table} from "react-bootstrap";
import React, {useState} from "react";
import ResultsTableAthleteData from "../Results/ResultsTableAthleteData";
import TeamTableCyclistData from "./TeamTableCyclistData";


const TeamCyclistsTable = (props) => {



    return (
        <div style={{marginTop: "20px", width: "100%"}}>

            {props.cyclists.length > 0 ? <Table bordered hover striped size={"sm"}>
                <tbody>
                {props.cyclists.map(cyclist => {
                        return (
                            <tr key={cyclist.id} id={cyclist.id}>
                                <TeamTableCyclistData cyclist={cyclist.cyclist}/>
                            </tr>
                        )
                }
                )}
                </tbody>
            </Table> : <small>Didn't found cyclists in that season</small>}


        </div>


    )
}

export default TeamCyclistsTable


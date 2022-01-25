import React, {useState} from "react";
import {Pagination, Table} from "react-bootstrap";
import {TableButton} from "../../../components/StyledComponents";
import DBCyclistsTeamModal from "./DBCyclistsTeamModal";


const DBCyclistsCyclistsTable = (props) => {

    const [showTeamsModal, setShowTeamsModal] = useState(false)


    return (
        <div>
            <Table bordered hover striped size={"sm"}>
                <thead>
                <tr>
                    <th>Cyclist</th>
                    <th>Gender</th>
                    <th>Birthdate</th>
                    <th>Country</th>
                    <th>Teams</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {props.cyclists.map(cyclist => {
                    if (((props.activePage - 1) * 15 <= props.cyclists.indexOf(cyclist)) && (props.cyclists.indexOf(cyclist) < props.activePage * 15)) {
                        return (
                            <tr key={cyclist.id} id={cyclist.id}>
                                <td>{cyclist.person.firstName} {cyclist.person.lastName}</td>
                                <td style={{textAlign: "center"}}>{cyclist.person.gender.gender}</td>
                                <td>{cyclist.person.dateOfBirth}</td>
                                <td>{cyclist.person.country.name}</td>
                                <td>
                                    {cyclist.teamCyclistSeasons.length > 0 ?
                                        <div>
                                            {cyclist.teamCyclistSeasons.map(teamCyclistSeason => {
                                                return (
                                                    <ul>
                                                        {teamCyclistSeason.season.season}: {teamCyclistSeason.team.name}
                                                    </ul>
                                                )
                                            })}
                                        </div> : null
                                    }
                                </td>

                                {/*<td>{cyclist.team !== null ? <div>{cyclist.team.name}</div> :*/}
                                {/*    <div>no info</div>}</td>*/}
                                <td>
                                    <TableButton id={cyclist.id} name={cyclist.name} size="sm"
                                                 variant={"info"}
                                                 onClick={() => {
                                                     let o = {...cyclist}
                                                     Object.keys(o)
                                                         .forEach(key => {
                                                             if (o[key] === null) {
                                                                 o[key] = ''
                                                             }
                                                         })
                                                     console.log(o)
                                                     props.onEditCyclist(o)
                                                 }}>
                                        Edit
                                    </TableButton>
                                    <TableButton id={cyclist.id} name={cyclist.person.lastName} size="sm"
                                                 variant={"outline-info"}
                                                 onClick={() => setShowTeamsModal(true)}>
                                        Edit Teams
                                    </TableButton>

                                    {showTeamsModal ? <DBCyclistsTeamModal
                                        teams={props.teams}
                                        seasons={props.seasons}
                                        show={showTeamsModal}
                                        cyclist={cyclist}
                                        filter={props.filter}
                                        mainHeader={"Adding teams for " + cyclist.person.lastName}
                                        onHide={() => {
                                            setShowTeamsModal(false)
                                            props.filter()
                                        }}
                                        /> : null}
                                    <TableButton id={cyclist.id} name={cyclist.person.lastName} size="sm"
                                                 variant={"danger"}
                                                 onClick={() => props.onDeleteCyclist(cyclist)}
                                    >
                                        Delete
                                    </TableButton>
                                </td>
                            </tr>
                        )
                    }
                })}


                </tbody>
            </Table>
            <Pagination>{props.items}</Pagination>
        </div>
    )

}

export default DBCyclistsCyclistsTable
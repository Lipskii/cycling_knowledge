import React, {useEffect} from "react";
import {Pagination, Table} from "react-bootstrap";
import {TableButton} from "../../../components/StyledComponents";


const DBTeamsTeamsTable = (props) => {


    useEffect(() => {
        console.log(props)
    },[props.teams])

    return (
        <div style={{marginTop: '30px'}}>
            <Table bordered hover striped size={"sm"}>
                <thead>
                <tr>
                    <th>Team</th>
                    <th>Code</th>
                    <th>Country</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {props.teams.map(team => {
                    if (((props.activePage - 1) * 15 <= props.teams.indexOf(team)) && (props.teams.indexOf(team) < props.activePage * 15)) {
                        return (
                            <tr key={team.id} id={team.id}>
                                <td>{team.name}</td>
                                <td>{team.code}</td>
                                <td>{team.country.name}</td>
                                <td>
                                    <TableButton id={team.id} name={team.name} size="sm"
                                                 variant={"info"}
                                                 onClick={() => {
                                                     let o = {...team}
                                                     Object.keys(o)
                                                         .forEach(key => {
                                                             if (o[key] === null) {
                                                                 o[key] = ''
                                                             }
                                                         })
                                                     console.log(o)
                                                     props.onEditTeam(o)
                                                 }}>
                                        Edit
                                    </TableButton>
                                    <TableButton id={team.id} name={team.name} size="sm"
                                                 variant={"danger"}
                                                 onClick={() => props.onDeleteTeam(team)}
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

export default DBTeamsTeamsTable
import React from "react";
import {Pagination, Table} from "react-bootstrap";
import {TableButton} from "../../../components/StyledComponents";


const DBCyclistsCyclistsTable = (props) => {

    return (
        <div>
            <Table bordered hover striped size={"sm"}>
                <thead>
                <tr>
                    <th>Cyclist</th>
                    <th>UCI Code</th>
                    <th>Gender</th>
                    <th>Birthdate</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Team</th>
                    <th>Active</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {props.cyclists.map(cyclist => {
                    if (((props.activePage - 1) * 15 <= props.cyclists.indexOf(cyclist)) && (props.cyclists.indexOf(cyclist) < props.state.activePage * 15)) {
                        return (
                            <tr key={cyclist.id} id={cyclist.id}>
                                <td>{cyclist.person.firstName} {cyclist.person.lastName}</td>
                                <td>{cyclist.uciCode}</td>
                                <td style={{textAlign: "center"}}>{cyclist.person.gender.gender.charAt(0)}</td>
                                <td>{cyclist.person.birthdate}</td>
                                <td>{cyclist.person.city !== null ?
                                    <div>{cyclist.person.city.name}</div> : <div>no info</div>}</td>
                                <td>{cyclist.person.country.code}</td>
                                <td>{cyclist.team !== null ? <div>{cyclist.team.name}</div> :
                                    <div>no info</div>}</td>
                                <td>{cyclist.active ? "Yes" : "No"}</td>
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
                                    <TableButton id={cyclist.id} name={cyclist.name} size="sm"
                                                 variant={"danger"}
                                                 onClick={props.onDeleteCyclist(cyclist)}
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
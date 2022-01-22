import React, {useEffect} from "react";
import {Pagination, TabContainer, Table} from "react-bootstrap";
import {TableButton} from "../../../components/StyledComponents";


const DBRacesRaceTable = (props) => {


    useEffect(() => {
        console.log(props)
    },[props.races])

    return (
        <div style={{marginTop: '30px'}}>
            <Table bordered hover striped size={"sm"}>
                <thead>
                <tr>
                    <th>Race</th>
                    <th>Country</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {props.races.map(race => {
                    if (((props.activePage - 1) * 15 <= props.races.indexOf(race)) && (props.races.indexOf(race) < props.activePage * 15)) {
                        return (
                            <tr key={race.id} id={race.id}>
                                <td>{race.name}</td>
                                <td>{race.country.name}</td>
                                <td>{race.category.name}</td>
                                <td>
                                    <TableButton id={race.id} name={race.name} size="sm"
                                                 variant={"info"}
                                                 onClick={() => {
                                                     let o = {...race}
                                                     Object.keys(o)
                                                         .forEach(key => {
                                                             if (o[key] === null) {
                                                                 o[key] = ''
                                                             }
                                                         })
                                                     console.log(o)
                                                     props.onEdit(o)
                                                 }}>
                                        Edit
                                    </TableButton>
                                    <TableButton id={race.id} name={race.name} size="sm"
                                                 variant={"info"}
                                                 onClick={() => props.editStages(race)}>
                                        Edit Stages
                                    </TableButton>
                                    <TableButton id={race.id} name={race.name} size="sm"
                                                 variant={"danger"}
                                                 onClick={() => props.onDelete(race)}
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

export default DBRacesRaceTable
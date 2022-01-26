import {Pagination, Table} from "react-bootstrap";
import React, {useState} from "react";
import {TableButton} from "../../components/StyledComponents";
import Loader from "react-loader-spinner";
import {LinkContainer} from "react-router-bootstrap";

const CyclistsTable = (props) => {
    const [activePage, setActivePage] = useState(1);

    const numOfCyclists = 30

    let items = [];
    let numberOfPages = props.cyclists.length / numOfCyclists
    if (props.cyclists.length % numOfCyclists !== 0) {
        numberOfPages++
    }

    for (let number = 1; number <= numberOfPages; number++) {
        items.push(
            <Pagination.Item key={number} id={number} active={number === activePage} onClick={e => {
                setActivePage(parseInt(e.target.id))
            }}>
                {number}
            </Pagination.Item>
        );
    }
    return (
        <div style={{marginTop: "20px", width: "100%"}}>
            {props.cyclistsLoading ?
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    style={{textAlign: 'center'}}
                /> :
                <div>
                    <h6>Found Cyclists:</h6>
                    <Table borderless hover striped size={"sm"} style={{textAlign: 'center'}}>
                      <thead>
                        <tr>
                        <th/>
                        <th/>
                        <th>Gender</th>
                        <th>Birthdate</th>
                        </tr>
                      </thead>
                        <tbody>
                        {props.cyclists.map(cyclist => {
                            if (((activePage - 1) * numOfCyclists <= props.cyclists.indexOf(cyclist)) && (props.cyclists.indexOf(cyclist) < activePage * numOfCyclists)) {
                                return (
                                    // <LinkContainer to={'/skiJumper/' + cyclist.id} style={{cursor: "pointer"}}>
                                        <tr key={cyclist.id} id={cyclist.id}>
                                            <td width={"10px"}><img
                                                alt={cyclist.person.country.code}
                                                src={'./flags/' + cyclist.person.country.code + '.png'}
                                                style={{
                                                    height: "15px",
                                                    marginRight: "5px"
                                                }}/></td>
                                            <td style={{textAlign: 'left'}}>{cyclist.person.firstName} {cyclist.person.lastName}</td>
                                            <td>{cyclist.person.gender.gender.charAt(0)}</td>
                                            <td>{cyclist.person.dateOfBirth}</td>
                                            <td>

                                                <TableButton id={cyclist.id + "tbEdit"}
                                                             name={cyclist.name}
                                                             size="sm"
                                                             variant={"outline-info"}
                                                >
                                                    Read more
                                                </TableButton>


                                            </td>
                                        </tr>
                                    // </LinkContainer>
                                )
                            }
                        })}
                        </tbody>
                    </Table>
                    <Pagination>{items}</Pagination>
                </div>
            }

        </div>


    )
}

export default CyclistsTable

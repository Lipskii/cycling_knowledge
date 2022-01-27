import {Table} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";


const ShowCyclistResultsTable = (props) => {

    return (
        <div style={{marginTop: "20px", width: "100%"}}>
            <Table borderless hover size={"sm"}>
                <th>Rank</th>
                <th>Date</th>
                <th>Race</th>
                <th>Stage</th>
                <tbody>
                {props.results.sort(
                    function compareResultsSeasons(a, b) {
                        return Date.parse(b.stage.date) - Date.parse(a.stage.date)
                    })
                    .map(result => (
                        <tr>

                            <td>{result.rank > 3 ?
                                <div>
                                    {result.rank !== 999 ? <div>{result.rank}.</div> : <div>DSQ</div>}
                                </div>
                                : <b>{result.rank}.</b>
                            }</td>

                            <td>
                                {result.stage.date}
                            </td>
                            <td>
                                <img
                                    height={24}
                                    className="mr-3"
                                    src={props.photos['result_' + result.id]}
                                    alt="Generic placeholder"/>
                                {/*<Link to={"/hill/" + result.competition.hillVersion.hill.id} style={{color: "black"}}>*/}
                                    {result.stage.race.name}
                                {/*</Link>*/}
                            </td>

                            <td>
                                {result.stage.number === 0 ? <><b>General Classification</b></> :
                                    <>{result.stage.number}. {result.stage.startCity} - {result.stage.finishCity} ({result.stage.distance} km)</>}


                            </td>





                            {/*<td>{result.totalRank > 3 ?*/}
                            {/*    <div>*/}
                            {/*        {result.totalRank !== 999 ? <div>{result.totalRank}.</div> : <div>DSQ</div>}*/}
                            {/*    </div>*/}
                            {/*    : <b>{result.totalRank}.</b>*/}
                            {/*}</td>*/}
                            {/*<td>{result.competition.date1}</td>*/}
                            {/*<td><a href={"/showResults/" + result.competition.id}*/}
                            {/*       style={{color: "black"}}> {result.competition*/}
                            {/*    .seriesMajor.name} {result.competition.seriesMinor !== null ? <small>*/}
                            {/*    ({result.competition.seriesMinor.name})</small> : null}*/}
                            {/*</a></td>*/}

                            {/*{result.firstRoundDistance !== null && result.firstRoundDistance !== 0 ?*/}
                            {/*    <td>*/}
                            {/*        {result.firstRoundDistance} m*/}
                            {/*    </td> : <td>-</td>}*/}

                            {/*{result.secondRoundDistance !== null && result.secondRoundDistance !== 0 ?*/}
                            {/*    <td>*/}
                            {/*        {result.secondRoundDistance} m*/}
                            {/*    </td> : <td>-</td>}*/}

                            {/*{result.thirdRoundDistance !== null && result.thirdRoundDistance !== 0 ?*/}
                            {/*    <td>*/}
                            {/*        {result.thirdRoundDistance} m*/}
                            {/*    </td> : null }*/}

                            {/*{result.fourthRoundDistance !== null && result.fourthRoundDistance !== 0 ?*/}
                            {/*    <td>*/}
                            {/*        {result.fourthRoundDistance} m*/}
                            {/*    </td> : null}*/}

                            {/*{result.totalPoints !== null ?*/}
                            {/*    <td>*/}
                            {/*        <b>*/}
                            {/*            {result.totalPoints !== 0 ? <div>{result.totalPoints} p.</div> : <div>DSQ</div>}*/}
                            {/*        </b>*/}
                            {/*    </td> : null}*/}
                        </tr>
                    ))}
                </tbody>

            </Table>
        </div>


    )
}

export default ShowCyclistResultsTable


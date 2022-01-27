import {Table} from "react-bootstrap";
import React, {useState} from "react";
import ResultsTableAthleteData from "./ResultsTableAthleteData";


const ResultsTable = (props) => {

     const secondsToHms = (d) => {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " h " : " h ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " m " : " m ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
        return hDisplay + mDisplay + sDisplay;
    }

    let bestTime
    if (props.results.length > 0) {
        bestTime = props.results[0].time
    }
    return (
        <div style={{marginTop: "20px", width: "100%"}}>

            {props.results.length > 0 ? <Table bordered hover striped size={"sm"}>
                <th style={{width: "15px", textAlign: "center"}}>Rank</th>
                <th/>
                <th>Time</th>
                <th>Difference</th>
                <tbody>
                {props.results.map(result => {
                    const difference = secondsToHms(result.time - bestTime)
                        return (
                            <tr key={result.id} id={result.id}>
                                <td><b>{result.rank} .</b></td>

                                <ResultsTableAthleteData result={result}/>
                                <td>{secondsToHms(result.time)}</td>
                                <td>
                                    {parseInt(difference) > 0 ? <>
                                        + {difference}
                                    </>
                                    : null }
                                </td>
                            </tr>
                        )
                }
                )}
                </tbody>
            </Table> : <small>No results yet</small>}


        </div>


    )
}

export default ResultsTable


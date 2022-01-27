import React, {useEffect, useState} from "react";

const ResultsTableAthleteData = (props) => {

    const [flag, setFlag] = useState('')

    useEffect(() => {
        import(`../../assets/flags/${props.result.cyclist.person.country.code}.png`)
            .then(res => {
                setFlag(res.default)
            })
    })


    return (
        <td style={{textAlign: "left"}}>
            <img
                className="mr-3"
                src={flag}
                alt={props.result.cyclist.person.country.code}
            /> <a
            href={'/cyclist/' + props.result.cyclist.id}
            style={{color: "black"}}
        > {props.result.cyclist.person.firstName} {props.result.cyclist.person.lastName} </a>
        </td>
    )
}

export default ResultsTableAthleteData
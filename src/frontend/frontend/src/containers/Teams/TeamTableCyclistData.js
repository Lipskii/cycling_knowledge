import React, {useEffect, useState} from "react";

const TeamTableCyclistData = (props) => {

    const [flag, setFlag] = useState('')

    useEffect(() => {
        import(`../../assets/flags/${props.cyclist.person.country.code}.png`)
            .then(res => {
                setFlag(res.default)
            })
    })


    return (
        <>
        <td style={{textAlign: "left"}}>
            <img
                className="mr-3"
                src={flag}
                alt={props.cyclist.person.country.code}
            /> <a
            href={'/cyclist/' + props.cyclist.id}
            style={{color: "black"}}
        > {props.cyclist.person.firstName} {props.cyclist.person.lastName} </a>
        </td>
        <td>{props.cyclist.person.dateOfBirth}</td>
        </>
    )
}

export default TeamTableCyclistData
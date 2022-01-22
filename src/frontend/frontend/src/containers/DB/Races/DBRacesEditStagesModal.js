import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Header3, TableButton} from "../../../components/StyledComponents";
import {DBRacesStageModal} from "./DBRacesStageModal";
import DBRacesRaceForm from "./DBRacesRaceForm";
import axios from "axios";

export const DBRacesEditStagesModal = (props) => {

    const [showNewStageModal, setShowNewStageModal] = useState(false)
    const [seasons, setSeasons] = useState()

    useEffect(() => {
        axios.get("/api/seasons")
            .then(response => {
                setSeasons(response.data)
            })
            .catch(error => console.log(error))
    },[props])



    return (
        <Modal show={props.show} size={"xl"} scrollable={true} onHide={props.onHide}>

            {/*<DBRacesStageModal*/}
            {/*    show={showNewStageModal}*/}
            {/*    onHide={() => setShowNewStageModal(false)}*/}
            {/*    // onSubmit={(values) => {*/}
            {/*    //     this.setState({*/}
            {/*    //         showAddingModal: true*/}
            {/*    //     }, () => this.postRace(values))*/}
            {/*    // }}*/}
            {/*    initialFinishCity={''}*/}
            {/*    initialDate={''}*/}
            {/*    initialDistance={''}*/}
            {/*    initialNumber={''}*/}
            {/*    initialSeason={''}*/}
            {/*    initialStartCity={''}*/}
            {/*    mainHeader={"Adding new Stage"}*/}
            {/*    />*/}

            <Modal.Header closeButton>
                <Header3>Edit Stages of {props.race.name}</Header3>
            </Modal.Header>
            <Modal.Body>
                Stages:
                {props.race.stages.length > 0 ?
                    <>
                        {props.race.stages.map(stage => {
                            <ul>{stage.startCity}</ul>
                        })}
                    </> : null}
            </Modal.Body>
            <Modal.Footer>
                <Button id={props.race.id} name={props.race.name} size="sm"
                        variant={"success"}
                        onClick={() => setShowNewStageModal(true)}>
                    Add stage
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
import {Button, Modal, Pagination, Table} from "react-bootstrap";
import React, {Component, useEffect, useState} from "react";
import {Header3, StyledDiv2Right1200, StyledDivCentered1200, TableButton} from "../../../components/StyledComponents";
import {DBRacesStageModal} from "./DBRacesStageModal";
import DBRacesRaceForm from "./DBRacesRaceForm";
import axios from "axios";
import AddingModal from "../../../components/CommonModals/AddingModal";
import CompletedModal from "../../../components/CommonModals/CompletedModal";
import DeleteModal from "../../../components/CommonModals/DeleteModal";
import SelectInputForm from "../../../components/CommonForms/SelectInputForm";
import Loader from "react-loader-spinner";
import DBRacesRaceTable from "./DBRacesRaceTable";

class DBRacesEditStagesModal extends Component {
    state = {
        showNewStageModal: false,
        seasons: [],
        race: this.props.race,
        showCompletedModal: false,
        completedModalStatus: false,
        completedModalText: '',
        showAddingModal: false,
        showDeleteModal: false
    }

    componentDidMount() {
        axios.get("/api/seasons")
            .then(res => {
                this.setState({
                    seasons: res.data
                })
            })
    }

    updateRace = () =>{
        axios.get("/api/races?id=" + this.state.race.id)
            .then(res => {
                this.setState({
                    race: res.data[0]
                })
            })
    }

    editStage = (stage) => {
        console.log(this.state)
        let successful = false
        this.setState({
            showAddingModal: true
        }, () => {
            axios.put('/api/races/' + this.state.raceToEdit.id, {
                name: values.name,
                country: this.state.countries.find(country => country.id === parseInt(values.countryId)),
                category: this.state.categories.find(category => category.id === parseInt(values.categoryId))
            })
                .then(res => {
                    successful = true
                    this.filter()
                })
                .catch(error => console.log(error))
                .finally(() => {
                    let modalText
                    if (successful) {
                        modalText = values.name + " edited."
                    } else {
                        modalText = "Ups, there was a problem. Try again."
                    }
                    this.setState({
                        showCompletedModal: true,
                        completedModalText: modalText,
                        completedModalStatus: successful,
                        showAddingModal: false,
                        editRace: !successful
                    })
                })
        })
    }

    deleteStage = (stage) => {
        axios.delete("/api/stages/" + stage.id)
            .then(res => console.log(res))
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({
                    showDeleteModal: false,
                }, () => this.updateRace())
            })
    }

    postStage = (values) => {
        let successful = false
        this.setState({
            showAddingModal: true
        }, () => {
            axios.post('/api/stages', {
                number: values.number,
                date: values.date,
                race: this.props.race,
                season: this.state.seasons.find(season => season.id === parseInt(values.seasonId)),
                startCity: values.startCity,
                finishCity: values.finishCity,
                distance: values.distance
            })
                .then(res => {
                    successful = true
                    console.log(res)
                    this.updateRace()
                })
                .catch(error => console.log(error))
                .finally(() => {
                    let modalText
                    if (successful) {
                        modalText = values.name + " added."
                    } else {
                        modalText = "Ups, there was a problem. Try again."
                    }
                    this.setState({
                        showCompletedModal: true,
                        completedModalText: modalText,
                        completedModalStatus: successful,
                        showAddingModal: false
                    })
                })
        })

    }

    render() {
        console.log(this.state)
        console.log(this.state.race.stages)
        return (
            <Modal show={this.props.show} size={"xl"} scrollable={true} onHide={this.props.onHide}>

                <AddingModal show={this.state.showAddingModal}/>

                <CompletedModal
                    show={this.state.showCompletedModal}
                    text={this.state.completedModalText}
                    onHide={() => {
                        this.setState({
                            showCompletedModal: false
                        })
                    }}
                    status={this.state.completedModalStatus}
                />

                {this.state.showDeleteModal ?
                    <DeleteModal
                        show={this.state.showDeleteModal}
                        onHide={() => this.setState({
                            showDeleteModal: false,
                            stageToDelete: ''
                        })}
                        title={this.state.stageToDelete.name}
                        handleDelete={this.deleteStage}
                    /> : null}


                <DBRacesStageModal
                    show={this.state.showNewStageModal}
                    onHide={() => {
                        this.setState({
                            showNewStageModal: false
                        })
                    }}
                    onSubmit={ (values) => {
                        this.setState({
                            showNewStageModal: true,
                        },() => {
                            this.postStage(values)
                        })
                    }}
                    initialFinishCity={''}
                    initialDate={''}
                    initialDistance={''}
                    initialNumber={''}
                    initialSeasonId={''}
                    initialStartCity={''}
                    seasons={this.state.seasons}
                    mainHeader={"Adding new Stage"}
                />

                <Modal.Header closeButton>
                    <Header3>Edit Stages of {this.state.race.name}</Header3>
                </Modal.Header>
                <Modal.Body>
                    Stages:
                    <div>
                            <Table bordered hover striped size={"sm"}>
                                <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Start</th>
                                    <th>Finish</th>
                                    <th>Distance</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.race.stages.map(stage =>
                                         (
                                            <tr key={stage.id} id={stage.id}>
                                                <td>{stage.number}</td>
                                                <td>{stage.startCity}</td>
                                                <td>{stage.finishCity}</td>
                                                <td>{stage.distance} km</td>
                                                <td>
                                                    <TableButton id={stage.id} name={stage.id} size="sm"
                                                                 variant={"outline-info"}
                                                                 onClick={() => this.editStage(stage)}>
                                                        Edit Stage
                                                    </TableButton>
                                                    <TableButton id={stage.id} name={stage.id} size="sm"
                                                                 variant={"danger"}
                                                                 onClick={() => {
                                                                     this.setState({
                                                                         showDeleteModal: false
                                                                     },() => this.deleteStage(stage))
                                                                 }}
                                                    >
                                                        Delete Stage
                                                    </TableButton>
                                                    {/*<TableButton id={stage.id} name={stage.name} size="sm"*/}

                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button id={this.state.race.id} name={this.state.race.name} size="sm"
                            variant={"success"}
                            onClick={() => {
                                this.setState({
                                    showNewStageModal: true
                                })
                            }}>
                        Add stage
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default DBRacesEditStagesModal

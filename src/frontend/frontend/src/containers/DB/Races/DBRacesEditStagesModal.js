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
import moment from "moment";
import DBRacesStageAddResultsModal from "./DBRacesStageAddResultsModal";
import DBCyclistsTeamModal from "../Cyclists/DBCyclistsTeamModal";

class DBRacesEditStagesModal extends Component {
    state = {
        newStage: false,
        editStage: false,
        editStageId: '',
        seasons: [],
        race: this.props.race,
        showCompletedModal: false,
        completedModalStatus: false,
        completedModalText: '',
        showAddingModal: false,
        showDeleteModal: false,
        initialFinishCity: '',
        initialDate: '',
        initialDistance: '',
        initialNumber: '',
        initialSeasonId: '',
        initialStartCity: '',
        stages: [],
        showResultsModal: false
    }


    componentDidMount() {
        axios.get("/api/seasons")
            .then(res => {
                this.setState({
                    stages: this.props.race.stages,
                    seasons: res.data
                })
            })
    }

    updateRace = () =>{
        axios.get("/api/races?id=" + this.state.race.id)
            .then(res => {
                this.setState({
                    race: res.data[0],
                    stages: res.data[0].stages
                })
            })
    }

    filterSeasons(seasonId) {
        if(seasonId === ""){
            this.setState({
                stages: this.state.race.stages
            })
        } else {
            this.setState({
                stages: this.state.race.stages.filter(stage => parseInt(stage.season.id) === parseInt(seasonId))
            })
        }
    }

    editStage = (stage) => {
        console.log("ELO")
        console.log(stage)
        let successful = false
        this.setState({
            showAddingModal: true,
        }, () => {
            axios.put('/api/stages/' + this.state.editStageId, {
                number: stage.number,
                date: stage.date,
                race: this.props.race,
                season: this.state.seasons.find(season => season.id === parseInt(stage.seasonId)),
                startCity: stage.startCity,
                finishCity: stage.finishCity,
                distance: stage.distance
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
                        modalText = stage.startCity + "-" + stage.finishCity + " edited."
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
            showAddingModal: true,
            editStage: true
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
                        modalText = values.startCity + "-" + values.finishCity + " added."
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


                {this.state.newStage ?
                    <DBRacesStageModal
                        show={this.state.newStage}
                        onHide={() => {
                            this.setState({
                                newStage: false
                            })
                        }}
                        onSubmit={ (values) => {
                            this.setState({
                                newStage: true,
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
                    : null}

                {this.state.editStage ?
                    <DBRacesStageModal
                        show={this.editStage}
                        onHide={() => {
                            this.setState({
                                editStage: false
                            })
                        }}
                        onSubmit={ (values) => {
                            this.setState({
                                editStage: true,
                            },() => {
                                this.editStage(values)
                            })
                        }}
                        initialFinishCity={this.state.initialFinishCity}
                        initialDate={this.state.initialDate}
                        initialDistance={this.state.initialDistance}
                        initialNumber={this.state.initialNumber}
                        initialSeasonId={this.state.initialSeasonId}
                        initialStartCity={this.state.initialStartCity}
                        seasons={this.state.seasons}
                        mainHeader={"Adding new Stage"}
                    />
                    : null}

                <Modal.Header closeButton>
                    <Header3>Edit Stages of {this.state.race.name}</Header3>
                </Modal.Header>
                <Modal.Body>
                    <h3> Stages:</h3>

                    <div style={{marginBottom: "20px", marginTop: "20px"}}>
                    <SelectInputForm
                        title={"Season"}
                        defaultValue={""}
                        onChange={e => {
                           this.filterSeasons(e.target.value)
                        }}
                    >
                        <option value={""}>All seasons</option>
                        {this.state.seasons.map(season =>
                            <option key={season.id} value={season.id}>
                                {season.season}
                            </option>)}
                    </SelectInputForm>
                    </div>
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
                                {this.state.stages.map(stage =>
                                         (
                                            <tr key={stage.id} id={stage.id}>
                                                <td>{stage.number}</td>
                                                <td>{stage.startCity}</td>
                                                <td>{stage.finishCity}</td>
                                                <td>{stage.distance} km</td>
                                                <td>
                                                    <TableButton id={stage.id} name={stage.id} size="sm"
                                                                 variant={"outline-info"}
                                                                 onClick={() => {
                                                                     this.setState({
                                                                         initialFinishCity: stage.finishCity,
                                                                         initialDate: moment(stage.date),
                                                                         initialDistance: stage.distance,
                                                                         initialNumber: stage.number,
                                                                         initialSeasonId: stage.season.id,
                                                                         initialStartCity: stage.startCity,
                                                                         editStageId: stage.id
                                                                     },() => {
                                                                         console.log(this.state)
                                                                         this.setState({
                                                                             editStage: true
                                                                         })
                                                                     })
                                                                 }}>
                                                        Edit Stage
                                                    </TableButton>
                                                    <TableButton id={stage.id} name={stage.id} size="sm"
                                                                 variant={"outline-success"}
                                                                 onClick={() => {
                                                                     this.setState({
                                                                         showResultsModal: true
                                                                     })
                                                                 }}
                                                    >
                                                        Add results
                                                    </TableButton>

                                                    {this.state.showResultsModal ?
                                                    <DBRacesStageAddResultsModal
                                                        show={this.state.showResultsModal}
                                                        stage={stage}
                                                        filter={this.props.filter}
                                                        mainHeader={"Adding results"}
                                                        onHide={() => {
                                                            this.setState({
                                                                showResultsModal: false
                                                            },() => this.props.filter())
                                                        }}
                                                        /> : null}
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
                                    initialFinishCity: '',
                                    initialDate: '',
                                    initialDistance: '',
                                    initialNumber: '',
                                    initialSeasonId: '',
                                    initialStartCity: '',
                                    newStage: true,
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

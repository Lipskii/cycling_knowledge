import React, {Component} from "react";
import {Form, Formik} from "formik";
import {DBRacesStageValidationSchema} from "../Races/DBRacesStageValidationSchema";
import {Button, Modal} from "react-bootstrap";
import {Header3, StyledDiv2Right1200, TableButton} from "../../../components/StyledComponents";
import FormikTextInputForm from "../../../components/CommonForms/FormikTextInputForm";
import {FormikDatePicker} from "../../../components/CommonForms/FormikDatePicker";
import FormikSelectInputForm from "../../../components/CommonForms/FormikSelectInputForm";
import {DBCyclistsTeamValidationSchema} from "./DBCyclistsTeamValidationSchema";
import axios from "axios";
import AddingModal from "../../../components/CommonModals/AddingModal";
import CompletedModal from "../../../components/CommonModals/CompletedModal";
import DeleteModal from "../../../components/CommonModals/DeleteModal";


class DBCyclistsTeamModal extends Component {
    state = {
        showCompletedModal: false,
        completedModalStatus: false,
        completedModalText: '',
        showAddingModal: false,
        showDeleteModal: false,
    }


    componentDidMount() {

    }

    deleteTeamSeason = (values) => {
        axios.delete("/api/cyclists/teamSeason/" + values.id)
            .then(res => console.log(res))
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({
                    showDeleteModal: false,
                }, () => this.props.filter())
            })
    }

    submit = (values) => {
        let successful = false
        axios.post('/api/cyclists/teamSeason', {
            team: this.props.teams.find(team => team.id === parseInt(values.teamId)),
            season: this.props.seasons.find(season => season.id === parseInt(values.seasonId)),
            cyclist: this.props.cyclist
        })
            .then(res => {
                successful = true
                console.log(res)
                this.props.filter()
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
    }

    render() {
        return (
            <React.Fragment>

                <Formik
                    isInitialValid={false}
                    initialValues={{
                        seasonId: '',
                        teamId: '',
                    }}
                    validationSchema={DBCyclistsTeamValidationSchema}
                    onSubmit={(values) => {
                        this.submit(values)
                    }}
                >{({
                       handleSubmit
                   }) => (
                    <Modal show={this.props.show} size={"xl"} scrollable={true} onHide={this.props.onHide}>

                        <AddingModal show={this.state.showAddingModal}/>

                        <CompletedModal
                            show={this.state.showCompletedModal}
                            text={this.state.completedModalText}
                            onHide={() => this.setState({
                                showCompletedModal: false,
                                completedModalText: ""
                            })}
                            status={this.state.completedModalStatus}
                        />

                        {/*{this.state.showDeleteModal ?*/}
                        {/*    <DeleteModal*/}
                        {/*        show={this.state.showDeleteModal}*/}
                        {/*        onHide={() => this.setState({*/}
                        {/*            showDeleteModal: false,*/}
                        {/*            teamToDelete: ''*/}
                        {/*        })}*/}
                        {/*        title={this.state.teamToDelete.name}*/}
                        {/*        handleDelete={this.deleteTeamSeason}*/}
                        {/*    /> : null}*/}

                        <Form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSubmit()
                            }}
                        >
                            <Modal.Header closeButton>
                                <Header3>{this.props.mainHeader}</Header3>
                            </Modal.Header>
                            <Modal.Body>

                                <h5>Teams</h5>
                                {this.props.cyclist.teamCyclistSeasons.map(teamCyclistSeason => {
                                    return (
                                        <ul>
                                            {teamCyclistSeason.season.season}: {teamCyclistSeason.team.name}
                                            <Button id={teamCyclistSeason.id} name={teamCyclistSeason.id} size="sm"
                                                          variant={"link"}
                                                         onClick={() => this.deleteTeamSeason(teamCyclistSeason)}
                                            >
                                                Delete
                                            </Button>
                                        </ul>
                                    )
                                })}

                                <small>Fields with (*) are mandatory</small>

                                <FormikSelectInputForm
                                    key={this.props.seasons}
                                    name="seasonId"
                                    label="Season*:"
                                    // disabled={props.countries.length < 1}
                                >
                                    <option value={""} disabled>Choose...</option>
                                    {this.props.seasons.map(season => (
                                        <option key={season.id} value={season.id}>{season.season}</option>
                                    ))}
                                </FormikSelectInputForm>

                                <FormikSelectInputForm
                                    key={this.props.teams}
                                    name="teamId"
                                    label="Team*:"
                                >
                                    <option value={""} disabled>Choose...</option>
                                    {this.props.teams.map(team => (
                                        <option key={team.id} value={team.id}>{team.name}</option>
                                    ))}
                                </FormikSelectInputForm>


                                <StyledDiv2Right1200>
                                    <Button type={"submit"}>Submit</Button>
                                </StyledDiv2Right1200>

                            </Modal.Body>
                        </Form>
                    </Modal>
                )}
                </Formik>

            </React.Fragment>
        )
    }

}

export default DBCyclistsTeamModal
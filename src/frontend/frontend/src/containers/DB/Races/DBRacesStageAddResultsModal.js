import React, {Component} from "react";
import axios from "axios";
import {Form, Formik} from "formik";
import {DBCyclistsTeamValidationSchema} from "../Cyclists/DBCyclistsTeamValidationSchema";
import {Button, Modal} from "react-bootstrap";
import AddingModal from "../../../components/CommonModals/AddingModal";
import CompletedModal from "../../../components/CommonModals/CompletedModal";
import {Header3, StyledDiv2Right1200} from "../../../components/StyledComponents";
import FormikSelectInputForm from "../../../components/CommonForms/FormikSelectInputForm";
import {DBRacesStageResultsValidationSchema} from "./DBRacesStageResultsValidationSchema";
import FormikTextInputForm from "../../../components/CommonForms/FormikTextInputForm";

class DBRacesStageAddResultsModal extends Component {
    state = {
        showCompletedModal: false,
        completedModalStatus: false,
        completedModalText: '',
        showAddingModal: false,
        showDeleteModal: false,
    }


    componentDidMount() {

    }

    delete = (values) => {
        // axios.delete("/api/cyclists/teamSeason/" + values.id)
        //     .then(res => console.log(res))
        //     .catch(error => console.log(error))
        //     .finally(() => {
        //         this.setState({
        //             showDeleteModal: false,
        //         }, () => this.props.filter())
        //     })
    }

    submit = (values) => {
        // let successful = false
        // axios.post('/api/cyclists/teamSeason', {
        //     team: this.props.teams.find(team => team.id === parseInt(values.teamId)),
        //     season: this.props.seasons.find(season => season.id === parseInt(values.seasonId)),
        //     cyclist: this.props.cyclist
        // })
        //     .then(res => {
        //         successful = true
        //         console.log(res)
        //         this.props.filter()
        //     })
        //     .catch(error => console.log(error))
        //     .finally(() => {
        //         let modalText
        //         if (successful) {
        //             modalText = values.name + " added."
        //         } else {
        //             modalText = "Ups, there was a problem. Try again."
        //         }
        //         this.setState({
        //             showCompletedModal: true,
        //             completedModalText: modalText,
        //             completedModalStatus: successful,
        //             showAddingModal: false
        //         })
        //     })
    }

    render() {
        return (
            <React.Fragment>

                <Formik
                    isInitialValid={false}
                    initialValues={{
                       time: '',
                        rank: '',
                    }}
                    validationSchema={DBRacesStageResultsValidationSchema}
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
                                {this.props.stage.results.map(result => {
                                    return (
                                        <ul>
                                            elo
                                            <Button id={result.id} name={result.id} size="sm"
                                                    variant={"link"}
                                                    onClick={() => this.delete(result)}
                                            >
                                                Delete
                                            </Button>
                                        </ul>
                                    )
                                })}

                                <small>Fields with (*) are mandatory</small>

                                <FormikTextInputForm
                                    name="rank"
                                    label="Rank*:"
                                />

                                <FormikTextInputForm
                                    name="time"
                                    label="Time*:"
                                />

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

export default DBRacesStageAddResultsModal
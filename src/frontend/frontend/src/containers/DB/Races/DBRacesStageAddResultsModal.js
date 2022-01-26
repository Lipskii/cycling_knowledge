import React, {Component} from "react";
import axios from "axios";
import {Form, Formik} from "formik";
import {DBCyclistsTeamValidationSchema} from "../Cyclists/DBCyclistsTeamValidationSchema";
import {Button, Modal, Table} from "react-bootstrap";
import AddingModal from "../../../components/CommonModals/AddingModal";
import CompletedModal from "../../../components/CommonModals/CompletedModal";
import {Header3, StyledDiv2Right1200, TableButton} from "../../../components/StyledComponents";
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
        results: [],
    }


    componentDidMount() {
        console.log("ELO")
        console.log(this.state)
        console.log(this.props)
        this.updateResults()
    }

    delete = (values) => {
        axios.delete("/api/results/" + values.id)
            .then(res => this.updateResults())
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({
                    showDeleteModal: false,
                })
            })
    }

    updateResults = () => {
        axios.get("/api/results?stageId=" + this.props.stage.id)
            .then(res => {
                this.setState({
                    results: res.data
                })
            })
            .catch(e => console.log(e))
    }

    submit = (values) => {
        let successful = false
        axios.post('/api/results', {
            rank: values.rank,
            time: values.time,
            stage: this.props.stage,
            cyclist: this.props.cyclists.find(cyclist => cyclist.id === parseInt(values.cyclistId))
        })
            .then(res => {
                successful = true
                console.log(res)
                this.updateResults()
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
                        time: '',
                        rank: '',
                        cyclistId: ''
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

                                <small>Fields with (*) are mandatory</small>

                                <FormikTextInputForm
                                    name="rank"
                                    label="Rank*:"
                                />

                                <FormikSelectInputForm
                                    key={this.props.cyclists}
                                    name="cyclistId"
                                    label="Cyclist*:"
                                >
                                    <option value={""} disabled>Choose...</option>
                                    {this.props.cyclists.map(cyclist => (
                                        <option key={cyclist.id} value={cyclist.id}>
                                            {cyclist.person.firstName} {cyclist.person.lastName}
                                        </option>
                                    ))}
                                </FormikSelectInputForm>

                                <FormikTextInputForm
                                    name="time"
                                    label="Time*:"
                                />



                                <StyledDiv2Right1200>
                                    <Button type={"submit"}>Submit</Button>
                                </StyledDiv2Right1200>

                                <h5>Results:</h5>
                                {this.state.results.length > 0 ?
                                    <div>
                                        <Table>

                                                <thead>
                                                    <tr>
                                                    <td>Rank</td>
                                                    <td>Cyclist</td>
                                                    <td>Time (s)</td>
                                                    </tr>
                                                </thead>
                                        {this.state.results.map(result => {
                                            if(result !== undefined){
                                                return (
                                                        <tbody>
                                                        <td>
                                                            {result.rank}.
                                                        </td>
                                                        <td>
                                                            {result.cyclist.person.firstName} {result.cyclist.person.lastName}
                                                        </td>
                                                        <td>
                                                            {result.time}
                                                        </td>
                                                        <td>
                                                            <TableButton id={result.id} name={result.id} size="sm"
                                                                         variant={"link"}
                                                                         onClick={() => this.delete(result)}
                                                            >
                                                                Delete
                                                            </TableButton>
                                                        </td>
                                                        </tbody>

                                                )
                                            } else {
                                                return(
                                                    <div>No results yet</div>
                                                )
                                            }

                                        })}
                                        </Table>
                                    </div> : null
                                }



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
import React, {useState} from "react";
import {Form, Formik} from "formik";
import {DBTeamsTeamValidationSchema} from "../Teams/DBTeamsTeamValidationSchema";
import {Button, Modal} from "react-bootstrap";
import {Header3, StyledDiv2Right1200} from "../../../components/StyledComponents";
import FormikTextInputForm from "../../../components/CommonForms/FormikTextInputForm";
import FormikSelectInputForm from "../../../components/CommonForms/FormikSelectInputForm";
import {FormikDatePicker} from "../../../components/CommonForms/FormikDatePicker";
import {DBRacesStageValidationSchema} from "./DBRacesStageValidationSchema";

export const DBRacesStageModal = (props) => {

    return (
        <React.Fragment>
            <Formik
                isInitialValid={false}
                initialValues={{
                    number: props.initialNumber,
                    date: props.initialDate,
                    seasonId: props.initialSeasonId,
                    startCity: props.initialStartCity,
                    finishCity: props.initialFinishCity,
                    distance: props.initialDistance
                }}
                validationSchema={DBRacesStageValidationSchema}
                onSubmit={(values) => {
                    props.onSubmit(values)
                }}
            >{({
                   handleSubmit
               }) => (
                <Modal show={props.show} size={"xl"} scrollable={true} onHide={props.onHide}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}
                    >
                        <Modal.Header closeButton>
                            <Header3>{props.mainHeader}</Header3>
                        </Modal.Header>
                        <Modal.Body>

                            <small>Fields with (*) are mandatory</small>

                            <FormikTextInputForm
                                name="number"
                                label="Number*:"
                            />

                            <FormikDatePicker
                                name="date"
                                label={"Date*:"}
                                style={{width: '150px'}}
                            />

                            <FormikSelectInputForm
                                key={props.seasons}
                                name="seasonId"
                                label="Season*:"
                                // disabled={props.countries.length < 1}
                            >
                                <option value={""} disabled>Choose...</option>
                                {props.seasons.map(season => (
                                    <option key={season.id} value={season.id}>{season.season}</option>
                                ))}
                            </FormikSelectInputForm>

                            <FormikTextInputForm
                                name="startCity"
                                label="Start:"
                            />

                            <FormikTextInputForm
                                name="finishCity"
                                label="Finish:"
                            />

                            <FormikTextInputForm
                                name="distance"
                                label="Distance (km):"
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
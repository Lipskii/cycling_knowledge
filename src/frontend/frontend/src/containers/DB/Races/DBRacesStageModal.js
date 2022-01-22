import React, {useState} from "react";
import {Form, Formik} from "formik";
import {DBTeamsTeamValidationSchema} from "../Teams/DBTeamsTeamValidationSchema";
import {Button, Modal} from "react-bootstrap";
import {Header3, StyledDiv2Right1200} from "../../../components/StyledComponents";
import FormikTextInputForm from "../../../components/CommonForms/FormikTextInputForm";
import FormikSelectInputForm from "../../../components/CommonForms/FormikSelectInputForm";
import {FormikDatePicker} from "../../../components/CommonForms/FormikDatePicker";

export const DBRacesStageModal = (props) => {

    return (
        <React.Fragment>
            <Formik
                isInitialValid={false}
                initialValues={{
                    number: props.initialNumber,
                    date: props.initialDate,
                    season: props.initialSeason,
                    startCity: props.initialStartCity,
                    finishCity: props.initialFinishCity,
                    distance: props.initialDistance

                }}
                validationSchema={DBTeamsTeamValidationSchema}
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
                            />

                            {/*<FormikSelectInputForm*/}
                            {/*    key={countries}*/}
                            {/*    name="countryId"*/}
                            {/*    label="Country*:"*/}
                            {/*    // disabled={props.countries.length < 1}*/}
                            {/*>*/}
                            {/*    <option value={""} disabled>Choose...</option>*/}
                            {/*    {countries.map(country => (*/}
                            {/*        <option key={country.id} value={country.id}>{country.name}</option>*/}
                            {/*    ))}*/}
                            {/*</FormikSelectInputForm>*/}

                            <FormikSelectInputForm
                                // key={countries}
                                name="division"
                                label="Division*:"
                            >
                                <option value={""} disabled>Choose...</option>
                                <option value={"1"}>World Tour</option>
                                <option value={"2"}>Pro Teams</option>
                                <option value={"3"}>Continental Teams</option>
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
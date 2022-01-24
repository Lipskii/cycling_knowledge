import React, {useEffect, useState} from "react";
import {ErrorLabel, Header3, StyledDiv2Right1200} from "../../../components/StyledComponents";
import bsCustomFileInput from 'bs-custom-file-input';
import FormikTextInputForm from "../../../components/CommonForms/FormikTextInputForm";
import FormikSelectInputForm from "../../../components/CommonForms/FormikSelectInputForm";
import {Field, Formik} from "formik";
import axios from "axios";
import NewCityModal from "../../../components/CommonModals/NewCityModal";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {FormikDatePicker} from "../../../components/CommonForms/FormikDatePicker";
import {DBRacesRaceValidationSchema} from "../Races/DBRacesRaceValidationSchema";
import {DBCyclistsValidationSchema} from "./DBCyclistValidationSchema";

const DBNewCyclistForm = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [countries, setCountries] = useState(props.countries)
    const [teams, setTeams] = useState(props.teams)
    const [genders, setGenders] = useState(props.genders)
    return (
        <React.Fragment>
            <Formik
                isInitialValid={false}
                initialValues={{
                    firstName: props.firstName,
                    lastName: props.lastName,
                    dateOfBirth: props.dateOfBirth,
                    gender: props.genderId,
                    countryId: props.countryId,
                }}
                validationSchema={DBCyclistsValidationSchema}
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
                                name="firstName"
                                label="First Name*:"
                            />

                            <FormikTextInputForm
                                name="lastName"
                                label="Last Name*:"
                            />

                            <FormikDatePicker
                                name="dateOfBirth"
                                label={"Date of Birth*:"}
                                style={{width: '150px'}}
                            />

                            <FormikSelectInputForm
                                key={countries}
                                name="countryId"
                                label="Country*:"
                                // disabled={props.countries.length < 1}
                            >
                                <option value={""} disabled>Choose...</option>
                                {countries.map(country => (
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                ))}
                            </FormikSelectInputForm>

                            <FormikSelectInputForm
                                key={"gender"}
                                name="genderId"
                                label="Gender*:"
                            >
                                <option value={""} disabled>Choose...</option>
                                {genders.map(gender => (
                                    <option key={gender.id} value={gender.id}>{gender.gender}</option>
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

export default DBNewCyclistForm
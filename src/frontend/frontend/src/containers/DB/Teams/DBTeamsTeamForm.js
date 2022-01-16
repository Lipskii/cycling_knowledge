import React, {useState} from "react";
import {Form, Formik} from "formik";
import NewCityModal from "../../../components/Modals/NewCityModal";
import {Header3, StyledDiv2Right1200} from "../../../components/StyledComponents";
import {Button, Modal} from "react-bootstrap";
import FormikTextInputForm from "../../../components/CommonForms/FormikTextInputForm";
import FormikSelectInputForm from "../../../components/CommonForms/FormikSelectInputForm";
import SelectInputForm from "../../../components/CommonForms/SelectInputForm";
import axios from "axios";
import {DBTeamsTeamValidationSchema} from "./DBTeamsTeamValidationSchema";


const DBTeamsTeamForm = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [countries, setCountries] = useState(props.countries)

    return (
        <React.Fragment>
            <Formik
                isInitialValid={false}
                initialValues={{
                    name: props.initialName,
                    countryId: props.initialCountryId,
                    code: props.initialCode,
                    division: props.initialDivision
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
                                name="name"
                                label="Name*:"
                            />

                            <FormikTextInputForm
                                name="code"
                                label="Code*:"
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

export default DBTeamsTeamForm
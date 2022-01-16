import React, {Component} from "react";
import axios from "axios";
import {Button, Pagination} from "react-bootstrap";
import AddingModal from "../../../components/Modals/AddingModal";
import CompletedModal from "../../../components/Modals/CompletedModal";
import {Header3, StyledDiv2Right1200, StyledDivCentered1200} from "../../../components/StyledComponents";
import SelectInputForm from "../../../components/CommonForms/SelectInputForm";
import Loader from "react-loader-spinner";
import DBCyclistsCyclistsTable from "../Cyclists/DBCyclistsCyclistsTable";
import * as PropTypes from "prop-types";
import DBTeamsTeamsTable from "./DBTeamsTeamsTable";
import DBTeamsTeamForm from "./DBTeamsTeamForm";
import DeleteModal from "../../../components/Modals/DeleteModal";

class DBTeamsMain extends Component {

    state = {
        countries: [],
        editTeam: false,
        newTeam: false,
        showAddingModal: false,
        showCompletedModal: false,
        showDeleteModal: false,
        teams: [],
        teamsLoading: true,
        teamToDelete: '',
        teamToEdit: '',
    }

    componentDidMount() {
        axios.all([
            axios.get("/api/countries"),
            axios.get("/api/teams")
        ]).then(axios.spread((countries,teams)=> {
            this.setState({
                countries: countries.data,
                teams: teams.data,
                teamsLoading: false,
            })
        }))
            .catch(error => console.log(error))
    }

    editTeam = (values) => {

    }

    deleteTeam = () => {
        axios.delete("/api/teams/" + this.state.teamToDelete.id)
            .then(res => console.log(res))
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({
                    showDeleteModal: false,
                }, () => this.filter())
            })
    }

    postTeam = (values) => {
        console.log("ANCZIX")
        console.log(values)
        let successful = false
        axios.post('/api/teams', {
            name: values.name,
            country: this.state.countries.find(country => country.id === parseInt(values.countryId))
        })
            .then(res => {
                successful = true
                console.log(res)
                this.filter()
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

    filter = () => {
        this.setState({
            teamsLoading: false
        })
    }

    render() {
        console.log(this.state)

        let items = [];
        let numberOfPages = this.state.teams.length / 15
        if (this.state.teams.length % 15 !== 0) {
            numberOfPages++
        }

        for (let number = 1; number <= numberOfPages; number++) {
            items.push(
                <Pagination.Item key={number} id={number} active={number === this.state.activePage} onClick={e => {
                    this.setState({
                        activePage: parseInt(e.target.id)
                    })
                }}>
                    {number}
                </Pagination.Item>
            );
        }


        return (
            <React.Fragment>
                <AddingModal show={this.state.showAddingModal}/>

                <CompletedModal
                    show={this.state.showCompletedModal}
                    text={this.state.completedModalText}
                    onHide={() => this.setState({
                        showCompletedModal: false,
                        completedModalText: ""
                    }, () => this.filter())}
                    status={this.state.completedModalStatus}
                />

                {this.state.showDeleteModal ?
                    <DeleteModal
                        show={this.state.showDeleteModal}
                        onHide={() => this.setState({
                            showDeleteModal: false,
                            teamToDelete: ''
                        })}
                        title={this.state.teamToDelete.name}
                        handleDelete={this.deleteTeam}
                    /> : null}


                <Header3>Teams</Header3>

                <StyledDivCentered1200>

                    {/*Select Country*/}
                    <strong>Filter</strong>
                    <SelectInputForm
                        title={"Country"}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                teamsLoading: true,
                                filterCityId: '',
                                filterClubId: '',
                                filterCountryId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All countries</option>
                        {this.state.countries.map(countries =>
                            <option key={countries.id} value={countries.id}>
                                {countries.name}
                            </option>)}
                    </SelectInputForm>

                    <SelectInputForm
                        title={"Division:"}
                        defaultValue={"1"}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                filterDivisionId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={"1"}>World Tour</option>
                        <option value={"2"}>Pro Teams</option>
                        <option value={"3"}>Continental Teams</option>
                    </SelectInputForm>

                    {this.state.teamsLoading ?
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={80}
                            width={80}
                            style={{textAlign: 'center'}}
                        />
                        :
                        null
                    }

                    {this.state.teams.length > 0 ? <DBTeamsTeamsTable
                        activePage={this.state.activePage}
                        teams={this.state.teams}
                        items={items}
                        onDeleteTeam={team => {
                            this.setState({
                                showDeleteModal: true,
                                teamToDelete: team
                            })}
                        }
                        onEditTeam={o => {
                            this.setState({
                                teamToEdit: o,
                                editTeam: true,
                            })
                        }}

                    /> : <p style={{textAlign: "center"}}>No teams found</p>}
                </StyledDivCentered1200>

                <StyledDiv2Right1200>
                    <Button onClick={() => this.setState({
                        newTeam: true,
                    })} variant={"success"}>New Team</Button>
                </StyledDiv2Right1200>

                {this.state.newTeam ?
                    <DBTeamsTeamForm
                        show={this.state.newTeam}
                        onHide={() => this.setState({
                            newTeam: false
                        })}
                        onSubmit={(values) => {
                            this.setState({
                                showAddingModal: true
                            }, () => this.postTeam(values))
                        }}
                        initialName={''}
                        initialCountryId={''}
                        initialCode={''}
                        initialDivision={''}
                        countries={this.state.countries}
                        mainHeader={"Adding new team"}
                    />
                    : null}

                {this.state.editTeam ?
                    <DBTeamsTeamForm
                        show={this.state.editTeam}
                        onHide={() => this.setState({
                            editTeam: false
                        })}
                        onSubmit={(values) => {
                            this.setState({
                                showAddingModal: true
                            }, () => this.editTeam(values))
                        }}
                        initialName={this.state.teamToEdit.name}
                        initialCountryId={this.state.teamToEdit.name.countryId}
                        initialCode={this.state.teamToEdit.name.code}
                        initialDivision={this.state.teamToEdit.division}
                        countries={this.state.countries}
                        mainHeader={"Editing team"}
                    />
                    : null}


            </React.Fragment>
        )
    }

}



export default DBTeamsMain
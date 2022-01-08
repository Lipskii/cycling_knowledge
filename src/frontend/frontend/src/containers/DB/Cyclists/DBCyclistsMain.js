import React, {Component} from "react";
import axios from "axios";
import {Button, Pagination, Table} from "react-bootstrap";
import AddingModal from "../../../components/Modals/AddingModal";
import CompletedModal from "../../../components/Modals/CompletedModal";
import DeleteModal from "../../../components/Modals/DeleteModal";
import {Header3, StyledDiv2Right1200, StyledDivCentered1200, TableButton} from "../../../components/StyledComponents";
import SelectInputForm from "../../../components/CommonForms/SelectInputForm";
import Loader from "react-loader-spinner";
import DBCyclistsCyclistsTable from "./DBCyclistsCyclistsTable";
import DBNewCyclistForm from "./DBNewCyclistForm";

class DBCyclistsMain extends Component {

    state = {
        activePage: 1,
        citiesWithCyclists: [],
        completedModalStatus: true,
        completedModalText: "",
        countriesWithCyclists: [],
        cyclists: [],
        cyclistsLoading: false,
        cyclistToDelete: '',
        cyclistToEdit: '',
        filterCityId: '',
        filterCountryId: '',
        filterGenderId: '',
        filterTeamId: '',
        genders: [],
        newCyclist: false,
        showAddingModal: false,
        showDeleteModal: false,
        showCompletedModal: false,
        teams: []
    }

    componentDidMount() {

    }

    editAthlete = (values) => {

    }

    deleteAthlete = () => {

    }

    postAthlete = (values) => {

    }

    filter = () => {

    }

    render() {
        console.log(this.state)

        let items = [];
        let numberOfPages = this.state.cyclists.length / 15
        if (this.state.cyclists.length % 15 !== 0) {
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

                {/*{this.state.showDeleteModal ?*/}
                {/*    <DeleteModal*/}
                {/*        show={this.state.showDeleteModal}*/}
                {/*        onHide={() => this.setState({*/}
                {/*            showDeleteModal: false,*/}
                {/*            athleteToDelete: ''*/}
                {/*        })}*/}
                {/*        title={this.state.athleteToDelete.person.firstName + " " + this.state.athleteToDelete.person.lastName}*/}
                {/*        handleDelete={this.deleteAthlete}*/}
                {/*    /> : null}*/}


                <Header3>Cyclists</Header3>

                <StyledDivCentered1200>

                    {/*Select Country*/}
                    <strong>Filter</strong>
                    <SelectInputForm
                        title={"Country"}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                cyclistsLoading: true,
                                filterCityId: '',
                                filterClubId: '',
                                filterCountryId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All countries</option>
                        {this.state.countriesWithCyclists.map(country =>
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>)}
                    </SelectInputForm>

                    {/*gender*/}
                    <SelectInputForm
                        title={"Gender:"}
                        disabled={this.state.genders.length < 1}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                filterGenderId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All genders</option>
                        {this.state.genders.map(gender => (
                            <option key={gender.id} value={gender.id}>{gender.gender}</option>
                        ))}
                    </SelectInputForm>

                    {/*City*/}
                    <SelectInputForm
                        key={this.state.citiesWithCyclists}
                        title={"City:"}
                        disabled={this.state.citiesWithCyclists.length < 1}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                filterCityId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All cities</option>
                        {this.state.citiesWithCyclists.map(city => (
                            <option key={city.id} value={city.id} name={city.name}>{city.name}</option>
                        ))}
                    </SelectInputForm>

                    {/*Teams*/}
                    <SelectInputForm
                        title={"Team:"}
                        disabled={this.state.teams.length < 1}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                filterTeamId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All teams</option>
                        {this.state.teams.map(club => (
                            <option key={club.id} value={club.id} name={club.name}>{club.name}</option>
                        ))}
                    </SelectInputForm>

                    {/*athletes*/}
                    {this.state.cyclistsLoading ?
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={80}
                            width={80}
                            style={{textAlign: 'center'}}
                        />
                        :
                        <DBCyclistsCyclistsTable
                            activePage={this.state.activePage}
                            cyclists={this.state.cyclists}
                            items={items}
                            onDeleteCyclist={cyclist => {
                                this.setState({
                                        showDeleteModal: true,
                                        cyclistToDelete: cyclist
                                    })}
                            }
                            onEditCyclist={o => {
                                this.setState({
                                    cyclistToEdit: o,
                                    editCyclist: true,
                                })
                            }}

                        />
                    }
                </StyledDivCentered1200>

                <StyledDiv2Right1200>
                    <Button onClick={() => this.setState({
                        newCyclist: true,
                    })} variant={"success"}>New Athlete</Button>
                </StyledDiv2Right1200>

                {/*{this.state.newCyclist ?*/}
                {/*    <DBNewCyclistForm*/}
                {/*        show={this.state.newCyclist}*/}
                {/*        onHide={() => this.setState({*/}
                {/*            newCyclist: false*/}
                {/*        })}*/}
                {/*        initialActive={true}*/}
                {/*        initialBirthdate={''}*/}
                {/*        initialTeamId={''}*/}
                {/*        initialCountryId={''}*/}
                {/*        initialCityId={''}*/}
                {/*        initialFisCode={''}*/}
                {/*        initialFirstName={''}*/}
                {/*        initialGenderId={''}*/}
                {/*        initialLastName={''}*/}
                {/*        initialSkisId={''}*/}
                {/*        mainHeader={"Adding new athlete"}*/}
                {/*        cities={this.state.citiesForForm}*/}
                {/*        clubs={this.state.clubsForForm}*/}
                {/*        countries={this.state.countries}*/}
                {/*        currentCountry={this.state.currentCountry}*/}
                {/*        genders={this.state.genders}*/}
                {/*        skis={this.state.skis}*/}
                {/*        isEdit={false}*/}
                {/*        onSubmit={(values) => {*/}
                {/*            this.setState({*/}
                {/*                showAddingModal: true*/}
                {/*            }, () => this.postAthlete(values))*/}
                {/*        }}*/}
                {/*    />*/}
                {/*    : null}*/}


                {/*{this.state.editAthlete ? <AthletesForm*/}
                {/*        show={this.state.editAthlete}*/}
                {/*        onHide={() => this.setState({*/}
                {/*            editAthlete: false*/}
                {/*        })}*/}
                {/*        initialActive={this.state.athleteToEdit.isActive}*/}
                {/*        initialBirthdate={moment(this.state.athleteToEdit.person.birthdate)}*/}
                {/*        initialClubId={this.state.athleteToEdit.skiClub.id}*/}
                {/*        initialCountryId={this.state.athleteToEdit.person.country.id}*/}
                {/*        initialCityId={this.state.athleteToEdit.person.city.id}*/}
                {/*        initialGenderId={this.state.athleteToEdit.person.gender.id}*/}
                {/*        initialFisCode={this.state.athleteToEdit.fisCode}*/}
                {/*        initialFirstName={this.state.athleteToEdit.person.firstName}*/}
                {/*        initialLastName={this.state.athleteToEdit.person.lastName}*/}
                {/*        initialSkisId={this.state.athleteToEdit.skis.id}*/}
                {/*        mainHeader={"Editing " + this.state.athleteToEdit.person.firstName + " " + this.state.athleteToEdit.person.lastName}*/}
                {/*        cities={this.state.citiesForForm}*/}
                {/*        clubs={this.state.clubsForForm}*/}
                {/*        countries={this.state.countries}*/}
                {/*        currentCountry={this.state.currentCountry}*/}
                {/*        genders={this.state.genders}*/}
                {/*        skis={this.state.skis}*/}
                {/*        isEdit={true}*/}
                {/*        onSubmit={(values) => {*/}
                {/*            this.setState({*/}
                {/*                showAddingModal: true*/}
                {/*            }, () => this.editAthlete(values))*/}
                {/*        }}*/}
                {/*    />*/}
                {/*    : null}*/}

            </React.Fragment>
        )
    }

}


export default DBCyclistsMain
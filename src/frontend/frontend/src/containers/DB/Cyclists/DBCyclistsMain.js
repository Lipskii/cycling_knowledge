import React, {Component} from "react";
import axios from "axios";
import {Button, Pagination, Table} from "react-bootstrap";
import AddingModal from "../../../components/CommonModals/AddingModal";
import CompletedModal from "../../../components/CommonModals/CompletedModal";
import DeleteModal from "../../../components/CommonModals/DeleteModal";
import {Header3, StyledDiv2Right1200, StyledDivCentered1200, TableButton} from "../../../components/StyledComponents";
import SelectInputForm from "../../../components/CommonForms/SelectInputForm";
import Loader from "react-loader-spinner";
import DBCyclistsCyclistsTable from "./DBCyclistsCyclistsTable";
import DBNewCyclistForm from "./DBNewCyclistForm";

class DBCyclistsMain extends Component {

    state = {
        activePage: 1,
        citiesWithCyclists: [],
        cities: [],
        completedModalStatus: false,
        completedModalText: "",
        countriesWithCyclists: [],
        cyclists: [],
        cyclistsLoading: true,
        cyclistToDelete: '',
        cyclistToEdit: '',
        countries: [],
        filterCityId: '',
        filterCountryId: '',
        filterGenderId: '',
        filterTeamId: '',
        filterIsActive: '',
        genders: [],
        newCyclist: false,
        showAddingModal: false,
        showDeleteModal: false,
        showCompletedModal: false,
        teams: []
    }

    componentDidMount() {
        axios.all([
            axios.get('/api/cyclists'),
            axios.get('/api/countries'),
            axios.get('/api/countries?hasPeople=true'),
            axios.get('/api/cities'),
            axios.get('/api/genders'),
            axios.get('/api/teams')
        ]).then(axios.spread((cyclistsData, countriesData, countriesWithPeopleData, citiesData, gendersData, teamsData )=> {
            this.setState({
                countries: countriesData.data,
                countriesWithCyclists: countriesWithPeopleData.data,
                cyclists: cyclistsData.data,
                cyclistsLoading: false,
                cities: citiesData.data,
                genders: gendersData.data,
                teams: teamsData.data
            })
        }))
            .catch(error => console.log(error))
    }

    editAthlete = (values) => {

    }

    deleteAthlete = () => {

    }

    postCyclist = (values) => {

    }

    filter = () => {
        axios.all([
            axios.get('/api/cyclists?countryId=' + this.state.filterCountryId
                + '&genderId=' + this.state.filterGenderId
                + '&teamId=' + this.state.filterTeamId)
        ])
            .then(axios.spread((response) => {
                this.setState({
                    cyclistsLoading: false,
                    races: response.data
                },() => console.log(response))
            }))
            .catch(error => console.log(error))
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
                                filterTeamId: '',
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

                    {/*<SelectInputForm*/}
                    {/*    title={"is active:"}*/}
                    {/*    defaultValue={""}*/}
                    {/*    onChange={e => {*/}
                    {/*        this.setState({*/}
                    {/*            activePage: 1,*/}
                    {/*            filterIsActive: e.target.value*/}
                    {/*        }, () => this.filter())*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <option value={true}>Yes</option>*/}
                    {/*    <option value={false}>No</option>*/}
                    {/*</SelectInputForm>*/}

                    {/*cyclists*/}
                    {this.state.cyclistsLoading ?
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

                    {this.state.cyclists.length > 0 ? <DBCyclistsCyclistsTable
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

                    /> : <p style={{textAlign: "center"}}>No cyclists found</p>}
                </StyledDivCentered1200>

                <StyledDiv2Right1200>
                    <Button onClick={() => this.setState({
                        newCyclist: true,
                    })} variant={"success"}>New Athlete</Button>
                </StyledDiv2Right1200>

                {this.state.newCyclist ?
                    <DBNewCyclistForm
                        show={this.state.newCyclist}
                        firstName={''}
                        lastName={''}
                        dateOfBirth={''}
                        genderId={''}
                        countryId={''}
                        teams={this.state.teams}
                        genders={this.state.genders}
                        countries={this.state.countries}
                        onHide={() => this.setState({
                            newCyclist: false
                        })}
                        onSubmit={(values) => {
                            this.setState({
                                showAddingModal: true
                            }, () => this.postCyclist(values))
                        }}
                    />
                    : null}


            </React.Fragment>
        )
    }

}


export default DBCyclistsMain
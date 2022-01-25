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
import moment from "moment";

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
        editCyclist: false,
        seasons: [],
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
            axios.get('/api/teams'),
            axios.get('/api/seasons')
        ]).then(axios.spread((cyclistsData, countriesData, countriesWithPeopleData,
                              citiesData, gendersData, teamsData,seasonsData )=> {
            this.setState({
                countries: countriesData.data,
                countriesWithCyclists: countriesWithPeopleData.data,
                cyclists: cyclistsData.data,
                cyclistsLoading: false,
                cities: citiesData.data,
                genders: gendersData.data,
                teams: teamsData.data,
                seasons: seasonsData.data
            })
        }))
            .catch(error => console.log(error))
    }

    editCyclist = (values) => {
        console.log(values)
        let successful = true
        const person = {
            firstName: values.firstName,
            lastName: values.lastName,
            gender: this.state.genders.find(gender => gender.id === parseInt(values.genderId)),
            dateOfBirth: values.dateOfBirth,
            country: this.state.countries.find(country => country.id === parseInt(values.countryId))
        }
        axios.put('/api/people/' + this.state.cyclistToEdit.person.id, {...person})
            .then(res => {
                console.log(res)
                axios.put('/api/cyclists/' + this.state.cyclistToEdit.id, {
                    person: res.data,
                })
                    .then((res) => {
                        const formData = new FormData();
                        formData.append('file', values.file)
                        console.log("photo")
                        axios.post('/api/people/photo/' + res.data.person.id, formData,)
                            .then((res) => {
                                console.log(res)
                                this.filter()
                            })
                            .catch(error => {
                                console.log(error)
                                successful = false
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        successful = false
                    })
            })
            .catch(error => {
                successful = false
                console.log(error)
            })
            .finally(() => {
                let modalText
                if (successful) {
                    modalText = values.firstName + " " + values.lastName + " updated."
                } else {
                    modalText = "Ups, there was a problem. Try again."
                }
                this.setState({
                    showCompletedModal: true,
                    completedModalText: modalText,
                    completedModalStatus: successful,
                    showAddingModal: false,
                    editCyclist: false,
                })
            })
    }

    deleteAthlete = () => {
        console.log(this.state.cyclistToDelete)
        console.log("SDafsdsagsg")
        axios.delete("/api/cyclists/" + this.state.cyclistToDelete.id)
            .then(() => {
                this.setState({
                    showCompletedModal: true,
                    completedModalText:  this.state.cyclistToDelete.person.firstName + " " + this.state.cyclistToDelete.person.lastName + " deleted.",
                    completedModalStatus: true,
                    showDeleteModal: false
                },()=> this.filter())
            })
            .catch(() => {
                this.setState({
                    showCompletedModal: true,
                    completedModalText: "Something went wrong, try again.",
                    completedModalStatus: false,
                })
            })
    }

    postCyclist = (values) => {
        console.log(this.state)
        console.log(values)
        let successful = true
        let modalText = values.firstName + " " + values.lastName + " added."
        console.log(values.countryId)
        let found = this.state.countries.find(country => country.id === parseInt(values.countryId))
        console.log(found)
        axios.post('/api/people', {
            firstName: values.firstName,
            lastName: values.lastName,
            gender: this.state.genders.find(gender => gender.id === parseInt(values.genderId)),
            dateOfBirth: values.dateOfBirth,
            country: this.state.countries.find(country => country.id === parseInt(values.countryId))
        })
            .then(res => {
                axios.post('api/cyclists', {
                    person: res.data,
                })
                    .then(res => {
                        const formData = new FormData();
                        formData.append('file', values.file)
                        axios.post('/api/people/photo/' + res.data.person.id, formData,)
                            .then(() => {
                                this.filter()
                            })
                            .catch(error => {
                                console.log(error)
                                successful = false
                                modalText = "Athlete added, but there was a problem with photo."
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        successful = false
                        modalText = "Ups, there was a problem. Try again."
                    })
            })
            .finally(() => {
                this.setState({
                    showCompletedModal: true,
                    completedModalText: modalText,
                    completedModalStatus: successful,
                    showAddingModal: false,
                    newCyclist: false,
                }, () => this.filter())
            })
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
                    cyclists: response.data
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
                        seasons={this.state.seasons}
                        teams={this.state.teams}
                        filter={() => this.filter()}
                        onDeleteCyclist={cyclist => {
                            this.setState({
                                showDeleteModal: true,
                                cyclistToDelete: cyclist
                            },() => this.deleteAthlete())}
                        }
                        onEditCyclist={(o) => {
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
                            console.log("Fsdafsgd")
                            this.setState({
                                showAddingModal: true
                            }, () => this.postCyclist(values))
                        }}
                    />
                    : null}

                {this.state.editCyclist ?
                    <DBNewCyclistForm
                        show={this.state.editCyclist}
                        firstName={this.state.cyclistToEdit.person.firstName}
                        lastName={this.state.cyclistToEdit.person.lastName}
                        dateOfBirth={moment(this.state.cyclistToEdit.person.dateOfBirth)}
                        genderId={this.state.cyclistToEdit.person.gender.id}
                        countryId={this.state.cyclistToEdit.person.country.id}
                        teams={this.state.teams}
                        genders={this.state.genders}
                        countries={this.state.countries}
                        onHide={() => this.setState({
                           editCyclist: false
                        })}
                        onSubmit={(values) => {
                            this.setState({
                                showAddingModal: true
                            }, () => this.editCyclist(values))
                        }}
                    />
                    : null}


            </React.Fragment>
        )
    }

}


export default DBCyclistsMain
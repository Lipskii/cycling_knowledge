import React, {Component} from "react";
import axios from "axios";
import {Button, Pagination} from "react-bootstrap";
import AddingModal from "../../../components/CommonModals/AddingModal";
import CompletedModal from "../../../components/CommonModals/CompletedModal";
import {Header3, StyledDiv2Right1200, StyledDivCentered1200} from "../../../components/StyledComponents";
import SelectInputForm from "../../../components/CommonForms/SelectInputForm";
import Loader from "react-loader-spinner";
import DBCyclistsCyclistsTable from "../Cyclists/DBCyclistsCyclistsTable";
import DeleteModal from "../../../components/CommonModals/DeleteModal";
import DBTeamsTeamsTable from "../Teams/DBTeamsTeamsTable";
import DBTeamsTeamForm from "../Teams/DBTeamsTeamForm";
import DBRacesRaceForm from "./DBRacesRaceForm";
import DBRacesRaceTable from "./DBRacesRaceTable";
import DBRacesEditStagesModal from "./DBRacesEditStagesModal";


class DBRacesMain extends Component {
    state = {
        activePage: 1,
        categories: [],
        countries: [],
        editRace: false,
        filterCategoryId: '',
        filterCountryId: '',
        newRace: false,
        showAddingModal: false,
        showCompletedModal: false,
        showDeleteModal: false,
        showEditStagesModal: false,
        races: [],
        racesLoading: true,
        raceToDelete: '',
        raceToEdit: '',
        raceToEditStages: ''
    }

    componentDidMount() {
        axios.all([
            axios.get("/api/countries"),
            axios.get("/api/races"),
            axios.get("/api/categories")
        ]).then(axios.spread((countries,races, categories)=> {
            this.setState({
                categories: categories.data,
                countries: countries.data,
                races: races.data,
                racesLoading: false
            },() => console.log(this.state))
        }))
        // .catch(error => console.log(error))
    }

    deleteRace = () => {
        console.log("DELETE")
        console.log(this.state)
        axios.delete("/api/races/" + this.state.raceToDelete.id)
            .then(res => console.log(res))
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({
                    showDeleteModal: false,
                    raceToDelete: '',
                }, () => this.filter())
            })
    }

    onDeleteRace = race => {
        this.setState({
            showDeleteModal: true,
            raceToDelete: race
        })
    }

    postRace = (values) => {
        let successful = false
        axios.post('/api/races', {
            name: values.name,
            country: this.state.countries.find(country => country.id === parseInt(values.countryId)),
            category: this.state.categories.find(category => category.id === parseInt(values.categoryId))
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

    editRace = (values) => {
        console.log(this.state)
        let successful = false
        this.setState({
            showAddingModal: true
        }, () => {
            axios.put('/api/races/' + this.state.raceToEdit.id, {
                name: values.name,
                country: this.state.countries.find(country => country.id === parseInt(values.countryId)),
                category: this.state.categories.find(category => category.id === parseInt(values.categoryId))
            })
                .then(res => {
                    successful = true
                    this.filter()
                })
                .catch(error => console.log(error))
                .finally(() => {
                    let modalText
                    if (successful) {
                        modalText = values.name + " edited."
                    } else {
                        modalText = "Ups, there was a problem. Try again."
                    }
                    this.setState({
                        showCompletedModal: true,
                        completedModalText: modalText,
                        completedModalStatus: successful,
                        showAddingModal: false,
                        editRace: !successful
                    })
                })
        })
    }

    filter = () => {
        axios.all([
            axios.get('/api/races?countryId=' + this.state.filterCountryId
                + '&categoryId=' + this.state.filterCategoryId)
        ])
            .then(axios.spread((races) => {
                this.setState({
                    racesLoading: false,
                    races: races.data
                })
            }))
            .catch(error => console.log(error))
    }

    render() {

        let items = [];
        let numberOfPages = this.state.races.length / 15
        if (this.state.races.length % 15 !== 0) {
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
                            raceToDelete: ''
                        })}
                        title={this.state.raceToDelete.name}
                        handleDelete={this.deleteRace}
                    /> : null}


                {this.state.showEditStagesModal ?
                <DBRacesEditStagesModal
                    show={this.state.showEditStagesModal}
                    race={this.state.raceToEditStages}
                    onHide={() => this.setState({
                        showEditStagesModal: false,
                        raceToEditStages: ''
                    })}
                /> : null}



                <Header3>Races</Header3>

                <StyledDivCentered1200>

                    {/*Select Country*/}
                    <strong>Filter</strong>
                    <SelectInputForm
                        title={"Country"}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                racesLoading: true,
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
                        title={"Category"}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                racesLoading: true,
                                filterCategoryId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All categories</option>
                        {this.state.categories.map(category =>
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>)}
                    </SelectInputForm>

                    {this.state.racesLoading ?
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

                    {(this.state.races.length > 0 && !this.state.racesLoading)? <DBRacesRaceTable
                        activePage={this.state.activePage}
                        races={this.state.races}
                        items={items}
                        onDelete={race => this.onDeleteRace(race)}
                        onEdit={o => {
                            this.setState({
                                raceToEdit: o,
                                editRace: true,
                            })
                        }}
                        editStages={race => {
                            this.setState({
                                raceToEditStages: race,
                                showEditStagesModal: true
                            },() => console.log(this.state))
                        }
                        }

                    /> : <p style={{textAlign: "center"}}>No races found</p>}
                </StyledDivCentered1200>

                <StyledDiv2Right1200>
                    <Button onClick={() => this.setState({
                        newRace: true,
                    })} variant={"success"}>New Race</Button>
                </StyledDiv2Right1200>

                {this.state.newRace ?
                    <DBRacesRaceForm
                        show={this.state.newRace}
                        onHide={() => this.setState({
                            newRace: false
                        })}
                        onSubmit={(values) => {
                            this.setState({
                                showAddingModal: true
                            }, () => this.postRace(values))
                        }}
                        initialName={''}
                        initialCountryId={''}
                        initialCategoryId={''}
                        countries={this.state.countries}
                        categories={this.state.categories}
                        mainHeader={"Adding new race"}
                    />
                    : null}

                {this.state.editRace ?
                    <DBRacesRaceForm
                        show={this.state.editRace}
                        onHide={() => this.setState({
                            editRace: false
                        })}
                        onSubmit={(values) => {
                            this.setState({
                                showAddingModal: true
                            }, () => this.editRace(values))
                        }}
                        initialName={this.state.raceToEdit.name}
                        initialCountryId={this.state.raceToEdit.country.id}
                        initialCategoryId={this.state.raceToEdit.category.id}
                        countries={this.state.countries}
                        categories={this.state.categories}
                        mainHeader={"Editing race"}
                    />
                    : null}


            </React.Fragment>
        )
    }
}


export default DBRacesMain
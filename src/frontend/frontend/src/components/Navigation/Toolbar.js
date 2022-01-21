import React, {Component} from "react";
import AuthService from "../../services/auth.service";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";


class Toolbar extends Component {
    state = {
        user: undefined,
        showModeratorBoard: false
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
            });
        }
    }


    render() {
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <LinkContainer to="/">
                    <Navbar.Brand href="/">Cycling KNL</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/results">
                             <Nav.Link>Results</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cyclists">
                            <Nav.Link>Cyclists</Nav.Link>
                        </LinkContainer>
                        <Nav.Link>Races</Nav.Link>
                        <NavDropdown title="Teams" id="collasible-nav-dropdown">
                            <NavDropdown.Item>World Tour Teams</NavDropdown.Item>
                            <NavDropdown.Item>Pro Teams</NavDropdown.Item>
                            <NavDropdown.Item>Continental Teams</NavDropdown.Item>
                            <LinkContainer to='/'>
                                <NavDropdown.Item onClick={() => {
                                    AuthService.logout()
                                    window.location.reload();
                                }}>Logout</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {this.state.showModeratorBoard ?
                        <NavDropdown id="collasible-nav-dropdown_two" title="DB Tools">
                            <LinkContainer to="/DBCyclists">
                                 <NavDropdown.Item>Cyclists</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item>News</NavDropdown.Item>
                            <NavDropdown.Item>Races</NavDropdown.Item>
                            <NavDropdown.Item>Results</NavDropdown.Item>
                            <LinkContainer to="/DBTeams">
                                <NavDropdown.Item>Teams</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/'>
                                <NavDropdown.Item onClick={() => {
                                    AuthService.logout()
                                    window.location.reload();
                                }}>Logout</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown> : null}
                    </Nav>
                    <Nav className="mr-1">
                        <Nav.Link>About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Toolbar
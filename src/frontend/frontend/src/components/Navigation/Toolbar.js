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
                        <Nav.Link>News</Nav.Link>
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
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown id="collasible-nav-dropdown_two" title="DB Tools">
                            <LinkContainer to="/DBCyclists">
                            <NavDropdown.Item>Cyclists</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item>News</NavDropdown.Item>
                            <NavDropdown.Item>Results</NavDropdown.Item>
                            <NavDropdown.Item>Teams</NavDropdown.Item>
                        </NavDropdown>
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
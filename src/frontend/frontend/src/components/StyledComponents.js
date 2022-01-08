import styled from "styled-components";
import {Accordion, Button, Form, ListGroup, ListGroupItem} from "react-bootstrap";

export const AccordionWithPadding = styled(Accordion)`
  padding: 10px;
`

export const CheckButton = styled(Button)`
    margin:auto;
`

export const ErrorLabel = styled.label`
    color: red;
`

export const Header3 = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`





export const Header5 = styled.h5`
  text-align: center;
`



export const List = styled(ListGroup)`
  text-align: center;
  max-height: 300px;
  max-width: 500px;
  margin-left: 140px;
  overflow: scroll;
  -webkit-overflow-scrolling: inherit;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 20px;
  margin-bottom: 10px;
`

styled(ListGroup)`
  text-align: center;
  max-height: 300px;
  max-width: 800px;
  //margin-left: 140px;
  overflow: scroll;
  -webkit-overflow-scrolling: inherit;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 20px;
  
`;
styled(ListGroupItem)`
  max-height: 50px;
  font-size: smaller;
`;



export const SmallTd = styled.td`
  max-width: 180px;
`

export const StyledDivCentered1200 = styled.div`
  margin: auto;
  max-width: 1300px;
`

export const StyledDivCentered1400 = styled.div`
  margin: auto;
  max-width: 1400px;
`





export const StyledDiv2Right1200 = styled.div`
  margin: auto;
  max-width: 1200px;
  text-align: right;
  padding-bottom: 10px;
`

export const StyledDiv2Centered = styled.div`
  margin: auto;
  max-width: 700px;
  text-align: center;
  padding-bottom: 10px;
`

export const StyledForm = styled(Form)`
  margin: auto;
  max-width: 1200px;
`

styled(Form)`
  margin:auto;
  max-height: 150px;
  max-width: 250px;
`;

styled(Form.Label)`
  margin-right: 10px;
`;

styled(Form.Control)`
  max-width: 200px;
  border-radius: 10px;
  align-content: center;
`;

styled(Button)`
  margin-bottom: 20px;
`;

export const TableButton = styled(Button)`
  margin-top: 3px;
  margin-right: 5px;
 // width: 85px;
`
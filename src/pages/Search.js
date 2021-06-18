import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { InputGroup, FormControl, Button, Container, Card, ListGroup, Col } from 'react-bootstrap';

const QUERY_SEARCHCOUNTRY = gql`
query Country($code : ID!){
    country(code : $code){
        name
        native
        capital
        phone
        currency
        code
    }
}
`;

function Search() {
    const [countrySearch, setCountrySearch] = useState("");
    const [searchCountry, { data, loading, error }] = useLazyQuery(QUERY_SEARCHCOUNTRY);

    return (
        <>
            <Container>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search by code of country"
                        aria-label="Search by code of country"
                        aria-describedby="basic-addon2"
                        onChange={(event) => {
                            setCountrySearch(event.target.value);
                        }}
                    />
                    <Button variant="outline-secondary" id="button-addon2"
                        onClick={() => { searchCountry({ variables: { code: countrySearch.toUpperCase() } }) }}>
                        Search Country
                    </Button>
                </InputGroup>
            </Container>
            <div>
                {
                    data && (
                        <Col sm className="p-1 mx-auto">
                            <Card style={{ width: '15rem' }} className=" mx-auto">
                                <Card.Img variant="top" src={`https://www.countryflags.io/${data.country.code}/shiny/64.png`} />
                                <Card.Body>
                                    <Card.Title>{data.country.name}</Card.Title>
                                    <Card.Subtitle ><ListGroup.Item>{data.country.native}</ListGroup.Item></Card.Subtitle>
                                    <ListGroup.Item className="mb-2 text-muted">Capital : {data.country.capital} </ListGroup.Item>
                                    <ListGroup.Item className="mb-2 text-muted">Phone : {data.country.phone}</ListGroup.Item>
                                    <ListGroup.Item className="mb-2 text-muted">Currency : {data.country.currency}</ListGroup.Item>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }
            </div>

        </>
    )
}

export default Search;

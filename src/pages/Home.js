import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Card, Container, Col, Row, ListGroup, Spinner } from 'react-bootstrap';
import Search from './Search';

const QUERY_COUNTRIESLIST = gql`
{
    countries {
    code
    name
    native
    phone
    capital
    currency
    emoji
    emojiU
  }
}
`;

function Home() {
    const { data, loading, error } = useQuery(QUERY_COUNTRIESLIST);

    return (
        <Container className="d-grid gap-3 ">
            <h1 style={{ margin: "5%" }}>List of Countries</h1>
            {loading && <Spinner animation="border" role="status" style={{ position: "fixed", top: "50%", left: "50%" }}>...Data is loading...</Spinner>}
            {error && <h3>{error.message}</h3>}
            <Search />
            <Row className="justify-content-center">
                {data && data.countries.map((country, key) => {
                    return (
                        <Col sm className="p-1 mx-auto">
                            <Card style={{ width: '15rem' }} className=" mx-auto">
                                <Card.Img variant="top" src={`https://www.countryflags.io/${country.code}/shiny/64.png`} />
                                <Card.Body>
                                    <Card.Title key={key}>{country.name}</Card.Title>
                                    <Card.Subtitle ><ListGroup.Item>{country.native} | Code : {country.code}</ListGroup.Item></Card.Subtitle>
                                    <ListGroup.Item className="mb-2 text-muted">Capital : {country.capital} </ListGroup.Item>
                                    <ListGroup.Item className="mb-2 text-muted">Phone : {country.phone}</ListGroup.Item>
                                    <ListGroup.Item className="mb-2 text-muted">Currency : {country.currency}</ListGroup.Item>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container >

    )
}

export default Home;

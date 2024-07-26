import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Spinner,
  Alert,
} from "react-bootstrap";
import { searchStudents } from "../services/firestore";
import StudentCard from "../components/StudentCard";
const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [instrumentFilter, setInstrumentFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setNoResults(false);
    const results = await searchStudents(
      searchTerm.toLowerCase(),
      teamFilter === "all teams" ? "" : teamFilter,
      instrumentFilter === "all instruments" ? "" : instrumentFilter,
      ageFilter
    );
    setStudents(results);
    setLoading(false);
    if (results?.length === 0) {
      setNoResults(true);
    }
  };

  return (
    <Container fluid className="pt-4">
      <Form>
        <Row className="mb-3">
          <Col xs={12} md={6} lg={3} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search by first name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-3">
            <Form.Control
              type="number"
              placeholder="Filter by age"
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
            />
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-3">
            <DropdownButton
              id="dropdown-instrument-button"
              title={instrumentFilter || "Select Instrument"}
              onSelect={(selectedInstrument) =>
                setInstrumentFilter(selectedInstrument)
              }
              className="w-100"
            >
              <Dropdown.Item eventKey="all instruments">
                All Instruments
              </Dropdown.Item>
              <Dropdown.Item eventKey="base drum">Base Drum</Dropdown.Item>
              <Dropdown.Item eventKey="flute">Flute</Dropdown.Item>
              <Dropdown.Item eventKey="side drum">Side Drum</Dropdown.Item>
              <Dropdown.Item eventKey="side flute">Side Flute</Dropdown.Item>
              <Dropdown.Item eventKey="small parts">Small Parts</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-3">
            <DropdownButton
              id="dropdown-team-button"
              title={teamFilter || "Select Team"}
              onSelect={(selectedTeam) => setTeamFilter(selectedTeam)}
              className="w-100"
            >
              <Dropdown.Item eventKey="all teams">All Teams</Dropdown.Item>
              <Dropdown.Item eventKey="satva">Satva</Dropdown.Item>
              <Dropdown.Item eventKey="samarpan">Samarpan</Dropdown.Item>
              <Dropdown.Item eventKey="sankalp">Sankalp</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col xs={12} className="d-flex justify-content-end">
            <Button onClick={handleSearch} variant="primary">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {!loading && noResults && (
        <Alert variant="warning" className="text-center">
          No results found.
        </Alert>
      )}

      {!loading && students?.length > 0 && (
        <Row className="mb-3 ms-1">Search Results: {students.length}</Row>
      )}

      <Row>
        {!loading &&
          students?.map((student) => (
            <Col key={student.id} xs={12} sm={6} lg={4} className="mb-3">
              <StudentCard student={student} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default SearchPage;

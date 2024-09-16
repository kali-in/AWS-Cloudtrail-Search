import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

import { data } from './data.js';

const Footer = () => {
  return (
    <footer className="footer py-3 bg-light fixed-bottom">
      <Container>
        <Row>
          <Col className="text-center">
            <span>Not affliated with AWS or Amazon.</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const Header = ({setSearch}) => {
  
  return (
    <header className="sticky-top bg-light py-3 shadow-sm">
      <Container>
        <h1 className='text-center'>AWS Cloudtrail EventName Search</h1>
        <Form>
          <InputGroup className='my-3'>
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search for CloudTrail Event Names'
              autoFocus
            />
          </InputGroup>
        </Form>
      </Container>
    </header>
  );
};

function App() {
  const [search, setSearch] = useState('');

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header  setSearch={setSearch}/>
      <Container className="flex-grow-1 mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>EventName</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => {
                const eventName = `${item.eventName.toLowerCase()}`;
                const searchTerm = search.toLowerCase();
                return eventName.includes(searchTerm);
              })
              .map((item) => (
                <tr key={item.id}>
                  <td onClick={async () => {
                    await navigator.clipboard.writeText(item.eventName);
                    alert("Copied the text: " + item.eventName);
                  }}>{item.eventName}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </div>
  );
}
export default App;
import Navbar from './components/Navbar.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddTask from './components/AddTask.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import TaskList from './components/TaskList.jsx';

// import './App.css';

function App() {
  return (
    <Container>
      <Navbar />
      <Row className='justify-content-md-center'>
        <Col lg='6'>
          <AddTask />
        </Col>
        <Col className='mt-5' lg='6'>
          <TaskList />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

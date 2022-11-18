import Header from "../../components/header/Header";
// import Slideshow from "../../components/slideshow/Slideshow";
// import GridCards from "../../components/gridcards/GridCards";
import { isAuthenticated } from "../../utils/authHelper";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Home(props) {
  return (
    <div className="Home">
      <Header isAuthenticated={isAuthenticated()} />
      <Card style={{
        width: '25%', marginTop: '10rem', height: '100%', margin: 'auto', padding: '10px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      }}>

        <Card.Body>
          <Card.Title style={{ marginBottom: '6rem', marginTop: '2rem', textAlign: 'center' }}>Welcome to Our Trivia Game</Card.Title>
          <Container>
            <Button href="/login" size="lg"
              style={{
                width: '100%', height: '3rem', marginBottom: '1rem',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                textAlign: `center`
              }}>
              Login
            </Button>

            <Button href="/register" size="lg"
              style={{
                width: '100%', height: '3rem', marginBottom: '1rem',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                textAlign: `center`
              }}>
              Register
            </Button>
          </Container>
        </Card.Body>
      </Card>
      {/* <Slideshow /> */}
      {/* <GridCards /> */}
    </div>
  );
}

export default Home;

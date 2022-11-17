import Header from "../../components/header/Header"
import { isAuthenticated } from "../../utils/authHelper"
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated"
import Favorites from "../favorites/Favorites"
import GlobalStats from "../globalStats/GlobalStats"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";

function LoggedIn() {
  return (
    <div className="LoggedIn">
        <Header isAuthenticated={isAuthenticated()} />
        <Card style={{width: '28rem', marginTop:'5rem', height: 'auto', margin: 'auto', padding: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
            <Card.Body>
                <Container>
                  <Row>
                    <Button href="/categories"
                        style={{ width: '10rem', height: '5rem', marginBottom: '3rem',
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                            textAlign: `center`}}>
                        Play a Game
                    </Button>
                  </Row>
                  <Row>
                    <GlobalStats />
                  </Row>
                  <Row>
                    <Favorites />
                  </Row>
                </Container>
            </Card.Body>
          </Card>
    </div>
  );
}

export default mustBeAuthenticated(LoggedIn)

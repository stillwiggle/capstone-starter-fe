import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function GridCards(props) {

    return (
        <div className="GridCards container mb-3">
            <Row xs={1} lg={3} className="g-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="http://via.placeholder.com/300" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default GridCards;

//import the boostrap compents we will be using on this form
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function FavoritesForm({ handleChange, handleSubmit, formData, isUpdate }) {


    return (
        <div className="favoritesForm container">

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label><strong>Add another player to your favorites list</strong></Form.Label>
                    <Form.Control required onChange={handleChange} value={formData.email} type="email" placeholder="Email" {...(isUpdate && {disabled:true})} />
                    {isUpdate ? <Form.Text muted>E-mail is read-only and cannot be updated from here</Form.Text> : null}
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )

}

export default FavoritesForm

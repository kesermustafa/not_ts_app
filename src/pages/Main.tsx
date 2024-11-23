import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { Note, Tag } from '../types';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { useState } from 'react';
import CustomCard from '../components/card/Card';

type Props = { notes: Note[]; availableTags: Tag[] };

const Main = ({ notes, availableTags }: Props) => {
  const [query, setQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filtredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) &&
      selectedTags.every((s_tag) =>
        note.tags.some((n_tag) => n_tag.value === s_tag.value)
      )
  );

  return (
    <Container className="mx-auto py-5">
      <Stack direction="horizontal" className="justify-content-between mb-4">
        <div className="d-flex gap-3 align-items-center">
          <img width={45} src={'/notes_icon.png'} alt="Note Logo png" />
          <h1>Notes</h1>
        </div>

        <Link to={'/new'}>
          <Button>Create</Button>
        </Link>
      </Stack>

      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Search by title</Form.Label>
              <Form.Control
                type="search"
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Search by tag</Form.Label>
              <ReactSelect
                onChange={(allTags) => setSelectedTags(allTags as Tag[])}
                className="text-black text-capitalize"
                isMulti
                options={availableTags}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="mt-4 gap-4">
        {filtredNotes.map((note, index) => (
          <Col key={index}>
            <CustomCard note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Main;

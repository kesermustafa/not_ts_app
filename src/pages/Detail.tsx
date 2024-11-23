import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Note } from '../types';
import { Badge, Button, Col, Container, Row, Stack } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

type Props = {
  deleteNote: (id: string) => void;
};

const Detail = ({ deleteNote }: Props) => {
  const note: Note = useOutletContext();
  return (
    <Container className="mx-auto py-5">
      <Row>
        <Col>
          <h1>{note.title}</h1>
          <Stack direction="horizontal" gap={2} className="flex-wrap">
            {note.tags.map((tag, index) => (
              <Badge key={index}>{tag.label}</Badge>
            ))}
          </Stack>
        </Col>
        <Col>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Link to={'/'}>
              <Button variant="secondary">Back</Button>
            </Link>
            <Link to={'edit'}>
              <Button>Edit</Button>
            </Link>
            <Link to={'/'}>
              <Button onClick={() => deleteNote(note.id)} variant="danger">
                Delete
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>

      <ReactMarkdown className="mt-5">{note.markdown}</ReactMarkdown>
    </Container>
  );
};

export default Detail;

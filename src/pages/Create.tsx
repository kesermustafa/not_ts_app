import React from 'react';
import Form from '../components/form/Form';
import { Container } from 'react-bootstrap';
import { NoteData, Tag } from '../types';

export type CreateProps = {
  handleSubmit: (data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const Create = ({ handleSubmit, createTag, availableTags }: CreateProps) => {
  return (
    <Container className="py-5">
      <h2>Create Note</h2>
      <Form
        handleSubmit={handleSubmit}
        createTag={createTag}
        availableTags={availableTags}
      />
    </Container>
  );
};

export default Create;

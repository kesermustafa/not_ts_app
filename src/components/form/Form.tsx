import ReactSelect from 'react-select/creatable';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { Tag } from '../../types';
import { CreateProps } from '../../pages/Create';

const CustomForm = ({
  handleSubmit,
  createTag,
  availableTags,
  title = '',
  tags = [],
  markdown = '',
}: CreateProps) => {
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const handleForm = (e: FormEvent) => {
    e.preventDefault();

    const title = titleRef.current?.value || '';
    const markdown = textRef.current?.value || '';

    handleSubmit({ title, markdown, tags: selectedTags });
    navigate('/');
  };

  return (
    <Form onSubmit={handleForm}>
      <Row className="my-4">
        <Col>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control defaultValue={title} ref={titleRef} />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label>Tags</Form.Label>
            <ReactSelect
              options={availableTags}
              value={selectedTags}
              onChange={(allTags) => setSelectedTags(allTags as Tag[])}
              className="text-black"
              isMulti
              onCreateOption={(text: string) => {
                const newTag = { label: text, value: v4() };
                createTag(newTag);
                setSelectedTags([...selectedTags, newTag]);
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group>
        <Form.Label>Content (supports markdown)</Form.Label>
        <Form.Control
          defaultValue={markdown}
          ref={textRef}
          as="textarea"
          style={{ minHeight: '300px', maxHeight: '450px' }}
        />
      </Form.Group>

      <Stack
        direction="horizontal"
        className="justify-content-end mt-5"
        gap={4}
      >
        <Link to={'..'}>
          <Button variant="secondary">Cancel</Button>
        </Link>

        <Button type="submit" variant="primary">
          Save
        </Button>
      </Stack>
    </Form>
  );
};

export default CustomForm;

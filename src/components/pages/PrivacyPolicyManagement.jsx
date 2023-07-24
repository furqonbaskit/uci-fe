import React, { useMemo, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import GetPolicy from '../../services/policy.service';

const PrivacyPolicyManagement = () => {
  const { data, isDataLoading, refresh } = GetPolicy.GetOne('privacy_policy');
  // const {data, isDataLoading} = useSingleFetch('/policy', 'privacy_policy', true)

  // const [description, setDescription] = useState();
  // const [content, setContent] = useState();

  const initial = useMemo(
    () => ({
      description: data?.description,
      content: data?.body,
    }),
    [data]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <>
      <Segment>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="Description"
              name="description"
              value={initial.description}
            />
          </Form.Field>
          <Form.Field>
            <label>Content</label>
            <ReactQuill
              theme="snow"
              style={{ height: '50vh', paddingBottom: '5em' }}
              value={initial.content}
            />
          </Form.Field>
          <Button primary type="submit">
            Submit
          </Button>
        </Form>
      </Segment>
    </>
  );
};

export default PrivacyPolicyManagement;

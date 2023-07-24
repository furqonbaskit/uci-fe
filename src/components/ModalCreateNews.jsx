import React, { useState } from 'react';
import { Button, Dropdown, Form, Header, Modal } from 'semantic-ui-react';
import NewsService from '../services/news.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ModalCreateNews = ({ openNews, setOpenNews, refresh }) => {
    const [dropdownValue, setDropdownValue] = useState([])
  const createTagFormik = useFormik({
    initialValues: {
      title: '',
      author: '',
      content: '',
      tagIds: [],
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    const body = {
      title: values.title,
      author: values.author,
      content: values.content,
      tagIds: values.tagIds,
    };

    console.log({ body });
    // const data = await NewsService.CreateNews(body);
    // console.log({data})

    // if (data.status == 201) {
    //   setOpenNews(false);
    //   refresh();
    //   toast.success('Successfully created tag');
    // } else {
    //   toast.error('Error');
    // }
  };

  const options = [
    { key: 'angular', text: 'Angular', value: 'angular' },
    { key: 'css', text: 'CSS', value: 'css' },
    { key: 'design', text: 'Graphic Design', value: 'design' },
    { key: 'ember', text: 'Ember', value: 'ember' },
    { key: 'html', text: 'HTML', value: 'html' },
    { key: 'ia', text: 'Information Architecture', value: 'ia' },
    { key: 'javascript', text: 'Javascript', value: 'javascript' },
    { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
    { key: 'meteor', text: 'Meteor', value: 'meteor' },
    { key: 'node', text: 'NodeJS', value: 'node' },
    { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
    { key: 'python', text: 'Python', value: 'python' },
    { key: 'rails', text: 'Rails', value: 'rails' },
    { key: 'react', text: 'React', value: 'react' },
    { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
    { key: 'ruby', text: 'Ruby', value: 'ruby' },
    { key: 'ui', text: 'UI Design', value: 'ui' },
    { key: 'ux', text: 'User Experience', value: 'ux' },
  ];

  return (
    <>
      <Modal onClose={() => setOpenNews(false)} open={openNews}>
        <Modal.Header>Create New News</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder="Title"
                name="title"
                value={createTagFormik.values.title}
                onChange={createTagFormik.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Author</label>
              <input
                placeholder="Author"
                name="author"
                value={createTagFormik.values.author}
                onChange={createTagFormik.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Tag</label>
              <Dropdown
                placeholder="Skills"
                fluid
                selection
                multiple
                options={options}
                value={createTagFormik.values.tagIds}
                onChange={(e, {value}) => createTagFormik.setFieldValue('tagIds', value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Content</label>
              <ReactQuill
                theme="snow"
                style={{ height: '50vh', paddingBottom: '5em' }}
                value={createTagFormik.values.content}
                onChange={(e) => createTagFormik.setFieldValue('content', e)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpenNews(false)}>
            Close
          </Button>
          <Button
            content="Save"
            labelPosition="right"
            icon="checkmark"
            type="submit"
            onClick={createTagFormik.handleSubmit}
            positive
          />
        </Modal.Actions>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ModalCreateNews;

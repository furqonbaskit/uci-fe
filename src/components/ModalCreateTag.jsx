import React, { useState } from 'react';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import NewsService from '../services/news.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';

const ModalCreateTab = ({ openTab, setOpenTab, refresh }) => {
  const createTagFormik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true,
  });

  const handleSubmit = async (values) => {
    const body = {
      name: values.name,
      description: values.description,
    };

    const data = await NewsService.CreateTag(body);

    if (data.status == 201) {
      setOpenTab(false);
      refresh();
      toast.success('Successfully created tag');
    } else {
      toast.error('Error');
    }
  };
  return (
    <>
      <Modal onClose={() => setOpenTab(false)} open={openTab}>
        <Modal.Header>Create New Tag</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Name"
                name="name"
                value={createTagFormik.values.name}
                onChange={createTagFormik.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input
                placeholder="Description"
                name="description"
                value={createTagFormik.values.description}
                onChange={createTagFormik.handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => toast.info('this is info')}>
            Close
          </Button>
          <Button
            content="Save"
            labelPosition="right"
            icon="checkmark"
            onClick={createTagFormik.handleSubmit}
            positive
          />
        </Modal.Actions>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ModalCreateTab;

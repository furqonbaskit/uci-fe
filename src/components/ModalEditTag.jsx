import React, { useMemo, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import NewsService from '../services/news.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';

const ModalEditTab = ({ editData, openTab, setOpenTab, refresh }) => {
  const { data, isDataLoading } = NewsService.GetOneTag(editData.id);

  const initialTag = useMemo(
    () => ({
      id: data?.id,
      name: data?.name,
      description: data?.description,
    }),
    [data]
  );

  const editTagFormik = useFormik({
    initialValues: initialTag,
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

    const data = await NewsService.EditTag(values.id, body);
    
    if (data.status === 201) {
      toast.success('Successfully created tag');
      setOpenTab(false);
      refresh();
    } else {
      toast.error('Error');
    }
  };
  return (
    <>
      <Modal onClose={() => setOpenTab(false)} open={openTab}>
        <Modal.Header>Edit Tag</Modal.Header>
        <Modal.Content>
          <Form loading={isDataLoading}>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Name"
                name="name"
                value={editTagFormik.values.name}
                onChange={editTagFormik.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input
                placeholder="Description"
                name="description"
                value={editTagFormik.values.description}
                onChange={editTagFormik.handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpenTab(false)}>
            Close
          </Button>
          <Button
            content="Save"
            labelPosition="right"
            icon="checkmark"
            type="submit"
            onClick={editTagFormik.handleSubmit}
            positive
          />
        </Modal.Actions>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ModalEditTab;

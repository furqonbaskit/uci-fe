import React, { useState } from 'react';
import { Button, Icon, Pagination, Segment, Table } from 'semantic-ui-react';
import NewsService from '../services/news.service';
import ModalCreateTab from './ModalCreateTag';
import ModalEditTab from './ModalEditTag';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TagTab = () => {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editData, setEditData] = useState({});
  const [active, setActive] = useState(1);
  const { data, totalPages, isDataLoading, refresh } = NewsService.GetAllTag(
    5,
    active
  );

  const handleChange = (_e, pageInfo) => {
    setActive(pageInfo.activePage);
  };

  const handleEditPress = (data) => {
    setEditData(data);
    setOpenEdit(true);
  };

  const handleDeletePress = async (data) => {
    const deleteTag = await NewsService.DeleteTag(data.id);
    console.log({ deleteTag });
    toast.info('Successfully delete a Tag');
    refresh();
  };
  return (
    <>
      <Segment clearing>
        <Button size={'tiny'} floated="right" onClick={refresh} basic icon>
          <Icon name="refresh" />
        </Button>
        <Button
          size={'tiny'}
          floated="right"
          color={'blue'}
          icon
          onClick={() => setOpen(true)}
          labelPosition={'right'}
        >
          Create New
          <Icon name={'setting'} />
        </Button>
      </Segment>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {!isDataLoading &&
            data?.map((news, idx) => (
              <Table.Row key={news.id}>
                <Table.Cell width={1}>{idx + 1}</Table.Cell>
                <Table.Cell>{news.name}</Table.Cell>
                <Table.Cell>{news.description}</Table.Cell>
                <Table.Cell>
                  <Button.Group icon basic size="mini" compact>
                    <Button icon="edit" onClick={() => handleEditPress(news)} />
                    <Button
                      icon="trash"
                      onClick={() => handleDeletePress(news)}
                    />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      {!isDataLoading && (
        <Pagination
          defaultActivePage={active}
          onPageChange={handleChange}
          totalPages={totalPages}
        />
      )}

      {open && (
        <ModalCreateTab openTab={open} setOpenTab={setOpen} refresh={refresh} />
      )}
      {openEdit && (
        <ModalEditTab
          editData={editData}
          openTab={openEdit}
          setOpenTab={setOpenEdit}
          refresh={refresh}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default TagTab;

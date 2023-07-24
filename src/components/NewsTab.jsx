import React, { useState } from 'react';
import { Button, Icon, Pagination, Segment, Table } from 'semantic-ui-react';
import NewsService from '../services/news.service';
import parse from 'html-react-parser';
import ModalCreateNews from './ModalCreateNews';

const NewsTab = () => {
  const [openNew, setOpenNew] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editData, setEditData] = useState({});
  const [active, setActive] = useState(1);
  const { data, totalPages, isDataLoading, refresh } = NewsService.GetAll(
    5,
    active
  );

  const handleChange = (_e, pageInfo) => {
    setActive(pageInfo.activePage);
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
          onClick={() => setOpenNew(true)}
          labelPosition={'right'}
        >
          Create New
          <Icon name={'setting'} />
        </Button>
      </Segment>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Content</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {!isDataLoading &&
            data?.map((news) => (
              <Table.Row key={news.id}>
                <Table.Cell>{news.title}</Table.Cell>
                <Table.Cell>{news.author}</Table.Cell>
                <Table.Cell>{(news.content.slice(0, 15))} ...</Table.Cell>
                <Table.Cell>
                  <Button.Group icon basic size="mini" compact>
                    <Button icon="edit" onClick={undefined} />
                    <Button icon="trash" onClick={undefined} />
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
      {openNew && (
        <ModalCreateNews
          openNews={openNew}
          setOpenNews={setOpenNew}
          refresh={refresh}
        />
      )}
    </>
  );
};

export default NewsTab;

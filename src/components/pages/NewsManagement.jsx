import React, { useState } from 'react';
import { Pagination, Segment, Tab, Table } from 'semantic-ui-react';
import NewsTab from '../NewsTab';
import TagTab from '../TagTab';

const NewsManagement = () => {
  const panes = [
    { menuItem: 'News Management', render: () => <Tab.Pane><NewsTab /></Tab.Pane> },
    { menuItem: 'Tag Management', render: () => <Tab.Pane><TagTab /></Tab.Pane> },
  ]
  return (
    <Segment>
        <Tab panes={panes} />
    </Segment>
  );
};

export default NewsManagement;

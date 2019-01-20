import React from 'react';
import PropTypes from 'prop-types';

import TabItem from 'components/blocks/TabItem';

const ListDetailsPage = ({ links }) => (
  <ul className="ListDetailsPage">
    {
      links.map(link => (
        <TabItem {...link} key={link.url} showCheckbox={false} />
      ))
    }
  </ul>
);

ListDetailsPage.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListDetailsPage;

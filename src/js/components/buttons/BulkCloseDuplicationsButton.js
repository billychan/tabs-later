import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Popover,
} from '@blueprintjs/core';

const BulkCloseDuplicationsButton = ({ links }) => (
  <Popover>
    <Button
      icon="property"
      minimal
      title="Close duplicated tabs"
    />
    <section>
      {
        links.length
          ? (
            <p>There are duplications.</p>
          ) : (
            <p>There is no duplications. All set!</p>
          )
      }
    </section>
  </Popover>
);

BulkCloseDuplicationsButton.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BulkCloseDuplicationsButton;

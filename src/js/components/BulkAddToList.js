import React from "react";
import PropTypes from 'prop-types';
import { Button } from "@blueprintjs/core";

const BulkAddToList = ({ onClick }) =>
    <Button
      icon='add-to-artifact'
      minimal
    />

BulkAddToList.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default BulkAddToList
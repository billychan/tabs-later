import React from "react";
import PropTypes from 'prop-types';
import { Checkbox } from "@blueprintjs/core";

const BulkCheck = ({ onChange }) =>
  <Checkbox
    className="operation-select-all"
    onChange={({ target }) => onChange(target.checked)}
  />

BulkCheck.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default BulkCheck
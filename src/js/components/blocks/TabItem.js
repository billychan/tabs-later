import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@blueprintjs/core';
import Favicon from 'components/elements/Favicon';
import { noop } from 'common/helpers';

const TabItem = ({
  checked,
  favIconUrl,
  id,
  title,
  onChange,
  showCheckbox,
}) => (
  <li className="TabItem">
    {
      showCheckbox
        ? (<Checkbox
          className="TabItem__checkbox"
          checked={checked}
          onChange={({ target }) => onChange(id, target.checked)}
        />
        ) : ''
    }
    <Favicon url={favIconUrl} />
    <span className="TabItem__main">
      {title}
    </span>
  </li>
);

TabItem.propTypes = {
  checked: PropTypes.bool,
  favIconUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.number,
  onChange: PropTypes.func,
  showCheckbox: PropTypes.bool,
};

TabItem.defaultProps = {
  checked: false,
  favIconUrl: '',
  id: undefined,
  onChange: noop,
  showCheckbox: true,
};

export default TabItem;

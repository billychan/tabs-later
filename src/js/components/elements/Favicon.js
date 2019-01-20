import React from 'react';
import PropTypes from 'prop-types';
import '../../../img/placeholder.ico';

const faviconPlaceholderUrl = '/assets/img/placeholder.ico';

const handleImageError = (event) => {
  const img = event.target;
  img.src = faviconPlaceholderUrl;
  return true;
};

const Favicon = ({ url }) => (
  <span className="favicon">
    <img src={url} alt={url} onError={handleImageError} />
  </span>
);

Favicon.propTypes = {
  url: PropTypes.string,
};

Favicon.defaultProps = {
  url: faviconPlaceholderUrl,
};

export default Favicon;

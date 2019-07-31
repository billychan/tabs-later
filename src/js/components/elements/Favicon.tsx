import * as React from 'react';
import '../../../img/placeholder.ico';

interface FaviconProps {
  url: string
}

const faviconPlaceholderUrl = '/assets/img/placeholder.ico';

const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  const img = event.currentTarget;
  img.src = faviconPlaceholderUrl;
  return true;
};

const Favicon = ({ url = faviconPlaceholderUrl }: FaviconProps) => (
  <span className="w-5 h-5 flex-shrink-0">
    <img className="w-5 h-5" src={url} alt={url} onError={handleImageError} />
  </span>
);

export default Favicon;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { cold } from 'react-hot-loader';

import { calculateCheckedStatus } from 'common/helpers';
import { searchLinks } from 'common/utils/search';

import TabItem from 'components/blocks/TabItem';
import Footer from 'components/blocks/Footer';

import SearchInput from 'components/formControls/SearchInput';
import BulkCheck from 'components/formControls/BulkCheck';
import SelectedItemsHints from 'components/elements/SelectedItemsHints';

const selectLink = (link, toSelect = true) => ({ ...link, checked: toSelect });
const selectLinks = (links, toSelect = true) => links.map(link => selectLink(link, toSelect));

const mergeLinksWithCheckedState = (links, localLinks) => (
  links.map((link) => {
    const localLink = localLinks.find(item => item.id === link.id);
    if (localLink) {
      return {
        ...link,
        checked: localLink.checked,
      };
    }
    return link;
  })
);

const getCheckedLinksCount = links => links.filter(link => link.checked).length;

const LinksPage = ({
  links,
  renderBulkOperations,
  renderItemOperations,
  className,
}) => {
  const linksCount = links.length;
  const [visibleLinks, setVisibleLinks] = useState(links);
  // The links prop may change, sync with it with local state
  useEffect(() => {
    setVisibleLinks(mergeLinksWithCheckedState(links, visibleLinks));
  }, [links]);
  return (
    <section className={`LinksPage${className ? ` ${className}` : ''} pt-2`}>
      <section className="flex pb-3 border-b border-gray-300 items-center">
        <BulkCheck
          checkedStatus={calculateCheckedStatus(linksCount, getCheckedLinksCount(visibleLinks))}
          onChange={(checked) => {
            setVisibleLinks(selectLinks(visibleLinks, checked));
          }}
        />
        <SearchInput
          onSearch={(query) => {
            if (query) {
              setVisibleLinks(searchLinks(visibleLinks, query));
            } else {
              setVisibleLinks(links);
            }
          }}
        />
        {
          renderBulkOperations({
            selectedLinks: visibleLinks.filter(link => link.checked),
          })
        }
      </section>
      <ul className="LinksPage__links scrollable pt-2 -ml-1">
        {
          visibleLinks.map(link => (
            <TabItem
              {...link}
              title={link.titleHighlighted || link.title}
              url={link.urlHighlighted || link.url}
              key={link.id}
              checked={link.checked}
              onChange={(_id, checked) => {
                setVisibleLinks(visibleLinks.map(linkItem => (
                  link.id === linkItem.id
                    ? { ...link, checked }
                    : linkItem
                )));
              }}
            >
              { renderItemOperations({ link }) }
            </TabItem>
          ))
        }
      </ul>
      <Footer>
        <span className="text-xs text-gray-600">
          <SelectedItemsHints
            selectedCount={getCheckedLinksCount(visibleLinks)}
            totalCount={linksCount}
          />
        </span>
      </Footer>
    </section>
  );
};

LinksPage.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderBulkOperations: PropTypes.func.isRequired,
  renderItemOperations: PropTypes.func.isRequired,
  className: PropTypes.string,
};

LinksPage.defaultProps = {
  className: '',
};

export default cold(LinksPage);

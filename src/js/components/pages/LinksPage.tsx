import * as React from 'react';
import { cold } from 'react-hot-loader';

import { calculateCheckedStatus } from 'common/helpers';
import { searchLinks } from 'common/utils/search';
import classNames from 'classnames';

import TabItem from 'components/blocks/TabItem';
import Footer from 'components/blocks/Footer';

import SearchInput from 'components/formControls/SearchInput';
import BulkCheck from 'components/formControls/BulkCheck';
import SelectedItemsHints from 'components/elements/SelectedItemsHints';

const { useState, useEffect } = React;

const selectLink = (link: TabsLater.Link, toSelect = true) => ({ ...link, checked: toSelect });

const mergeLinksWithCheckedState = (links: TabsLater.Link[], localLinks: TabsLater.Link[]) => (
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

const getCheckedLinksCount = (links: TabsLater.Link[]) => links.filter(link => link.checked).length;

interface LinksPageProps {
  links: TabsLater.Link[];
  renderBulkOperations: TabsLater.Renderer;
  renderItemOperations: TabsLater.Renderer;
  className?: string;
}

const LinksPage = ({
  links,
  renderBulkOperations,
  renderItemOperations,
  className,
}: LinksPageProps) => {
  const linksCount = links.length;
  const [visibleLinks, setVisibleLinks] = useState(links);
  // The links prop may change, sync with it with local state
  useEffect(() => {
    setVisibleLinks(mergeLinksWithCheckedState(links, visibleLinks));
  }, [links]);
  return (
    <section className={classNames('LinksPage', className)}>
      <section className="flex pb-3 border-b border-gray-300 items-center">
        <BulkCheck
          checkedStatus={calculateCheckedStatus(linksCount, getCheckedLinksCount(visibleLinks))}
          onChange={(checked) => {
            setVisibleLinks(visibleLinks.map((link: TabsLater.Link) => selectLink(link, checked)))
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

export default cold(LinksPage);

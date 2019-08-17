import * as React from 'react';
import { without, map, intersection, find, compact } from 'lodash';
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

interface LinksPageProps {
  links: TabsLater.Link[];
  renderBulkOperations: TabsLater.Renderer<{ selectedLinks: (TabsLater.Tab | TabsLater.Link)[] }>
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

  const [checkedIds, setCheckedIds] = useState([]);

  const [visibleLinks, setVisibleLinks] = useState(links);

  // Flag to decide if the links should be updated. In normal case they should, but if in search
  // then the title/urls are all changed to highlight and they should not be updated from outside.
  const [hasQuery, setHasQuery] = useState(false);

  useEffect(() => {
    if (!hasQuery) {
      setVisibleLinks(links);
    }
    // When links changed especially removed, update checkedIds to keep relevant values.
    setCheckedIds(
      intersection(
        checkedIds,
        map(links, 'id')
      )
    )
  }, [links]);

  return (
    <section className={classNames('LinksPage', className)}>
      <section className="flex pb-3 border-b border-gray-300 items-center">
        <BulkCheck
          checkedStatus={
            calculateCheckedStatus(visibleLinks.length, checkedIds.length)
          }
          onChange={(checked) => {
            setCheckedIds(
              checked ? map(visibleLinks, 'id') : []
            )
          }}
        />
        <SearchInput
          onSearch={(query) => {
            setHasQuery(!!query);
            if (query) {
              setVisibleLinks(searchLinks(links, query));
            } else {
              setVisibleLinks(links);
            }
          }}
        />
        {
          renderBulkOperations({
            selectedLinks: compact(checkedIds.map(id => find(links, { id })))
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
              checked={checkedIds.includes(link.id)}
              onChange={(id, checked) => {
                setCheckedIds(
                  checked ? checkedIds.concat(id) : without(checkedIds, id)
                )
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
            selectedCount={checkedIds.length}
            totalCount={linksCount}
          />
        </span>
      </Footer>
    </section>
  );
};

export default cold(LinksPage);

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { cold } from 'react-hot-loader';
import { connect } from 'react-redux';

import { calculateCheckedStatus } from 'common/helpers';
import { getAllItems } from 'common/selectors';
import { searchLinks } from 'common/utils/search';

import * as tabsActions from 'features/tabs/tabsActions';

import TabItem from 'components/blocks/TabItem';
import TabItemActions from 'components/blocks/TabItemActions';
import Footer from 'components/blocks/Footer';

import SearchInput from 'components/formControls/SearchInput';
import BulkCheck from 'components/formControls/BulkCheck';
import BulkOpenUrlsButton from 'components/buttons/BulkOpenUrlsButton';
import SelectedItemsHints from 'components/elements/SelectedItemsHints';

import { openTabsOnBrowser } from 'services/browserTabs';

const selectLink = (link, toSelect = true) => ({ ...link, checked: toSelect });
const selectLinks = (links, toSelect = true) => links.map(link => selectLink(link, toSelect));

/**
 * Note openTabsOnBrowser makes side effect directly. The reason not going through an action
 * creator is there is no suitable action to update state. Normally fetching all tabs again is
 * expected after new tab opened, but the new tab info will be empty if fetched immediately after
 * creation since it's not fully loaded yet, so it's better just refreshing info when displaying
 * tabs list page.
 */
const ListDetailsPage = ({ links, tabs }) => {
  const linksCount = links.length;
  const [visibleLinks, setVisibleLinks] = useState(links);
  const [checkedLinksCount, setCheckedLinksCount] = useState(0);
  return (
    <section className="ListDetailsPage">
      <section className="BulkOperations">
        <BulkCheck
          checkedStatus={calculateCheckedStatus(linksCount, checkedLinksCount)}
          onChange={(checked) => {
            setVisibleLinks(selectLinks(visibleLinks, checked));
            setCheckedLinksCount(checked ? linksCount : 0);
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
        <BulkOpenUrlsButton
          urls={visibleLinks.filter(link => link.checked).map(link => link.url)}
          existingTabUrls={tabs.map(tab => tab.url)}
          onOpenUrls={urls => openTabsOnBrowser(urls)}
        />
      </section>
      <ul className="ListDetailsPage__links TabItems">
        {
          visibleLinks.map(link => (
            <TabItem
              {...link}
              title={link.titleHighlighted || link.title}
              url={link.urlHighlighted || link.url}
              key={link.url}
              checked={link.checked}
              onChange={(_id, checked) => {
                const inc = checked ? 1 : -1;
                setCheckedLinksCount(checkedLinksCount + inc);
                setVisibleLinks(visibleLinks.map(linkItem => (
                  link.url === linkItem.url
                    ? { ...link, checked }
                    : linkItem
                )));
              }}
            >
              <TabItemActions
                onOpeningLink={() => { openTabsOnBrowser([link.url]); }}
              />
            </TabItem>
          ))
        }
      </ul>
      <Footer>
        <section className="PageBottom">
          <span className="PageBottomHints">
            <SelectedItemsHints
              selectedCount={checkedLinksCount}
              totalCount={linksCount}
            />
          </span>
        </section>
      </Footer>
    </section>
  );
};

ListDetailsPage.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  tabs: getAllItems(state.tabs),
});

export default connect(
  mapStateToProps,
  tabsActions,
)(cold(ListDetailsPage));

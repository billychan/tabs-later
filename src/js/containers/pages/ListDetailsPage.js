import React from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';

import { connect } from 'react-redux';
import * as tabsActions from 'features/tabs/tabsActions';

import TabItem from 'components/blocks/TabItem';
import TabItemActions from 'components/blocks/TabItemActions';

import { noop } from 'common/helpers';
import { openTabsOnBrowser } from 'services/browserTabs';

/**
 * Note openTabsOnBrowser makes side effect directly. The reason not going through an action
 * creator is there is no suitable action to update state. Normally fetching all tabs again is
 * expected after new tab opened, but the new tab info will be empty if fetched immediately after
 * creation since it's not fully loaded yet, so it's better just refreshing info when displaying
 * tabs list page.
 */
const ListDetailsPage = ({ links }) => (
  <ul className="ListDetailsPage">
    {
      links.map(link => (
        <TabItem {...link} key={link.url} showCheckbox={false}>
          <TabItemActions onOpeningLink={() => {
            openTabsOnBrowser([link.url]);
          }}
          />
        </TabItem>
      ))
    }
  </ul>
);

ListDetailsPage.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = noop;

export default connect(
  mapStateToProps,
  tabsActions,
)(cold(ListDetailsPage));

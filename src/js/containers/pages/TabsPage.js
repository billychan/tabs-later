import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cold } from 'react-hot-loader';

import { getAllItems } from 'common/selectors';
import { focusTab } from 'services/browserTabs';

import * as tabsActions from 'features/tabs/tabsActions';

import ListDetailsPage from 'components/pages/ListDetailsPage';
import OpenLinkButton from 'components/buttons/OpenLinkButton';

import BulkAddToListButton from 'components/buttons/BulkAddToListButton';

// TODO Note: The all tabs state still needs to be maintained in global state
const TabsPage = ({ tabs, fetchAllTabs }) => {
  useEffect(() => {
    fetchAllTabs();
  }, []);
  return (
    <ListDetailsPage
      links={tabs}
      className="TabsPage"
      renderBulkOperations={({ selectedLinks }) => (
        // TODO: This is not complete, since the links are not really passed.
        <BulkAddToListButton
          links={selectedLinks}
        />
      )}
      renderItemOperations={({ link }) => (
        <OpenLinkButton
          title="Switch to tab"
          onClick={() => { focusTab(link.index); }}
        />
      )}
    />
  );
};

const mapStateToProps = state => ({
  tabs: getAllItems(state.tabs),
});

TabsPage.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllTabs: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  tabsActions,
)(cold(TabsPage));

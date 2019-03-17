import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cold } from 'react-hot-loader';

import { getAllItems } from 'common/selectors';
import { focusTab, closeTabs } from 'services/browserTabs';

import * as tabsActions from 'features/tabs/tabsActions';

import ListDetailsPage from 'components/pages/ListDetailsPage';
import OpenLinkButton from 'components/buttons/OpenLinkButton';

import BulkAddToListButton from 'components/buttons/BulkAddToListButton';
import BulkCloseDuplicationsButton from 'components/buttons/BulkCloseDuplicationsButton';

const TabsPage = ({ tabs, fetchAllTabs }) => {
  useEffect(() => {
    fetchAllTabs();
  }, []);
  return (
    <ListDetailsPage
      links={tabs}
      className="TabsPage"
      renderBulkOperations={({ selectedLinks }) => (
        <>
          <BulkAddToListButton
            links={selectedLinks}
          />
          <BulkCloseDuplicationsButton
            links={selectedLinks}
            onConfirm={(duplicatedLinks) => {
              closeTabs(duplicatedLinks.map(link => link.id));
            }}
          />
        </>
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllItems } from 'common/selectors';
import * as tabsActions from 'features/tabs/tabsActions';

import TabItem from 'components/blocks/TabItem';
import TabsBulkOperations from 'containers/blocks/TabsBulkOperations';

const TabsPage = ({ tabs, checkTab }) => (
  <div className="TabsPage">
    <TabsBulkOperations />
    <section className="TabsPage__tabs">
      <ul className="TabItems">
        {
            tabs.map(tab => (
              <TabItem
                {...tab}
                key={tab.id}
                onChange={(tabId, checked) => checkTab(tabId, checked)}
              />
            ))
          }
      </ul>
    </section>
  </div>
);

const mapStateToProps = state => ({
  tabs: getAllItems(state.tabs),
});

TabsPage.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkTab: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  tabsActions,
)(TabsPage);

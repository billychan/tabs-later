import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Classes,
  Button,
  PanelStack,
  Popover
} from "@blueprintjs/core";

const NewListPannel = () =>
  <p>Add New List</p>

const AddToListPannel = ({ openPanel }) =>
  <div className="add-to-list-panel">
    <section className='main-section'>
      content
    </section>
    <section className='actions'>
      <Button text='New List' onClick={() => {
        openPanel({
          component: NewListPannel,
          title: 'New List'
        })
      }} />
      <Button text='Cancel' className={classNames(Classes.POPOVER_DISMISS, 'cancle')} />
      <Button text='Done' intent="primary"/>
    </section>
  </div>

AddToListPannel.propTypes = {
  openPanel: PropTypes.func.isRequired
}

const BulkAddToList = () =>
  <Popover>
    <Button
      icon='add-to-artifact'
      minimal
    />
    <div className="add-to-list-box">
      <PanelStack
        initialPanel={{ component: AddToListPannel, title: 'Add To List' }}
        className='add-to-list-content'
      />
    </div>
  </Popover>

export default BulkAddToList
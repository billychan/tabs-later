import React from "react";
import PropTypes from 'prop-types';
import {
  Card,
  Classes,
  Button,
  Popover
} from "@blueprintjs/core";

const Content = () =>
  <div className='popover-content'>
    <p className="text-center">Add To List</p>
    <Card className="bottom-10" />
    <section style={{display: 'flex', justifyContent: 'space-between'}}>
      <Button text='New List' />
      <Button text='Cancel' className={Classes.POPOVER_DISMISS} />
      <Button text='Done' intent="primary"/>
    </section>
  </div>

const BulkAddToList = ({ onClick }) =>
  <Popover>
    <Button
      icon='add-to-artifact'
      minimal
    />
    <Content />
  </Popover>

BulkAddToList.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default BulkAddToList
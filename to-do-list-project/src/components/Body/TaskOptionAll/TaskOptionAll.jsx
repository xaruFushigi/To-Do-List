import React from 'react';
import PropTypes from 'prop-types';
// CSS
import styles from '../Body.module.css';

const TaskOptionAll = props => {
  return (
    <div
      className="flex flex-row w-100 items-center justify-between"
      key={props.id}
    >
      <div className="flex flex-row w-100 items-center justify-between">
        <div className="flex flex-row">
          <input
            type="checkbox"
            onChange={event =>
              props.checkboxValue(event, props.id, props.status)
            }
            checked={props.status === 'Complete'}
            className="mr1"
          />
          <p
            className={`${
              props.status === 'Complete' ? styles.completedTask : ''
            } mr3`}
          >
            {props.title}
          </p>
        </div>
        <div className="mr3">
          <button
            key={props.index}
            onClick={() => {
              props.deleteTaskButton(props.id);
            }}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Prop Validation
TaskOptionAll.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  deleteTaskButton: PropTypes.func.isRequired,
  checkboxValue: PropTypes.func.isRequired,
};

export default TaskOptionAll;

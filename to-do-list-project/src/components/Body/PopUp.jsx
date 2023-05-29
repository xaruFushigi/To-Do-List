import React from 'react';
import './PopUp.css';
import PropTypes from 'prop-types';

const PopUp = props => {
  return (
    <div className="popup-content flex items-center">
      {/* Exit Body */}
      <div>
        <button className="btn-close" onClick={props.togglePopUp}>
          {' '}
          X{' '}
        </button>
      </div>
      {/* Main Body */}
      <div className="box w-50">
        <h2 className="flex justify-start">Add ToDo</h2>

        <div className="flex justify-start flex-column">
          <label htmlFor="titleInput" className="flex flex-start">
            Title
          </label>
          <input
            type="text"
            name="titleInput"
            className="w-60"
            onChange={props.getTitleInputValueField}
          />
        </div>

        <label htmlFor="StatusChange" className="flex justify-start mt3">
          Status
        </label>
        <select
          name="StatusChange"
          className="flex justify-start m1"
          onChange={props.optionValueState}
          value={props.optionValue}
        >
          <option>Incomplete</option>
          <option>Complete </option>
        </select>

        <div className="flex flex-row w-30">
          <button className="mt3 mr2" onClick={props.addTaskButton}>
            Add Task
          </button>
          <button className="mt3 mr2" onClick={props.cancelButton}>
            Cancel{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

// Prop Validation
PopUp.propTypes = {
  togglePopUp: PropTypes.func.isRequired,
  getTitleInputValueField: PropTypes.func.isRequired,
  optionValueState: PropTypes.string.isRequired,
  optionValue: PropTypes.string.isRequired,
  addTaskButton: PropTypes.func.isRequired,
  cancelButton: PropTypes.func.isRequired,
};

export default PopUp;

import React, { useState, useEffect } from 'react';
import PopUp from './PopUpWindow/PopUp';
import TaskOptionAll from './TaskOptionAll/TaskOptionAll';
import TaskOptionComplete from './TaskOptionAll/TaskOptionComplete';
import TaskOptionIncomplete from './TaskOptionAll/TaskOptionIncomplete';
import Scroll from './Scroll';
// CSS
// import styles from './Body.module.css';
const Body = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [titleInputValueField, setTitleInputValueField] = useState('');
  const [optionValue, setOptionValue] = useState('Incomplete');
  const [mainWindowOptionValue, setMainWindowOptionValue] = useState('All');
  const [addedTask, setAddedTask] = useState([]);
  // const [checkboxFieldValue, setCheckboxFieldValue] = useState(false);
  const [database, setDatabase] = useState([]);
  // receives title of the task from input
  const getTitleInputValueField = event => {
    setTitleInputValueField(event.target.value);
  };
  // Add task PopUp window
  const togglePopUp = event => {
    setOpenPopUp(prevCondition => !prevCondition);
  };
  // checkbox
  const checkboxValue = async (event, id, status) => {
    const changedStatus = status === 'Complete' ? 'Incomplete' : 'Complete';
    try {
      await fetch(`http://localhost:3051/updateStatus/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: changedStatus }),
      });
      fetchData(); // fetch database to show updated status from the backend
    } catch (error) {
      console.log(error);
    }
  };
  // cancel button
  const cancelButton = event => {
    setOpenPopUp(prevCondition => !prevCondition);
  };
  // main window option
  const mainWindowOptionValueState = event => {
    setMainWindowOptionValue(event.target.value);
  };
  // popup window option
  const optionValueState = event => {
    setOptionValue(event.target.value);
  };
  // Fetch Data from Database
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3051/database?status=${mainWindowOptionValue}&orderBy=dateoftask`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await response.json();
      setDatabase(data);
    } catch (error) {
      console.log(error);
    }
  };
  // delete button
  const deleteTaskButton = async id => {
    try {
      await fetch('http://localhost:3051/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id }),
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  // updates view of tasks
  useEffect(() => {
    fetchData();
  }, []);
  // Function to handle adding a new task
  const addTaskButton = event => {
    fetch('http://localhost:3051/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: titleInputValueField.trim(),
        status: optionValue.trim(),
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // Handle the response data as needed
        if (data) {
          // Update the state or perform any necessary actions
          fetchData(); // to be able to fetch newly added title
        } else {
          // Handle the case when the request was not successful
          console.log('Data is undefined');
        }
      })
      .catch(error => console.log(error));

    if (titleInputValueField !== '') {
      // Create a new task object with the desired title
      const newTaskTitle = {
        Title: titleInputValueField,
        Completed: optionValue === 'Complete',
        Incompleted: optionValue === 'Incomplete',
      };
      // Update the state by adding the new task to the existing array
      setAddedTask([...addedTask, newTaskTitle]);
      setOpenPopUp(prevCondition => !prevCondition);
    } else {
      console.log('it is empty');
    }
  };
  // map within database
  const renderItems = () => {
    let filteredData = database;

    if (mainWindowOptionValue !== 'All') {
      filteredData = database.filter(
        data => data.status === mainWindowOptionValue
      );
    }
    // Sort the data based on the date column in descending order
    filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
    return filteredData.map((data, index) => (
      <div
        className="flex flex-column w-100 items-center justify-between"
        key={index}
      >
        {
          // If status is All
          mainWindowOptionValue === 'All' && (
            <TaskOptionAll
              filteredData={filteredData}
              mainWindowOptionValue={mainWindowOptionValue}
              database={database}
              checkboxValue={checkboxValue}
              deleteTaskButton={deleteTaskButton}
              id={data.id}
              status={data.status}
              title={data.title}
              index={index}
            />
          )
        }
        {
          // If status is Complete
          mainWindowOptionValue === 'Complete' && (
            <TaskOptionComplete
              filteredData={filteredData}
              mainWindowOptionValue={mainWindowOptionValue}
              database={database}
              checkboxValue={checkboxValue}
              deleteTaskButton={deleteTaskButton}
              id={data.id}
              status={data.status}
              title={data.title}
              index={index}
            />
          )
        }
        {
          // If status is Incomplete
          mainWindowOptionValue === 'Incomplete' && (
            <TaskOptionIncomplete
              filteredData={filteredData}
              mainWindowOptionValue={mainWindowOptionValue}
              database={database}
              checkboxValue={checkboxValue}
              deleteTaskButton={deleteTaskButton}
              id={data.id}
              status={data.status}
              title={data.title}
              index={index}
            />
          )
        }
      </div>
    ));
  };

  return (
    <div className="w-50">
      <div className="outline w-100 flex justify-between br3">
        <button onClick={togglePopUp}>Add Task</button>
        <select
          className=""
          onChange={mainWindowOptionValueState}
          value={mainWindowOptionValue}
        >
          <option value="All"> All </option>
          <option value="Incomplete"> Incomplete </option>
          <option value="Complete"> Complete </option>
        </select>
      </div>
      {openPopUp && (
        <PopUp
          togglePopUp={togglePopUp}
          getTitleInputValueField={getTitleInputValueField}
          addTaskButton={addTaskButton}
          cancelButton={cancelButton}
          optionValueState={optionValueState}
          optionValue={optionValue}
        />
      )}
      <div className="w-100 br3 outline">
        <div className="flex flex-column items-start ml4 mt3">
          <Scroll>{renderItems()}</Scroll>
        </div>
      </div>
    </div>
  );
};

export default Body;

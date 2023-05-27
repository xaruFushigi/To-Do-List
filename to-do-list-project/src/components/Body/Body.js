import React, {useState, useEffect} from 'react';
import PopUp from './PopUp';
//CSS
import style from './Body.module.css';
const Body = () => {
    
    const [openPopUp, setOpenPopUp] = useState(false);
    const [titleInputValueField, setTitleInputValueField] = useState('');
    const [optionValue, setOptionValue] = useState('Incomplete');
    const [mainWindowOptionValue, setMainWindowOptionValue] = useState('All');
    const [addedTask, setAddedTask] = useState([]);
    const [checkboxFieldValue, setCheckboxFieldValue] = useState(false); 
    const [database, setDatabase] = useState([]);
    //receives title of the task from input
    const getTitleInputValueField = (event) => { setTitleInputValueField(event.target.value);};
    //Add task PopUp window
    const togglePopUp = (event) => { setOpenPopUp(prevCondition => !prevCondition) };
    //checkbox 
    const checkboxValue = (event) => { setCheckboxFieldValue(event.target.value);};
    //cancel button
    const cancelButton = (event) => { setOpenPopUp(prevCondition => !prevCondition) };
    //main window option 
    const mainWindowOptionValueState = (event) => {setMainWindowOptionValue(event.target.value)};
    //popup window option
    const optionValueState = (event) => { setOptionValue(event.target.value);};
    // Fetch Data from Database
    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3051/database', {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          console.log(data)
          setDatabase(data);
        } catch (error) { console.log(error) }
      };
    //delete button
    const deleteTaskButton = async (id) => {
        try{ 
            const response = await fetch('http://localhost:3051/delete', {
                                            method: 'DELETE',
                                            headers: {'Content-Type' : 'application/json'},
                                            body : JSON.stringify({ id: id }),
                                        });
                                        const data = await response.json();
                                        fetchData();
            } catch (error) { console.log(error) }};
    //updates view of tasks
      useEffect(() => {
        fetchData();
      }, []);
    // Function to handle adding a new task
        const addTaskButton = (event) => {
            fetch('http://localhost:3051/', {
                method  : 'post',
                headers : {'Content-Type' : 'application/json'},
                body    : JSON.stringify({
                        title  : titleInputValueField.trim(),
                        status : optionValue.trim(),
                })
            })
            .then(response => {return response.json()})
            .then(data => {
                // Handle the response data as needed
                if (data) {
                // Update the state or perform any necessary actions
                fetchData()     //to be able to fetch newly added title
                } else {
                // Handle the case when the request was not successful
                console.log('Data is undefined');
          }
            })
            .catch(error => console.log(error))
    
            if(titleInputValueField !== '') {
                // Create a new task object with the desired title
                const newTaskTitle = { Title: titleInputValueField, 
                                       Completed: optionValue === 'Complete',
                                       Incompleted: optionValue === 'Incomplete' 
                                     };
                // Update the state by adding the new task to the existing array
                setAddedTask([...addedTask, newTaskTitle]);
                setOpenPopUp(prevCondition => !prevCondition);
            }
            else{
                console.log('it is empty');
            }  
        };
    //map within database
    const renderItems = () => {
        return database.map((data, index)=> (
            <div className='flex flex-row w-100 items-center justify-between' key={data.id}>
                { // If status is All
                (mainWindowOptionValue === 'All') 
                &&
                <div>
                    <div className='flex flex-row'>
                        <input type='checkbox' onChange={checkboxValue} className='mr1'/>
                        <p >{data.title}</p>
                    </div>
                    <div className='mr3'>
                        <button key={index} onClick={()=> {deleteTaskButton(data.id)}}>delete</button>
                    </div>
                </div>    
                }
                { //If status is Complete
                    (mainWindowOptionValue === 'Complete' && data.status === mainWindowOptionValue )
                    &&
                    <div>
                        <div className='flex flex-row'>
                            <input type='checkbox' onChange={checkboxValue} className='mr1'/>
                            <p >{data.title}</p>
                        </div>
                        <div className='mr3'>
                            <button key={index} onClick={()=> {deleteTaskButton(data.id)}}>delete</button>
                        </div>
                    </div> 
                }
                {  //If status is Incomplete
                    (mainWindowOptionValue === 'Incomplete' && data.status === mainWindowOptionValue )
                    &&
                    <div>
                        <div className='flex flex-row'>
                            <input type='checkbox' onChange={checkboxValue} className='mr1'/>
                            <p >{data.title}</p>
                        </div>
                        <div className='mr3'>
                            <button key={index} onClick={()=> {deleteTaskButton(data.id)}}>delete</button>
                        </div>
                    </div> 
                }
            </div>
        ))
    }; 

    return(
        <div className='w-50'>
            <div className='outline w-100 flex justify-between br3'>
                <button onClick={togglePopUp} >Add Task</button>
                <select className='' onChange={mainWindowOptionValueState} value={mainWindowOptionValue}>
                    <option value="All"       > All        </option>
                    <option value="Incomplete" > Incomplete </option>
                    <option value="Complete"  > Complete   </option>
                </select>
            </div>
            { openPopUp 
                && 
              <PopUp  togglePopUp={togglePopUp} 
                      getTitleInputValueField={getTitleInputValueField} 
                      addTaskButton={addTaskButton} 
                      cancelButton={cancelButton} 
                      optionValueState={optionValueState} 
                      optionValue={optionValue}
             />
            }
            <div className='w-100 br3 outline'>
                <div className='flex flex-column items-start ml4'>
                    {renderItems()}
                </div>
            </div>

            
        </div>
    )
};

export default Body;
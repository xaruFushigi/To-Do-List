import React, {useState} from 'react';
import PopUp from './PopUp';
//CSS
import style from './Body.module.css';
const Body = () => {
    
    const [openPopUp, setOpenPopUp] = useState(false);
    const [titleInputValueField, setTitleInputValueField] = useState('');
    const [optionValue, setOptionValue] = useState('Incomplete');
    const [addedTask, setAddedTask] = useState([]);
    const [checkboxFieldValue, setCheckboxFieldValue] = useState(false); 

    const getTitleInputValueField = (event) => { setTitleInputValueField(event.target.value);};

    const togglePopUp = (event) => {
        event.preventDefault();
        setOpenPopUp(prevCondition => !prevCondition);
    };
    // Function to handle adding a new task
    const addTask = (event) => {
        console.log(optionValue)
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
            console.log(data)
            // Handle the response data as needed
            if (data) {
            // Update the state or perform any necessary actions
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
    //cancel button
    const cancelButton = (event) => {
        event.preventDefault();
        setOpenPopUp(prevCondition => !prevCondition);
    };
    //checkbox 
    const checkboxValue = () => { setCheckboxFieldValue(prevData => !prevData);};
    //option
    const optionValueState = (event) => { setOptionValue(event.target.value);};
    //separates tasks into Completed and Incompleted
    const completedTaskList = addedTask.filter((task) => task.Completed);
    const incompletedTaskList = addedTask.filter((task) => task.Incompleted);


    return(
        <div className='w-50'>
            <div className='outline w-100 flex justify-between br3'>
                <button onClick={togglePopUp} >Add Task</button>
                <select className='' onChange={optionValueState} value={optionValue}>
                    <option value="All"       > All        </option>
                    <option value="Incomlete" > Incomplete </option>
                    <option value="Complete"  > Complete   </option>
                </select>
            </div>
            { openPopUp 
                && 
              <PopUp  togglePopUp={togglePopUp} 
                      getTitleInputValueField={getTitleInputValueField} 
                      addTask={addTask} 
                      cancelButton={cancelButton} 
                      optionValueState={optionValueState} 
                      optionValue={optionValue}
             />
            }
            <div className='w-100 br3 outline'>
                <div>
                {optionValue === 'Complete' &&
                    completedTaskList.map((task, index) => (
                    <div className='flex flex-row justify-start items-start ml2' key={index}>
                        <div className='mr2'>
                        <input
                            type='checkbox'
                            checked={task.Completed}
                            onChange={() => {
                            const updatedTask = [...addedTask];
                            updatedTask[index].Completed = task.Completed;
                            setAddedTask(updatedTask);
                            }}
                        />
                        </div>
                        <div>
                        <p>{task.Title}</p>
                        </div>
                    </div>
                    ))}

                {optionValue === 'Incomplete' &&
                    incompletedTaskList.map((task, index) => (
                    <div className='flex flex-row justify-start items-start ml2' key={index}>
                        <div className='mr2'>
                        <input
                            type='checkbox'
                            checked={task.Incompleted}
                            onChange={() => {
                            const updatedTask = [...addedTask];
                            updatedTask[index].Incompleted = task.Incompleted;
                            setAddedTask(updatedTask);
                            }}
                        />
                        </div>

                        <div>
                        <p>{task.Title}</p>
                        </div>
                    </div>
                 ))}

            </div>
        </div>

            
        </div>
    )
};

export default Body;




// <div className='w-100 br3 outline'>
// <div>
// {addedTask.length === 0 ? 
//     ( <p>No Todos</p> ) 
//     :
//     ( addedTask.map((task, index) => ( 
//         <div className='flex flex-row justify-start items-start ml2' key={index}>
//             {/* Checkbox */}
//             <div className='mr2'>
//                 <input key={task.Title}              //   {/*assigns a unique key to each checkbox element*/}
//                        type='checkbox'                  
//                        checked={task.Completed}      //   {/* sets the checked attribute of the checkbox based on the Completed property of the task */}
//                        onChange={()=> {                 
//                         const updatedTask = [...addedTask]; {/* creates a new copy of the addedTask array using the spread operator */}
//                         updatedTask[index].Completed = !task.Completed;    {/* This line toggles the Completed property of the corresponding task in the updatedTask array */}
//                         setAddedTask(updatedTask);  {/* updates the addedTask state with the modified updatedTask array, effectively updating the checkbox's state and reflecting the changes in the UI */}
//                        }} /> 
//             </div>
//             {/* titel of todo task */}
//             <div>
//                 <p> {task.Title} </p>
//             </div>
//         </div> 
//         ))
//     )
// }
// </div>
// </div>
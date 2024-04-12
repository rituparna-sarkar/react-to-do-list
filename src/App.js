

import { useEffect, useState } from 'react';
import Navbar from './Component/Navbar';
import { v4 as uuidv4 } from 'uuid';
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function App() {
const [todo, setTodo]=useState('')
const[todos,setTodos]=useState([])

const savetols=(params)=>{
  localStorage.setItem("todos", JSON.stringify(todos))
}

const handleAdd=()=>{
  setTodos([...todos,{id:uuidv4(),todo, isCompleted:false}])
  setTodo('')
  savetols();
}

const handleChange =(e)=>{
 setTodo(e.target.value)
}
function handleDelete(e,id){
  let newTodos=todos.filter(item=>{
    return item.id!==id
  });
  setTodos(newTodos)
  savetols()
  

}


function HandleEdit(e,id){
 let t=todos.filter(i=>i.id===id)
 setTodo(t[0].todo)
 let newTodos=todos.filter(item=>{
  return item.id!==id
});
setTodos(newTodos)
savetols()
}

const handleCheckbox=(e)=>{
  let id=e.target.name;

  let index=todos.findIndex((item)=>{
      return item.id===id;
  })

  let newTodos=[...todos];
  newTodos[index].isCompleted=!newTodos[index].isCompleted;
  setTodos(newTodos)
  savetols()
  
}
useEffect(()=>{
  let todos=JSON.parse(localStorage.getItem("todos"))
  setTodos(todos)
},[])


  return (
    <div className="App">
      <Navbar/>
      <h1 className="">Your Todolist</h1>
      <fieldset className='container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]'>
        <div className='addTodo'>
          <h1 className='tex-lg font-bold'>add a todo</h1>
          <input className='rounded-md h-8' type='text' value={todo} onChange={handleChange}/>
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-800 rounded-md text-white mx-6 px-3 py-1'>Add</button>
        </div>
        <h1 className='text-lg font-bold'> Your Todo</h1>
        <div className='todos'>
          {todos.length===0 &&<div className='m-5'> no todos to display</div>
    
  }
          { 
           todos.map(item=>{
           return <div className='todo flex justify-between my-3' key={item.id}>
            <input
            type='checkbox'
            value={item.isCompleted}
            name={item.id}
            id=''
            onChange={handleCheckbox}
            />
          <div className={item.isCompleted?'line-through':""} >
            {item.todo}

          </div>
          <div className='button'>
            <button onClick={(e)=>HandleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-800 rounded-md text-white mx-2 px-3 py-1'>Edit</button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-800 rounded-md text-white mx-2 px-3 py-1'>delete</button>
          </div>
          </div>
         })

        } </div>
          
    
      </fieldset>
    </div>
  );
}

export default App;

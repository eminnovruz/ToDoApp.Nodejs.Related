import React, { useContext, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import Context from '../ContextWrapper'


function Create({dispatch , setCards, email}) {
    const {lightMode } = useContext(Context)
    const [formData, setFormData] = useState({})
    const createCard = async (e) => {
        e.preventDefault();
        try {
            const request = await fetch("http://localhost:3000/cards",
            {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(formData),
                headers: 
                {
                    "Content-type": "application/json"
                }
            })
            const response = await request.json()
            console.log(formData)
            console.log(response)
        } catch (error) {
            console.log(error)
        }

        dispatch({type: ''})
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevForm)=>({
            ...prevForm,
            [name]:value,
            author:email,
            id : uuidv4(),
        }));
    }


  return (
    <div  className='w-screen h-screen flex flex-col justify-center items-center'>
    <form className={`${lightMode ? "bg-[#B9D7EA]" : "bg-[#393E46]"} text-[#eee] h-auto w-screen sm:w-[400px]  rounded-[16px] p-3`}>
        <h1 className='text-2xl font-bold text-center'>Create New Card!</h1>
        <div className='flex mt-2 flex-col p-1'>
            <label>Title</label>
            <input name='title' className='font-bold rounded-[9px] text-black' type='text'
            onChange={(e) => {
                handleChange(e);
            }}
            ></input>
        </div>
        
        <div className='flex flex-col p-1'>
            <label>Description</label>
            <input name='description' type='text' className='font-bold rounded-[9px] text-black' required
            onChange={(e) => {
                handleChange(e);
            }}
            >
                
            </input>
        </div>
        
        <div className='mt-5 float-right'>
            <button type='submit' className={`${lightMode ? "bg-[#769FCD]" : " bg-[#00ADB5] text-[#eee]" } m-2 text-[#eee] rounded-[9px] p-1 font-bold`}
            onClick={(e) => {
                createCard(e);
            }}
            >Add!</button>
            <button type='submit' className={` ${lightMode ? "bg-[#769FCD]" : " bg-[#00ADB5] text-[#eee]" } text-[#eee] rounded-[9px] p-1 font-bold`}
            onClick={() => {
                dispatch({type: ''})
            }}
            >Cancel!</button>
        </div>
        
    </form>
    </div>
  )
}

export default Create
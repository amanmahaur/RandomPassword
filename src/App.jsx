import { useRef } from 'react';
import { useState,useCallback,useEffect } from 'react'

function App() {
  const [color, setcolor] = useState("olive");
  const [length, setlen] = useState(8);
  const [numallow, setnumallow] = useState(false);
  const [charallow, setcharallow] = useState(false);
  const [password, setpassword] = useState("");
  const passwordRef=useRef(null)
  const passwordgen=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numallow)str+="0123456789";
    if(charallow) str+="!@#$%^&*+_-=[]{}()"
    for(let i=1;i<=length;i++)
    {
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setpassword(pass);
  },[length,numallow,charallow,setpassword])
useEffect(()=>{
passwordgen();
},[length,numallow,charallow,setpassword,passwordgen])
  
const copier= useCallback(()=>{
  passwordRef.current?.select()
window.navigator.clipboard.writeText(password); 
},[password])
  return (
    <>
      <div className='w-full max-w-md shadow-lg rounded-lg mx-auto px-4 my-8 text-orange-800 bg-gray-800 text-center'>
        <h1 className='text-white text-2xl'>Password Generator</h1>
        <div className='flex shadow-lg mb-4 rounded-lg overflow-hidden py-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-4 rounded-lg' placeholder='Password...' readOnly  ref={passwordRef} id="" />
          <button onClick={copier}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 justify-between'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={14} value={length} className='cursor-pointer' onChange={(e)=>{
               setlen(e.target.value)
            }} id="" />
            <label >Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numallow}
            onChange={()=>{
              setnumallow((prev)=>!prev);
            }} name="" id="numberInput" />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={charallow}
            onChange={()=>{
              setcharallow((prev)=>!prev);
            }} name="" id="charInput" />
            <label htmlFor="charInput">characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App


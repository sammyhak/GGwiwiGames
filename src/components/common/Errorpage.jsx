import React from 'react'
import error_img from "../../assets/api.gif"
import { useNavigate } from 'react-router-dom'
const Errorpage = () => {
  const navigate=useNavigate();
  return (
    <section className='flex justify-center w-full h-screen items-center'>
      <div className='text-center'>
        <img className='w-[200px] block m-auto' src={error_img} alt="" />
        <h2 className='text-[25px] font-[600] mt-[10px] text-red-500'>Please,Connect Api!</h2>
        <button    onClick={() => navigate(-1)}  className='px-[20px] py-[10px] cursor-pointer bg-[#FFB805] font-[600] text-[16px] text-black rounded-[5px] mt-[20px]'>Go Back</button>
      </div>
    </section>
  )
}

export default Errorpage

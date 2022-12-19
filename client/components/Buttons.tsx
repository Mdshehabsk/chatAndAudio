import {} from 'react'
import style from '../styles/button.module.css'
const Buttons = ({children,btnFun,background}:{children:any,btnFun:any,background:string}) => {
  return (
    <>
    <button className={`${style.btn} ${ background == 'red' ? style.red : style.green} `} onClick={btnFun} > {children} </button>
    </>
  )
}

export default Buttons
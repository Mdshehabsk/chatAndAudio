import React from 'react'
import style from '../styles/menuBar.module.css'
const Menubar = ({activeMenuFn}:{activeMenuFn:(arg0: number)=> void}) => {
  return (
    <div className={style.menu_bar}>
    <div className={style.menu_bar_container} >
        <div className={style.chat} onClick={() => activeMenuFn(1)} >
        <i className='bx bx-message-dots'></i>
        </div>
        {/* <div className={style.call} onClick={() => activeMenuFn(2)} >
        <i className='bx bx-phone'></i>
        </div> */}
        <div className={style.active} onClick={() => activeMenuFn(3)} >
        <i className='bx bx-check'></i>
        </div>
    </div>
</div>
  )
}

export default Menubar
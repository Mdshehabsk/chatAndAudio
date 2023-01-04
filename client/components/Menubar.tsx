import React from 'react'
import style from '../styles/menuBar.module.css'
const Menubar = ({activeMenuFn,menu}:{activeMenuFn:(arg0: number)=> void,menu:any}) => {
  return (
    <div className={style.menu_bar}>
    <div className={style.menu_bar_container} >
        <div className={  `${style.chat}  ${menu === 1 && style.active} `} onClick={() => activeMenuFn(1)} >
        <i className='bx bx-message-dots'></i>
        </div>
        {/* <div className={style.call} onClick={() => activeMenuFn(2)} >
        <i className='bx bx-phone'></i>
        </div> */}
        <div className={`style.chat ${menu === 3 && style.active} `} onClick={() => activeMenuFn(3)} >
        <i className='bx bx-check'></i>
        </div>
    </div>
</div>
  )
}

export default React.memo(Menubar)
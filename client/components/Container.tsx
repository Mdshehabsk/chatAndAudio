import React, { useEffect } from 'react'
import Left from './Left'
import Right from './Right'
// import style from '../styles/container.module.css'
import CallModal from './CallModal'
import { useAppSelector } from '../toolkit/store/hook'
import CallPageModal from './CallPageModal/index'
const Container = ({styleCss}:{styleCss:any}) => {
  const {callModal,callPageModal} = useAppSelector(state => state.call)
  return (
    <div className={styleCss.container}>
        {callModal && <CallModal />}
        {
         callPageModal && <CallPageModal/>
        }
        <Left styleCss={styleCss} />
        <Right styleCss={styleCss} /> 
      </div>
  )
}

export default Container

import React from 'react'
import dance from '../../assets/skaven-dance.gif'
import './BoofCounerCSS.css'

const BoofCounter = ({booffCounter, onClick})=>{
    
    return(
    <div onClick={onClick} style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: '20vw'}}>
      <img src={dance} style={{height: '400px'}} alt='dance'></img>
      <h1>{booffCounter}</h1>
    </div>)
}

export default BoofCounter;
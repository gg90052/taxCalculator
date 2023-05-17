import CSS from 'csstype';
import { useState } from 'react';

const Numpad = (props: { onNumPadClick: Function }) => {
  const { onNumPadClick } = props;
  const calcCss: CSS.Properties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 80px',
    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
    gridColumnGap: '10px',
    gridRowGap: '10px',
    justifyItems: 'stretch',
    alignItems: 'stretch',
    // backgroundColor: '#3a3331',
    padding: '10px',
  }
  const enterBtn: CSS.Properties = {
    gridArea: "2 / 4 / 6 / 5",
  }
  const backspaceBtn: CSS.Properties = {
    gridArea: "1 / 2 / 2 / 5",
  }
  const padClick = (num: string) => () => {
    onNumPadClick(num);
  }
  const clearNum = () => {
    onNumPadClick('clear');
  }
  const backspace = () => {
    onNumPadClick('backspace');
  }
  const enter = () => {
    onNumPadClick('enter');
  }
  
  return (
    <div style={calcCss}>
      <button onClick={ clearNum } className="numpad_btn">AC</button>
      <button onClick={ backspace } className="numpad_btn" style={ backspaceBtn }>&lt;- back</button>
      <button onClick={ padClick('7') } className="numpad_btn">7</button>
      <button onClick={ padClick('8') } className="numpad_btn">8</button>
      <button onClick={ padClick('9') } className="numpad_btn">9</button>
      <button onClick={ enter } className="numpad_btn numpad_enter" style={ enterBtn }>enter</button>
      <button onClick={ padClick('4') } className="numpad_btn">4</button>
      <button onClick={ padClick('5') } className="numpad_btn">5</button>
      <button onClick={ padClick('6') } className="numpad_btn">6</button>
      <button onClick={ padClick('1') } className="numpad_btn">1</button>
      <button onClick={ padClick('2') } className="numpad_btn">2</button>
      <button onClick={ padClick('3') } className="numpad_btn">3</button>
      <button onClick={ padClick('0') } className="numpad_btn">0</button>
      <button onClick={ padClick('00') } className="numpad_btn">00</button>
      <button onClick={ padClick('.') } className="numpad_btn">.</button>
    </div>
  )
}

export default Numpad
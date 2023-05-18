import { Fragment, useMemo, useState } from "react";
import Numpad from "./Numpad";
import Result from "./Result";
import UnitSelect from "./UnitSelect";
import { taxRule } from '../taxRule';


const InputMoney = () => {
  const [unit, setUnit] = useState(localStorage.unit || 'JPY');
  const [inputValue, setInputValue] = useState('0');
  const [showNumpad, setShowNumpad] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showUnitSelect, setShowUnitSelect] = useState(true);
  const showNumpadHandler = () => {
    setShowNumpad(true);
    setShowResult(false);
    setShowUnitSelect(false);
  }
  const showUnitHandler = () => {
    setShowNumpad(false);
    setShowResult(false);
    setShowUnitSelect(true);
  }
  const numPadInput = (num: string) => {
    switch (num) {
      case 'backspace':
        if (inputValue !== '0'){
          setInputValue(inputValue.slice(0, -1));
        }
      break;
      case 'clear':
        setInputValue('0');
      break;
      case 'enter':
        setShowNumpad(false);
        setShowResult(true);
      break;
      default:
        if (inputValue === '0' && num !== '.'){
          setInputValue(num);
        }else{
          setInputValue(inputValue + num);
        }
      break;
    }
  }
  const unitChangeHandler = (unit: string) => {
    setUnit(unit);
    setShowUnitSelect(false);
    if (inputValue === '0'){
      setShowNumpad(true);
    }else{
      setShowResult(true);
    }
    
  }
  const targetUnit = useMemo(() => {
    return taxRule.filter((item) => item.code === unit)[0];
  }, [unit]);
  
  return (
    <>
      <div className="flex flex-wrap px-4 pt-10 relative z-10 text-white inputPanel">
        <div className="flex-shrink-0 w-2/3">
          <div className="text-3xl" onClick={ showNumpadHandler }>{ inputValue }</div>
          <div className="text-xs mt-4 text-gray-400">點擊上方數字輸入</div>
        </div>
        <div className="flex-shrink-0 w-1/3 text-yellow-500" onClick={ showUnitHandler }>
          <div className="text-3xl ">{ unit }</div>
          <div className="text-sm mt-4">{targetUnit.name}</div>
        </div>
      </div>
      <div className="overflowContainer">
        <div className={showNumpad ? '':'hidden'}>
          <Numpad onNumPadClick={ numPadInput } />
        </div>
        <div className={showResult ? '':'hidden'}>
          <Result inputValue={ inputValue } unit={ targetUnit } />
        </div>
        <div className={showUnitSelect ? '':'hidden'}>
          <UnitSelect onSetUnit={ unitChangeHandler } />
        </div>
      </div>
    </>
  );
};

export default InputMoney;
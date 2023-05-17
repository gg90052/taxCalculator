/* eslint-disable */
import React,{ useEffect, useMemo } from "react";
import { ContextStore } from "../App";
import { taxRuleType, ruleType } from "../taxRule";

const Result = (props: {inputValue: string, unit: taxRuleType}) => {
  const { inputValue, unit } = props;
  const [result, setResult] = React.useState(0);
  const [save, setSave] = React.useState(0);
  const currencyList = React.useContext(ContextStore);

  const fitRule = useMemo(() => {
    const rule = unit.rule.filter((item) => Number(inputValue) >= item.rangeMin && (Number(inputValue) <= item.rangeMax || item.rangeMax === -1));
    if (rule.length > 0){
      return rule[0];
    }else{
      return { 
        tax: 0,
        rangeMin: 0,
        rangeMax: 0,
      } as ruleType;
    } 
  }, [inputValue, unit]);
  
  useEffect(() => {
    setResult(Number(inputValue) * (1 - fitRule.tax));
  }, [inputValue, unit]);
  useEffect(() => {
    setSave(Number(inputValue) - Number(result));
  }, [result]);

  function numberCommaToFixed(num: number, nofix:boolean = false){
    let comma = new RegExp('\\B(?<!\\.\\d*)(?=(\\d{3})+(?!\\d))', 'g')
    if (nofix === true){
      return num.toString().replace(comma, ',')
    }else{
      return num.toFixed(2).toString().replace(comma, ',')
    }
    
  }
  return (
    <>
      <div className={fitRule.tax === 0 && Number(inputValue) > 0 ? '':'hidden'}>
        <div className="text-xl leading-10 mt-8">
          <p>金額不足</p>
          <p>{unit.nation}最低退稅金額為<span className="text-red-500">{unit.rule[0].rangeMin}</span></p>
        </div>
      </div>
      <div className={fitRule.fixNumber === true && Number(inputValue) > 0 ? '':'hidden'}>
        <div className="text-xl leading-10 mt-8">
          <p>{fitRule.rangeMin} - {fitRule.rangeMax} 為固定退稅金額</p>
          <p className="break-words">請參照：<a href={fitRule.link} target="_blank">{fitRule.link}</a></p>
        </div>
      </div>

      <div className={`mt-4 text-gray-700 ${fitRule.tax === 0 || fitRule.fixNumber === true ? 'hidden':''}`}>
        <div className="text-2xl leading-6">
          <p className="text-sm text-yellow-700">以下數字皆為約略計算僅供參考<br />實際金額會因退款方式及地點等因素有所影響</p>
          <p className="mt-4">
            <span className="block mb-2">實際支出</span>
            <span className="text-blue-500 font-bold text-3xl">{ numberCommaToFixed(result * currencyList[unit.code]) } </span> 
            TWD
          </p>
        </div>
        <div className="text-lg leading-6 mt-4">
        <p className="my-4 text-2xl center text-red-500">{unit.nation}</p>
          <div className="section_bg py-2 rounded-2xl mb-4 text-gray-700 mx-4">消費稅率：
            <span className="text-red-500">{ Number(fitRule.tax * 100).toFixed(2) + '%' }</span>
          </div>
          <p>省下： <span className="text-green-500 font-bold">{ numberCommaToFixed(save) }</span> { unit.code }</p>
          <p className="">{ numberCommaToFixed(Number(inputValue), true) } * { fitRule.tax } = { numberCommaToFixed(Number(inputValue) * fitRule.tax) }</p>
        </div>
        <div className="text-lg leading-6 px-4">
          <p className="mt-8 section_bg py-2 rounded-2xl mb-4 text-gray-700">目前匯率：
            { currencyList[unit.code] && <span className="">{ currencyList[unit.code].toFixed(5) + ' ' + unit.code } ＝ 1 TWD</span>}
          </p>
          <p className="mt-4">換算為新台幣</p>
          <p className="mb-4">{currencyList[unit.code] && numberCommaToFixed(Number(inputValue), true) + ' x ' + (currencyList[unit.code]).toFixed(5) + ' = ' + (Number(inputValue) * currencyList[unit.code]).toFixed(2)}</p>
          <p className="mb-2 flex justify-center"><span>刷卡金額：</span> <span className="text-red-500 font-bold w-1/2 flex-shrink-0">{ numberCommaToFixed(Number(inputValue) * currencyList[unit.code]) } </span></p>
          <p className="flex justify-center"><span>退稅金額：</span> <span className="text-green-500 font-bold w-1/2 flex-shrink-0">{ numberCommaToFixed(save * currencyList[unit.code]) } </span></p>
        </div>
      </div>
    </>
  );
};

export default Result;
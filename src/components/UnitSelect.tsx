import { Fragment, useState } from "react";
import { taxRule } from '../taxRule';

const UnitSelect = (props: { onSetUnit: Function }) => {
  const { onSetUnit } = props;
  const selectUnit = (code: string) => () => {
    localStorage.setItem("unit", code);
    onSetUnit(code);
  };
  return (
    <div className="mt-8 px-4">
      <p className="center text-2xl">請選擇國家(幣值單位)</p>
      <div className="mx-12 text-blue-700">
        {
          taxRule.map((item) => (
            <div className="flex justify-between mt-4" key={item.code} onClick={selectUnit(item.code)}>
              <p>{item.nation}</p>
              <p>{item.name}{item.code}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default UnitSelect;
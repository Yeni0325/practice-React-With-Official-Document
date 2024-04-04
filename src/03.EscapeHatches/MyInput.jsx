import { forwardRef } from "react";

const MyInput = (props, ref) => {
  return <input ref={ref}/>;
};

export default forwardRef(MyInput);
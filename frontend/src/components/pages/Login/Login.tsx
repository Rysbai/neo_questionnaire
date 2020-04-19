import React from "react";
import {PropsFromRedux} from "../../../containers/Login";


export default function (props: PropsFromRedux) {
  return (
    <div>
      <input
        type="text"
        value={props.nameValue}
        onChange={({target}) => props.actions.setNameValue(target.value)}
      />
      <button
        onClick={() => props.actions.auth()}
      >
        Submit
      </button>
    </div>
  )
};

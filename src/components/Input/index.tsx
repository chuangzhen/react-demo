import React from "react";

const InputIndex:React.FC<any> = (props) => {
    const {value='',...rest} = props

    return <div style={{padding:5}}>
        <input type="text" value={value}  {...rest} />

    </div>
}
InputIndex.displayName = 'input'

export default InputIndex
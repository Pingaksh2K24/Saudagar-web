import React from 'react'

const ValidationText = (props) => {
    return (
        props.error?
        <div className="font-normal validation-text-s mt-1 text-[#b92262]">{props.error}</div>
        :null
    )
}

export default ValidationText;

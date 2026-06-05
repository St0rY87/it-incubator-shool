import {ChangeEvent} from 'react';

type CheckBoxProps={
    isBooked:boolean
    updateCheckBox:(isBooked:boolean)=>void
}
export const CheckBox = ({isBooked, updateCheckBox}:CheckBoxProps) => {

    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        updateCheckBox(e.currentTarget.checked)
    }
    return (
        <input type="checkbox" checked={isBooked} onChange={onChangeHandler}/>
    );
};


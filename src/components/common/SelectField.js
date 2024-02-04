import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useState } from 'react'

const SelectField = ({ label, selectInfos, onSelectChanged }) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        onSelectChanged(event.target.value);
    };

    return (
        <FormControl size="small" sx={{ width: '100%' }}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={handleChange}
            >
                <MenuItem value=""></MenuItem>
                {
                    selectInfos.map((selectInfo, index) => (
                        <MenuItem key={index} value={selectInfo.value}>{selectInfo.label}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}

export default SelectField
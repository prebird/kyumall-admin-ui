import React from 'react';
import { Select, TextField, Typography } from "@mui/material";
import SelectField from './SelectField';
import { Box } from '@mui/system';

export const FormField = ({ field: {
    input,
    name,
    label,
    type = "text",
    rows = undefined,
    disabled = undefined,
    errorText = undefined,
    required = false,
    autoFocus = false,
    autoComplete = null,
    hintText = undefined,
    placeholder = undefined,
    selectInfos = [],                // select 일 경우
    meta: { touched, error } },
}) => {
    const isError = error ? true : false;

    if (type === "select") {        // selectBox 표출
        return (
            <Box display='flex' flexDirection='column' my={1}>
                {/* input.onChange 를 넘겨주어야 redux-form의 value에 매핑됨 */}
                <SelectField label={label} selectInfos={selectInfos} onSelectChanged={input.onChange} />
                {errorText && <Typography variant='caption' color='red'>{errorText}</Typography>}
            </Box>
        )
    }

    return (
        <div>
            <TextField
                margin="normal"
                required={required}
                fullWidth
                id={name}
                label={label}
                type={type}
                multiline={rows != undefined ? true : false}
                rows={rows ?? rows}
                name={name}
                autoFocus={autoFocus}           // 페이지 이동시 자동 포커스
                autoComplete={autoComplete}     // 자동 완성 (브라우저 내 캐시)
                helperText={touched && error}   // 포커스 떠나고, 에러가 있으면 메서지 표시
                error={isError}        // 포커스 떠나고, 에러가 있으면 빨간색으로 표시
                placeholder={placeholder}
                {...input}
                size='small'
                disabled={disabled}
            />
            {errorText && <Typography variant='caption' color='red'>{errorText}</Typography>}
            {hintText && <Typography variant="caption" color="text.secondary">{hintText}</Typography>}
        </div>
    );
};
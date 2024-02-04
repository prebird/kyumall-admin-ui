import { Button, Grid, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requestCreateTerm } from '../../slice/termSlice';
import { FormField } from '../common/FormField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    //border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const termTypeSelectInfos = [
    { label: "필수", value: "REQUIRED" },
    { label: "선택", value: "OPTIONAL" }
]

const termStatusSelectInfos = [
    { label: "사용중", value: "INUSE" },
    { label: "미사용", value: "UNUSED" }
]

const inputInfos = [
    { label: "약관명", key: "name", type: "text", selectInfos: undefined },
    { label: "약관유형", key: "type", type: "select", selectInfos: termTypeSelectInfos },
    { label: "상태", key: "status", type: "select", selectInfos: termStatusSelectInfos },
    { label: "정렬순서", key: "ordering", type: "number", selectInfos: undefined }
]

const renderTextComponent = (field) => {
    return <FormField field={field} />
}

const convertToFormErrors = (serverErrors) => {
    const formErrors = {};
    if (serverErrors && Array.isArray(serverErrors)) {
        serverErrors.forEach(error => {
            formErrors[error.fieldName] = error.errorMessage;
        });
    }
    return formErrors;
}

let TermAdd = ({ handleSubmit, submitting, onClose }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const onSubmit = async (values) => {
        try {
            await dispatch(requestCreateTerm(values)).unwrap();
            onClose();
        } catch (error) {
            const formErrors = error != null ? convertToFormErrors(error.result) : {};
            console.log("serverErros", formErrors);
            setErrors(formErrors);
        }
    }

    return (
        <Box sx={style} display='flex' flexDirection='column'>
            <Typography variant='h6'>약관 추가</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <Box mb={2}>
                    <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={0}>
                        {
                            inputInfos.map((inputInfo, index) => (
                                <Grid item xs={4} sm={8} md={12} key={index}>
                                    {/* <TextField label={inputInfo.label} variant="outlined" size='small' defaultValue={inputInfo.defaultValue} fullWidth /> */}
                                    <Field
                                        component={renderTextComponent}
                                        name={inputInfo.key}
                                        label={inputInfo.label}
                                        type={inputInfo.type}
                                        selectInfos={inputInfo.selectInfos}
                                        errorText={errors[inputInfo.key]}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
                <Button type='submit' variant='contained' fullWidth>등록</Button>
            </Box>
        </Box>
    )
}

// const mapStateToProps = (state) => {
//     return { initialValues: state.smallGroupSlice.smallGroup }
// }

TermAdd = reduxForm({ form: 'TermAdd', enableReinitialize: true })(TermAdd); // enableReinitialize 설정 추가해 주어야 바인딩됨
//TermAdd = connect(mapStateToProps, null)(TermAdd);
export default TermAdd
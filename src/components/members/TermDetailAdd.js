import { Grid, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { FormField } from '../common/FormField';
import { Field, reduxForm } from 'redux-form';
import { requestCreateTermDetail } from '../../slice/termSlice';

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

const inputInfos = [
    { label: "약관ID", key: "termId", type: "text", selectInfos: undefined, rows: undefined, disabled: true },
    { label: "약관제목", key: "title", type: "text", selectInfos: undefined, rows: undefined, disabled: false },
    { label: "약관내용", key: "content", type: "text", selectInfos: undefined, rows: 10, disabled: false },
    { label: "버전", key: "version", type: "number", selectInfos: undefined, rows: undefined, disabled: false }
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

let TermDetailAdd = ({ termId, handleSubmit, submitting, onClose }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const onSubmit = async (values) => {
        try {
            await dispatch(requestCreateTermDetail(values)).unwrap();
            onClose();
        } catch (error) {
            const formErrors = error != null ? convertToFormErrors(error.result) : {};
            console.log("serverErros", formErrors);
            setErrors(formErrors);
        }
    }

    return (
        <Box sx={style} display='flex' flexDirection='column'>
            <Typography variant='h6'>약관 상세 추가</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <Box mb={2}>
                    <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={0}>
                        {
                            inputInfos.map((inputInfo, index) => (
                                <Grid item xs={4} sm={8} md={12} key={index}>
                                    <Field
                                        component={renderTextComponent}
                                        name={inputInfo.key}
                                        label={inputInfo.label}
                                        type={inputInfo.type}
                                        rows={inputInfo.rows}
                                        selectInfos={inputInfo.selectInfos}
                                        errorText={errors[inputInfo.key]}
                                        disabled={inputInfo.disabled}
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

const mapStateToProps = (state, ownProps) => {
    return { initialValues: { termId: ownProps.termId } }
}

TermDetailAdd = reduxForm({ form: 'TermDetailAdd', enableReinitialize: true })(TermDetailAdd); // enableReinitialize 설정 추가해 주어야 바인딩됨
TermDetailAdd = connect(mapStateToProps, null)(TermDetailAdd);
export default TermDetailAdd;
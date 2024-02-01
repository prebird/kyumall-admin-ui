import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'

const termColumns = [
    { field: 'termId', headerName: 'ID', width: 15 },
    { field: 'name', headerName: '약관명', width: 200 },
    { field: 'type', headerName: '약관타입' },
    { field: 'inuse', headerName: '사용중' },
    { field: 'createdAt', headerName: '등록일' }
]

const termRows = [
    { id: 1, termId: 1, name: "개인정보 동의약관", type: "필수", inuse: "true", createdAt: "2023.01.01" },
    { id: 2, termId: 2, name: "서비스 이용 약관", type: "필수", inuse: "true", createdAt: "2023.01.01" },
    { id: 3, termId: 3, name: "마케팅 동의약관", type: "선택", inuse: "true", createdAt: "2023.01.01" }
];

const termDetailColumns = [
    { field: 'id', headerName: 'ID', width: 15 },
    { field: 'termId', headerName: '약관ID', width: 15 },
    { field: 'title', headerName: '제목', width: 150 },
    { field: 'content', headerName: '내용', width: 150 },
    { field: 'version', headerName: '버전', width: 15 },
    { field: 'createdAt', headerName: '등록일' },
]

const termDetailRows = [
    { id: 1, termId: 1, title: "개인정보 동의약관", content: "개인정보 동의합니다..", version: 1, createdAt: "2023.01.01" },
    { id: 2, termId: 1, title: "민감정보 동의약관", content: "민감정보 사용에 동의..", version: 2, createdAt: "2023.01.01" },
    { id: 3, termId: 1, title: "개인정보 사용동의", content: "개인정보 사용에 ..", version: 3, createdAt: "2023.01.01" },
    { id: 4, termId: 2, title: "kyumall 사용동의", content: "서비스 이용에 ..", version: 1, createdAt: "2023.01.01" },
    { id: 5, termId: 2, title: "kyumall 사용동의", content: "서비스 이용에 ..", version: 2, createdAt: "2023.01.01" },
    { id: 6, termId: 3, title: "마케팅 이용동의", content: "마케팅에 개인정보 ..", version: 1, createdAt: "2023.01.01" },
    { id: 7, termId: 3, title: "마케팅 정보제공동의", content: "마케팅 정보를 ..", version: 2, createdAt: "2023.01.01" }
]



const TermManage = () => {
    const [selectedTerm, setSelectedTerm] = useState({ termId: "", name: "", type: "", inuse: "", createdAt: "" });

    const onTermRowClick = (e) => {
        const term = e.row;
        setSelectedTerm(term);
    }

    const onDetailTermRowClick = () => {

    }

    return (
        <Box mt={3}>
            <Grid container justifyContent='center'>
                <Grid item xs={10}>
                    <Typography variant='h5'></Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent='center' spacing={2}>
                <Grid item xs={5}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant='h6'>약관정보</Typography>
                        <Box sx={{ mt: 1, p: 2, display: 'flex', justifyContent: 'space-between' }} bgcolor="#FEEBC3">
                            <TextField label="약관명" variant="outlined" size='small' />
                            <Button variant='contained'>검색</Button>
                        </Box>
                    </Box>
                    <Box my={1}>
                        <Button variant='outlined'>약관 추가</Button>
                    </Box>
                    <DataGrid rows={termRows} columns={termColumns} onRowClick={onTermRowClick} />
                </Grid>
                <Grid item xs={5}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant='h6'>약관상세</Typography>
                        <Box sx={{ mt: 1, p: 2, display: 'flex', justifyContent: 'space-between' }} bgcolor="#EAF9FD">
                            <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={1}>
                                <Grid item xs={4} sm={4} md={6}>
                                    <TextField label="약관ID" variant="outlined" size='small' value={selectedTerm.termId} disabled />
                                </Grid>
                                <Grid item xs={4} sm={4} md={6}>
                                    <TextField label="약관 이름" variant="outlined" size='small' value={selectedTerm.name} disabled />
                                </Grid>
                                <Grid item xs={4} sm={4} md={6}>
                                    <TextField label="약관 타입" variant="outlined" size='small' value={selectedTerm.type} disabled />
                                </Grid>
                                <Grid item xs={4} sm={4} md={6}>
                                    <TextField label="사용중" variant="outlined" size='small' value={selectedTerm.inuse} disabled />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box my={1}>
                            <Button variant='outlined'>약관 상세 추가</Button>
                        </Box>
                        <DataGrid rows={termDetailRows} columns={termDetailColumns} onRowClick={onDetailTermRowClick} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TermManage
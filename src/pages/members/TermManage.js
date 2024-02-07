import { Button, Grid, Modal, TextField, Typography } from '@mui/material'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import TermAdd from '../../components/members/TermAdd';
import { useDispatch, useSelector } from 'react-redux';
import { requestSearchTerm } from '../../slice/termSlice';

const termColumns = [
    { field: 'id', headerName: 'ID', width: 15 },
    { field: 'name', headerName: '약관명', width: 200 },
    { field: 'type', headerName: '약관타입' },
    { field: 'status', headerName: '약관상태' },
    { field: 'ordering', headerName: '정렬' },
    { field: 'createdAt', headerName: '등록일' }
]

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
    const [searchTermText, setSearchTermText] = useState("");
    const [selectedTerm, setSelectedTerm] = useState({ termId: "", name: "", type: "", inuse: "", createdAt: "" });
    const [termModalOpen, setTermModalOpen] = useState(false);
    const terms = useSelector((state) => state.termSlice.searchedTerms);
    const dispatch = useDispatch();

    const searchTerm = async () => {
        try {
            const param = {
                termName: searchTermText
            }
            await dispatch(requestSearchTerm(param)).unwrap();
        } catch {
            console.log("약관 조회 에러");
        }
    }

    useEffect(() => {
        searchTerm();
    }, [])

    const onSearchClick = (e) => {
        e.preventDefault();
        searchTerm();
    }

    const onAddTermOpen = () => setTermModalOpen(true);
    const onAddTermClose = () => {
        setTermModalOpen(false);
        searchTerm();
    };

    const onTermRowClick = (e) => {
        const term = e.row;
        setSelectedTerm(term);
    }

    const onDetailTermRowClick = () => {

    }

    return (
        <div>
            <Box mt={3}>
                <Grid container justifyContent='center'>
                    <Grid item xs={10}>
                        <Typography variant='h5'></Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent='center' spacing={2}>
                    <Grid item xs={5}>
                        <Box>
                            <Typography variant='h6'>약관정보</Typography>
                            <Box sx={{ mt: 1, p: 2, display: 'flex', justifyContent: 'space-between' }} component='form' onSubmit={onSearchClick} bgcolor="#FEEBC3">
                                <TextField label="약관명" variant="outlined" size='small' value={searchTermText} onChange={(e) => setSearchTermText(e.target.value)} />
                                <Button variant='contained' type='submit'>검색</Button>
                            </Box>
                        </Box>
                        <Box my={1}>
                            <Button variant='outlined' onClick={onAddTermOpen}>약관 추가</Button>
                        </Box>
                        <DataGrid rows={terms} columns={termColumns} onRowClick={onTermRowClick} />
                    </Grid>
                    <Grid item xs={5}>
                        <Box>
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
            <Modal open={termModalOpen} onClose={onAddTermClose}>
                <ModalContent>
                    <TermAdd onClose={onAddTermClose} />
                </ModalContent>
            </Modal>
        </div>
    )
}

// mui 모달에 들어갈 컴포넌트에 forwardRef 로 ref를 전달해 주어야함
const ModalContent = React.forwardRef((props, ref) => (
    <span {...props} ref={ref}>
        {props.children}
    </span>
));

export default TermManage
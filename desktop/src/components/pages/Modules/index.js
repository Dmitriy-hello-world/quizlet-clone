import React, { useState, useEffect } from 'react'; 
import ModuleCard from '../../shared/Card';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import ReactPaginate from 'react-paginate';
import { TextField } from '@mui/material';
import Modal from '../../shared/Modal';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import { CircularProgress } from '@mui/material';
import { useCreateModuleMutation, useGetModulesQuery, useDeleteModuleMutation, useUpdateModuleMutation } from '../../../services/modules';
import { CREATE_MODULE_TABS, PER_PAGE } from '../../../constants';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './styles.scss'


export default function Modules(props) {
    const [ deleteModule ] = useDeleteModuleMutation();
    const [ createModule ] = useCreateModuleMutation();
    const [ updateModule ] = useUpdateModuleMutation();
    const [ tab, setTab ] = useState('Create')
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ injectFields, setInjectFields ] = useState({});
    const [ refreshKey, setRefresh ] = useState(new Date())
    const [ query, setQuery ] = useState({});
    const [ open, setOpen ] = useState(false);
    const [ search, setSearch ] = useState('');
    
    const [ tabs, setTabs ] = useState({
        Create: CREATE_MODULE_TABS,
        Update: CREATE_MODULE_TABS
    })

    useEffect(() => {
        setQuery({
            offset: currentPage * PER_PAGE,
            ...(search?.length > 2 ? { search } : {})
        })
    }, [ search, currentPage ])

    const { data, isLoading, isError, refetch } = useGetModulesQuery(query);

    const actions = {
        Create: async (payload) => {
            const { status, error } = await createModule(payload).unwrap();

            if (!status) throw error;
            
            refetch()
            return setOpen(false)
        },
        Update: async (payload) => {
            const { status, error } = await updateModule(payload).unwrap();

            if (!status) throw error;
            
            refetch()
            return setOpen(false)
        }
    }

    const handleAddModule = () => {
        setTab('Create')
        setRefresh(new Date());
        setOpen(true)
    }

    const onSend = async (payload, action) => {
        try {
            return await actions[action](payload)
        } catch(error) {
            const fields = {};

            for(const key of Object.keys(error.fields)) {
                fields[key.replace('data/', '')] = error.fields[key]
            }

            setTabs({
                ...tabs,
                [action]: tabs[action].map(field => {
                if (fields?.[field.name]) return {
                    ...field,
                    error: true,
                    helperText: fields[field.name].replaceAll('_', ' ').toLowerCase()
                }

                return field;
                })
            })
        }
    }

    const onDelete = async (id) => {
        const { status } = await deleteModule(id).unwrap()
        
        if (!status) return
        return refetch()
    }

    const onEdit = ({ id, ...rest }) => {
        setInjectFields({ id })
        setTabs(prev => ({
            ...prev,
            Update : CREATE_MODULE_TABS.map(field => ({
                ...field,
                ...(rest?.[field?.name] ? { value: rest[field?.name] } : {})
            }))
        }))
        setTab('Update')
        setRefresh(new Date());
        setOpen(true)
    }

    const handlePageClick = ({ selected }) => setCurrentPage(selected)

    const handleSearch = (event) => setSearch(event.target.value)

    const handleClearSearch = () => setSearch('');


    if (isLoading) return <CircularProgress sx={{ position: 'absolute', top: '45%', left: '50%' }}/>

    return (
        <>
        <Modal 
            key          = {refreshKey} 
            isOpen       = {open} 
            hideTabs 
            injectFields = {injectFields} 
            onSend       = {onSend} 
            onClose      = {() => setOpen(false)} 
            tabs         = {tabs} 
            defaultTab   = {tab} 
        />
        <div className={styles.buttonsBlock}>
            <IconButton onClick={handleAddModule} color="primary" size="large"><AddCircleIcon fontSize="inherit"/></IconButton>
        </div>
        <TextField 
            className={styles.searchField} 
            onChange={handleSearch} 
            id="standard-basic" 
            label="Search" 
            value={search}
            variant="standard"
            InputProps = {{
            endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClearSearch}
                  >
                    <CloseIcon/>
                  </IconButton>
                </InputAdornment> 
        }}
        />
        <div className={styles.cardsContainer}>
            {data?.modules?.map(module => <ModuleCard onDelete={onDelete} onEdit={onEdit} key={module?.id} {...module} />)}
        </div>
        <ReactPaginate
            className={styles.pagination}
            activeClassName={styles.activePage}
            breakLabel="..."
            nextLabel={<ArrowForwardIosIcon sx={{ fontSize: 12 }}/>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(data?.totalCount / PER_PAGE)}
            previousLabel={<ArrowBackIosNewIcon sx={{ fontSize: 12 }} />}
            renderOnZeroPageCount={null}
         />
        </>
    )
}
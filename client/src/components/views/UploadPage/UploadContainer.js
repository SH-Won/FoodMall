import Title from 'antd/lib/skeleton/Title';
import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {uploadFiles,uploadPost} from '../../../_actions/post_actions';
import UploadForm from './Presenter/UploadForm';
import './Upload.css';

const select = [
    {key:1, value:'뉴스'},
    {key:2, value:'헬스'},
    {key:3, value:'음악'},
    {key:4, value:'자랑'},
    {key:5, value:'연예인'},
    {key:6, value:'스포츠'},
    {key:7, value:'이슈'},
    {key:8, value:'음식'},
    {key:9, value:'19금'}
]

const UploadContainer = (props) => {
    const dispatch = useDispatch();
    const [Files,setFiles]=useState([]);
    const [FileURLs,setFileURLs]=useState([]);
    const [FilePath,setFilePath]=useState([]);
    const writer = localStorage.getItem('userId');

    const [Title,setTitle]=useState('');
    const [Description,setDescription]=useState('');
    const [Category,setCategory]=useState(1);
    const onChangeTitle=(e)=>{
        setTitle(e.target.value);
    }
    const onChangeDescription=(e)=>{
        setDescription(e.target.value);
    }
    const onChangeCategory=(e)=>{
        setCategory(e.target.value);
    }

    const onDrop =(files)=>{
        setFiles([...Files,...files])

        let fileURLs = [];
        let file;
        let filesLength = files.length;

        for(let i=0; i<filesLength; i++){
            file = files[i]
            let reader = new FileReader();
            reader.onload =() =>{
                fileURLs.push(reader.result);
                setFileURLs([...FileURLs,...fileURLs])
            }
            reader.readAsDataURL(file);
        }
    }
    const removeFile = (file) =>{
        let fileArray = [...Files];
        let urlArray = [...FileURLs];
        const index = FileURLs.indexOf(file);
        fileArray.splice(index,1);
        urlArray.splice(index,1)
        setFiles(fileArray);
        setFileURLs(urlArray);
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        const config = {
            header:{
                'content-type':'multipart/form-data'
            }
        }
        Files.forEach(file=> formData.append('file',file))
        dispatch(uploadFiles(formData,config))
        .then(response=>{
            setFilePath([...response.payload.url])
            console.log(response.payload.url);
            let variable={
                writer:writer,
                images:[...response.payload.url],
                category:Category,
                title:Title,
                description:Description,
                
            }
            dispatch(uploadPost(variable))
            .then(response=>{
                props.history.push('/');
            })
        })

    }
    

    return (
        <div style={{width:'90%',margin:'2rem auto'}}>
            <UploadForm 
            {...props}
            onSubmit={onSubmit} onDrop={onDrop} 
            removeFile={removeFile} FileURLs={FileURLs}
            Title={Title} Description={Description} Category={Category}
            select={select} onChangeTitle={onChangeTitle}
            onChangeDescription={onChangeDescription}
            onChangeCategory={onChangeCategory}/>
        </div>
    )
}

export default UploadContainer

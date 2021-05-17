import ReactPlayer from 'react-player'
import React, { useState, useEffect } from 'react'  
import FormVideos from './FormVideos'

import {db} from '../firebase'

import {toast} from 'react-toastify'



const ListaVideos = () => {

    const [links, setLinks] = useState([]);

    const [currentId,setCurrentId] = useState('');

    const addOrEdit = async (linkObject)=>{
        if(currentId === ''){
            await db.collection('videos').doc().set(linkObject);
        toast.success('nuevo link añadido', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        else{
            await db.collection('videos').doc(currentId).update(linkObject);
            toast.info('🦄 el video fue actualizado', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        setCurrentId('');
        
    };

    const onDeleteVideo = async (id)=>{
         if(window.confirm('estas seguro que deseas eliminar este video')){
            await db.collection('videos').doc(id).delete();
            toast.warn('🦄 Video eliminado', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }
    
    const getLinks = () =>{
        db.collection('videos').onSnapshot((querySnapshot)=>{
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id: doc.id});
            });
            setLinks(docs);
        });
    };


    useEffect(()=>{
        getLinks();
        
    }, []);

    return (
        <div>
            <FormVideos {...{addOrEdit, currentId, links}} />
            <div className="" >
                {links.map(link => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between" >
                                <h3>{link.titulo}</h3>
                                <div>
                                <i className="material-icons text-danger" onClick={()=> onDeleteVideo(link.id)} >close</i>
                                <i className="material-icons" onClick={()=> setCurrentId(link.id)} >create</i>
                                </div>
                                
                            </div>

                            <div>
                                <ReactPlayer
                                    url={link.url}
                                    width='100%'
                                    height='650px'
                                />
                            </div>
                            <h4 className="mt-1">Descripcion del video</h4>
                            <p>{link.description}</p>
                            
                        </div>
                    </div>
                ))}
            </div>
                
        </div>
    )
}

export default ListaVideos


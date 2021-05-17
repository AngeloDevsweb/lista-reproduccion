import React, {useState, useEffect} from 'react'
import { db } from '../firebase';   


const FormVideos = (props) => {

    const initialValues = {
        titulo: '',
        url: '',
        description: ''
    };

    const [values, setValues] = useState(initialValues);

    const onInputChange = (e)=>{
        const {name, value} = e.target;
        setValues({...values, [name]:value})
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        props.addOrEdit(values);
        setValues({...initialValues});
    };

    const getLinkByid = async (id) =>{
        const doc = await db.collection('videos').doc(id).get();
        setValues({...doc.data()})
    };

    useEffect(()=>{
        if(props.currentId === ''){
            setValues({...initialValues});
        }
        else{
            getLinkByid(props.currentId);
        }
    },[props.currentId]);

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <h2>Mi lista de videos</h2>
            <div className="form-group">
                <input type="text" placeholder="titulo del video" className="form-control" name="titulo" required onChange={onInputChange}
                value={values.titulo}
                />
            </div>

            <div className="form-group">
                <input type="text" placeholder="link del video" className="form-control" name="url" required 
                onChange={onInputChange} value={values.url}
                />
            </div>

            <div className="form-group">
                <textarea name="description" rows="4" className="form-control" placeholder="Escribe una descripcion del video"
                required onChange={onInputChange} value={values.description}
                ></textarea>
            </div>

            <button className="btn btn-primary btn-block">
                {props.currentId ==='' ? 'Guardar':'Actualizar'}
            </button>
        </form>
    )
}

export default FormVideos

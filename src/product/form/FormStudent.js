import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from 'yup'
import storage from "../config/FirebaseConfig";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import axios from "axios";

export default function FormStudent(props) {

    const navigate = useNavigate();

    const validation = Yup.object().shape({
        name: Yup.string().min(3, "Too short")
            .max(30, "Too long")
            .matches(/[a-zA-Z]+/, "Invalid name!")
            .required("Required!"),
        age: Yup.number().min(18, "Too young")
            .max(60, "Too old")
            .required("Required!"),
        email: Yup.string()
            .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email!")
            .required("Required!"),
        math: Yup.number().min(0, "Too less")
            .max(10, "Too great")
            .required("Required!"),
        physic: Yup.number().min(0, "Too less")
            .max(10, "Too great")
            .required("Required!"),
        chemistry: Yup.number().min(0, "Too less")
            .max(10, "Too great")
            .required("Required!"),
    })

    return (
        <>
            <Formik
                initialValues={props.student}
                onSubmit={(values) => {
                    save(values)
                }}
                enableReinitialize={true}
                validationSchema={validation}
            >
                <Form>
                    <div className={'row'}>
                        <div className={'col-md-6'}>
                            <div className="mb-3">
                                <label htmlFor={'name'} className={'form-label'}>Name</label>
                                <Field name={'name'} type={'text'} className={'form-control'} id={'name'}
                                       placeholder={'Enter name'}/>
                                <span><ErrorMessage className={'error'} name={'name'}/></span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={'age'} className={'form-label'}>Age</label>
                                <Field name={'age'} type={'number'} className={'form-control'} id={'age'}
                                       placeholder={'Enter age'}/>
                                <span><ErrorMessage className={'error'} name={'age'}/></span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={'email'} className={'form-label'}>Email</label>
                                <Field name={'email'} type={'text'} className={'form-control'} id={'email'}
                                       placeholder={'Enter email'}/>
                                <span><ErrorMessage className={'error'} name={'email'}/></span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={'gender'} className={'form-label'}>Gender</label>
                                <Field name={'gender'} as="select" className={'form-control'} id={'gender'}>
                                    <option>-------</option>
                                    <option value={'male'}>Male</option>
                                    <option value={'female'}>Female</option>
                                    <option value={'other'}>Other</option>
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={'address'} className={'form-label'}>Address</label>
                                <Field name={'address'} type={'text'} className={'form-control'} id={'address'}
                                       placeholder={'Enter address'}/>
                            </div>
                        </div>
                        <div className={'col-md-6'}>
                            <div className="mb-3">
                                <label htmlFor={'math'} className={'form-label'}>Math</label>
                                <Field name={'math'} type={'number'} className={'form-control'} id={'math'}
                                       placeholder={'Enter math point'}/>
                                <span><ErrorMessage className={'error'} name={'math'}/></span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={'physic'} className={'form-label'}>Physic</label>
                                <Field name={'physic'} type={'number'} className={'form-control'} id={'physic'}
                                       placeholder={'Enter physic point'}/>
                                <span><ErrorMessage className={'error'} name={'physic'}/></span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={'chemistry'} className={'form-label'}>Chemistry</label>
                                <Field name={'chemistry'} type={'number'} className={'form-control'} id={'chemistry'}
                                       placeholder={'Enter chemistry point'}/>
                                <span><ErrorMessage className={'error'} name={'chemistry'}/></span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" className="form-control" id="image"
                                       onChange={(e) => uploadFile(e)}/>
                            </div>
                            <div className="mb-3">
                                <div style={{float: 'right'}}>
                                    <button className={'btn btn-primary'}>
                                        <i className="fa-solid fa-floppy-disk"></i>
                                    </button>
                                    &ensp;&ensp;
                                    <Link className={'btn btn-primary'} to={'/'}>
                                        <i className={"fa-solid fa-house"}></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )

    function save(values) {
        let avatar = localStorage.getItem("url")
        if (avatar !== null) {
            values.avatar = avatar
        } else {
            values.avatar = "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
        }
        axios.post('http://localhost:8080/api/students', values).then(() => {
            navigate('/')
            localStorage.clear()
        })
    }

    function uploadFile(e) {
        if (e.target.files[0]) {
            const time = new Date().getTime()
            const storageRef = ref(storage, `image/${time}_${e.target.files[0].name}`);
            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

            uploadTask.on("state_changed",
                (snapshot) => {
                    console.log(snapshot)
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        localStorage.setItem("url", downloadURL)
                    });
                }
            );
        }
    }
}

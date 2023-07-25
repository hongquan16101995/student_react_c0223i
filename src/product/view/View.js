import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {deleteById} from "../model/Common";

export default function View() {
    const [student, setStudent] = useState({})
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8080/api/students/${id}`).then((res) => {
            setStudent(res.data)
        })
    })

    return (
        <>
            <div className={'row'}>
                <div className={'col-md-4'}>
                    <img style={{width: '300px', height: '300px', marginTop: '40px'}} src={student.avatar} alt=""/>
                </div>
                <div className={'col-md-7'}>
                    <table style={{marginTop: '70px'}} className={'table table-hover'}>
                        <tbody>
                        <tr>
                            <th style={{width: '25%'}}>Name</th>
                            <td>{student.name}</td>
                        </tr>
                        <tr>
                            <th>Age</th>
                            <td>{student.age}</td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td>{student.gender}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>{student.address}</td>
                        </tr>
                        <tr>
                            <th>Action</th>
                            <td>
                                <Link className={'btn btn-warning'} to={`/update/${student.id}`}>
                                    <i className={"fa-solid fa-pen-to-square"}></i>
                                </Link>&ensp;&ensp;
                                <button onClick={() => {
                                    deleteById(student.id)
                                }} className={'btn btn-danger'}>
                                    <i className={"fa-solid fa-trash-can"}></i>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <Link className={'btn btn-success'} to={'/'}>
                        <i className={"fa-solid fa-house"}></i>
                    </Link>
                </div>
            </div>
        </>
    )
}

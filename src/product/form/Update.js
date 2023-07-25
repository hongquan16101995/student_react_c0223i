import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import FormStudent from "./FormStudent";

export default function Update() {
    const [student, setStudent] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8080/api/students/${id}`).then((res) => {
            setStudent(res.data)
        })
    }, [id])

    return (
        <>
            <FormStudent student={student} naviage={navigate}/>
        </>
    )
}

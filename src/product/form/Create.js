import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Student} from "../model/Student";
import FormStudent from "./FormStudent";

export default function Create() {
    const [student] = useState(new Student())
    const navigate = useNavigate()

    return (
        <>
            <FormStudent student={student} naviage={navigate}/>
        </>
    )
}

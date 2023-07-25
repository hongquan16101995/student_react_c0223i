import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {deleteById} from "../model/Common";

export default function List() {
    const [students, setStudents] = useState([])
    const [page, setPage] = useState({})
    const [totalPage, setTotalPage] = useState("")
    const [ranking, setRanking] = useState([])
    const [list, setList] = useState(true)
    const [average, setAverage] = useState(false)
    const [detail, setDetail] = useState(false)
    const [rank, setRank] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8080/api/students').then((res) => {
            setStudents(res.data.content)
            setPage(res.data)
            setTotalPage(res.data.totalPages)
            createRanking(res.data.content)
        })
    }, [])

    return (
        <>
            <Link className={'btn btn-primary'} to={'/create'}>
                <i className={"fa-solid fa-circle-plus"}></i>
            </Link>
            <button onClick={listAll} className={'btn btn-primary'}>Home</button>
            <button onClick={avgPoint} className={'btn btn-primary action'}>Average point</button>
            <button onClick={detailPoint} className={'btn btn-primary action'}>Detail point</button>
            <button onClick={rankStatus} className={'btn btn-primary action'}>Ranking</button>
            <table className={'table table-hover'}>
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    {list && <>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Address</th>
                    </>}
                    {average && <>
                        <th>Average</th>
                    </>}
                    {detail && <>
                        <th>Math</th>
                        <th>Physic</th>
                        <th>Chemistry</th>
                    </>}
                    {rank && <>
                        <th>Ranking</th>
                    </>}
                    <th colSpan={3} style={{width: '30%'}}>Action</th>
                </tr>
                {students.map((item, index) => {
                    return (
                        <>
                            <tr>
                                <td>{++index}</td>
                                <td>{item.name}</td>
                                {list && <>
                                    <td>{item.age}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                </>}
                                {average && <>
                                    <td>{((item.math + item.physic + item.chemistry) / 3).toFixed(2)}</td>
                                </>}
                                {detail && <>
                                    <td>{item.math}</td>
                                    <td>{item.physic}</td>
                                    <td>{item.chemistry}</td>
                                </>}
                                {rank && <>
                                    <th>{ranking[--index]}</th>
                                </>}
                                <td>
                                    <Link className={'btn btn-warning'} to={`/update/${item.id}`}>
                                        <i className={"fa-solid fa-pen-to-square"}></i>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        deleteById(item.id)
                                    }} className={'btn btn-danger'}>
                                        <i className={"fa-solid fa-trash-can"}></i>
                                    </button>
                                </td>
                                <td>
                                    <Link className={'btn btn-info'} to={`/view/${item.id}`}>
                                        <i className={"fa-solid fa-eye"}></i>
                                    </Link>
                                </td>
                            </tr>
                        </>
                    )
                })}
                </tbody>
            </table>
            <div id={'page'}>
                {!page.first && <button className={'btn btn-primary page'}
                                        onClick={() => {
                                             previousPage(page.number - 1)
                                        }}>Previous</button>}&ensp;
                {page.number + 1} | {totalPage}&ensp;
                {!page.last && <button className={'btn btn-primary page'}
                                       onClick={() => {
                                           nextPage(page.number + 1)
                                       }}>Next</button>}
            </div>
        </>
    )

    function avgPoint() {
        setAverage(true)
        setDetail(false)
        setList(false)
        setRank(false)
    }

    function detailPoint() {
        setDetail(true)
        setAverage(false)
        setList(false)
        setRank(false)
    }

    function listAll() {
        setDetail(false)
        setAverage(false)
        setList(true)
        setRank(false)
    }

    function rankStatus() {
        setAverage(true)
        setDetail(false)
        setList(false)
        setRank(true)
        console.log(ranking)
    }

    function createRanking(students) {
        let arrRanking = []
        for (let i = 0; i < students.length; i++) {
            if (getAvg(students[i]) > 8) {
                arrRanking.push("GOOD")
            } else if (getAvg(students[i]) > 6.5) {
                arrRanking.push("NORMAL")
            } else if (getAvg(students[i]) > 4) {
                arrRanking.push("MEDIUM")
            } else {
                arrRanking.push("BAD")
            }
        }
        setRanking(arrRanking)
    }

    function getAvg(student) {
        return (student.math + student.physic + student.chemistry) / 3
    }

    function nextPage(page) {
        axios.get(`http://localhost:8080/api/students?page=${page}`).then((res) => {
            setStudents(res.data.content)
            setPage(res.data)
            setTotalPage(res.data.totalPages)
            createRanking(res.data.content)
        })
    }

    function previousPage(page) {
        axios.get(`http://localhost:8080/api/students?page=${page}`).then((res) => {
            setStudents(res.data.content)
            setPage(res.data)
            setTotalPage(res.data.totalPages)
            createRanking(res.data.content)
        })
    }
}

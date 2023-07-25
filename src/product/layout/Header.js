import {useNavigate} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate()
    return(
        <>
            <div id={'header'} className={'row'}>
                <div className={'col-md-4'}>
                    <img onClick={list} id={'logo'} src="/static/img/logo.jpg" alt=""/>
                </div>
                <div className={'col-md-5'}>
                    <h1 id={'title'}>Student Management</h1>
                </div>
                <div className={'col-md-3'}>
                    <button className={'btn btn-primary login'}>Sign in</button>&ensp;|&ensp;
                    <button className={'btn btn-primary login'}>Sign up</button>
                </div>
            </div>
        </>
    )

    function list() {
        navigate('/')
    }
}

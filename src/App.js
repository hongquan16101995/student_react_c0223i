import './App.css';
import Header from "./product/layout/Header";
import Footer from "./product/layout/Footer";
import Section from "./product/layout/Section";
import {Route, Routes} from "react-router-dom";
import List from "./product/view/List";
import View from "./product/view/View";
import Create from "./product/form/Create";
import Update from "./product/form/Update";

function App() {
    return (
        <>
            <div className={'container'}>
                <Header/>
                <div id={'body'} className={'row'}>
                    <div className={'col-md-3'}>
                        <Section/>
                    </div>
                    <div className={'col-md-9'}>
                        <Routes>
                            <Route path={'/'} element={<List />}></Route>
                            <Route path={'/view/:id'} element={<View/>}></Route>
                            <Route path={'/create'} element={<Create/>}></Route>
                            <Route path={'/update/:id'} element={<Update/>}></Route>
                        </Routes>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default App;

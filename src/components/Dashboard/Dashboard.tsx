import React from 'react';
import {useState , useReducer , useEffect, useRef} from 'react';
import styled from 'styled-components';
import style from './style.module.scss';

import logo from '../../../public/imgs/Home/Nav/LogoDesktop.png'
import trash from '../../../public/imgs/dashboard/trash-2.svg'

const menu = [
    {
        name:"Home",
        url:"#"
    },
    {
        name:"Dashboard",
        url:"#"
    },
    {
        name:"Projects",
        url:"#"
    },
    {
        name:"Taskse",
        url:"#"
    },
    {
        name:"Reporting",
        url:"#"
    },
    {
        name:"Users",
        url:"#"
    },
]

type M = {
    isVisible: boolean;
}

const Modal = styled.section<M>`
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: ${props=>props.isVisible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    left: 0;
`;

function Nav (){
    const hash = sessionStorage.getItem('key');
    const avatar = JSON.parse(sessionStorage.getItem('user'))?.icon ?? '#';

    useEffect(()=>{
        if(!hash || hash === ''){
            window.location.href = '/log-in/'
        }
    })

    return(
        <nav className={style.nav}>
            <div>
                <figure>
                    <img src={logo} alt="" />
                </figure>
                <ul>
                    {
                        menu.map(element => (
                            <li key={element.name}><a href={element.url}>{element.name}</a></li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <figure>
                    <img src="/imgs/dashboard/settings.svg" alt="settings" />
                </figure>
                <figure>
                    <img src="/imgs/dashboard/bell.svg" alt="bell" />
                </figure>
                <figure>
                    <img src={avatar} alt="avatar" />
                </figure>
            </div>
        </nav>
    )
}

function Table ({modal}){
    const [genero, setGenero] = useState("")
    const [pais , setPais] = useState("");
    const [estado, setEstado] = useState("");
    const [search , setSearch] = useState("");

    function filterValue (e){
        if(e.target.title === "Genero"){
            setGenero(e.target.value);
        }else if(e.target.title === "Pais"){
            setPais(e.target.value);
        }else if(e.target.title === "Estado"){
            setEstado(e.target.value);
        }else if(e.target.title === "search"){
            setSearch(e.target.value);
        }
    }

    function clearFilter (e){
        if(e.target.title === "Genero"){
            setGenero("");
        }else if(e.target.title === "Pais"){
            setPais("");
        }else if(e.target.title === "Estado"){
            setEstado("");
        }
    }

    return(
        <section className={style.dashboard}>
                <div className={style.search}>
                    <div className={style.filter_status}>
                        <div>
                            <figure>
                                <img src="/imgs/dashboard/FiltersLines.svg" alt="filters" />
                            </figure>
                            <span>Filters</span>
                        </div>
                        <span>Genero:{genero}<span onClick={clearFilter} title="Genero"> X</span></span>
                        <span>Pais:{pais}<span onClick={clearFilter} title="Pais"> X</span></span>
                        <span>Estado:{estado}<span onClick={clearFilter} title="Estado"> X</span></span>
                    </div>
                    <div className={style.filter_search}>
                        <input onInput={filterValue} type="text" title="search" placeholder='Search'/>
                        <span onClick={modal}>+ Nuevo Usuario</span>
                    </div>
                </div>
                <div className={style.filters}>
                    <input onInput={filterValue} value={genero} type="text" title="Genero" placeholder='Género'/>
                    <input onInput={filterValue} value={pais} type="text" title='Pais' placeholder='País'/>
                    <input onInput={filterValue} value={estado} type="text" title='Estado' placeholder='Estado'/>
                </div>
        </section>
    )
}

function AddUser ({status, modal, add}){
    const [nombre,setNombre] = useState("");
    const [pais,setPais] = useState("");
    const [estado, setEstado] = useState("");
    const [genero, setGenero] = useState("");

    function userData (e){
        if(e.target.title === 'nombre'){
            setNombre(e.target.value)
        }else if(e.target.title === 'pais'){
            setPais(e.target.value)
        }else if(e.target.title === 'estado'){
            setEstado(e.target.value)
        }else if(e.target.title === 'genero'){
            setGenero(e.target.value)
        }
    }

    function agregar (){
        add({name:nombre,country:pais,state:estado,gender:genero})
        modal();
    }

    return(
        <Modal isVisible = {status}>
            <form className={style.addUser_form} action="#" method='POST' onSubmit={(e)=>e.preventDefault()}>
                <figure>
                    <img src="/imgs/dashboard/plus.svg" alt="plus" />
                </figure>
                <div>
                    <h5>Agregar Nuevo Usuario</h5>
                    <p>This blog post has been published. Team members will be able to edit this post and republish changes.</p>
                </div>
                <div>
                    <label htmlFor="">Nombre</label>
                    <input type="text" title="nombre" onInput={userData}/>
                </div>
                <div>
                    <label htmlFor="">País</label>
                    <input type="text" title="pais" onInput={userData}/>
                </div>
                <div>
                    <label htmlFor="">Estado</label>
                    <input type="text" title="estado" onInput={userData}/>
                </div>
                <div>
                    <label htmlFor="">Género</label>
                    <input type="text" title="genero" onInput={userData}/>
                </div>
                <div className={style.addUser_btns}>
                    <button onClick={modal}>Cancel</button>
                    <button onClick={agregar}>Confirm</button>
                </div>
            </form>
        </Modal>
    )
}

function Dashboard (){
    const[modal,setModal] = useState(false);
    const [usuarios, setUsuarios] = useState([])

    function agregarUsuario(user){
        setUsuarios([...usuarios,user])
        console.log(usuarios)
        localStorage.setItem('userdata',JSON.stringify([...usuarios,user]))
    }

    function borrarUsuario(e){
        const indice = e.currentTarget.getAttribute('user-indice')
        const newUsers = usuarios.filter((element,index)=>index!=indice)
        console.log(newUsers)
        setUsuarios(newUsers);
        localStorage.setItem('userdata',JSON.stringify(newUsers))
    }

    useEffect(()=>{
        setUsuarios(JSON.parse(localStorage.getItem('userdata')) ?? [])
        console.log(usuarios)
    },[])

    function IsModal (){
        setModal(!modal)
    }

    return(
        <>
            <Nav />
            <AddUser status={modal} modal={IsModal} add={agregarUsuario}/>
            <Table modal={IsModal}/>
            <section className={style.userTable}>
                <table>
                    <thead>
                        <tr>
                            <td>Cliente</td>
                            <td>Genero</td>
                            <td>Pais</td>
                            <td>Estado</td>
                            <td>5</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map((user,index)=>(
                                <tr key={user.name}>
                                    <td>{user.name}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.country}</td>
                                    <td>{user.state}</td>
                                    <td>
                                        <figure>
                                            <img onClick={borrarUsuario} user-indice={index} src={trash} alt="trash" />
                                        </figure>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default Dashboard;
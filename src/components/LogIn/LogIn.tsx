import { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import style from './style.module.scss';

const users = [
    {
        id:"1",
        user:"example1@example.com",
        pass:"password1",
        icon:"#"
    },
    {
        id:"2",
        user:"example2@example.com",
        pass:"password2",
        icon:"#"
    },
]

type V = "39D25C20D2DB7519BFA1235F3F1A24F7" | boolean;
type AlertProps = {
    isVisible: boolean;
}
const Alert = styled.span<AlertProps>`
    color:red;
    font-size : .8rem;
    width:100%;
    text-align:left;
    display: ${props=>props.isVisible ? 'flex' : 'none'};
`;

function Form(){
    const [data, setData] = useState(users);
    const [value, setValue] = useState<V>("39D25C20D2DB7519BFA1235F3F1A24F7");
    const [alert, setAlert] = useState(false);
    const [session , setSession] = useState([{user:"",icon:""}])
    const user = useRef<HTMLInputElement>(null);
    const pass = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(value === "39D25C20D2DB7519BFA1235F3F1A24F7"){
            setAlert(false)
        }else if(value){
            setAlert(false)
            console.log("exito")
            sessionStorage.setItem('key',"39D25C20D2DB7519BFA1235F3F1A24F7");
            sessionStorage.setItem('user',JSON.stringify(session));
        }else{
            setAlert(true)
            user.current.value = "";
            pass.current.value = ""
        }
    },[value])

    function validate (e){
        const $user:string = user.current.value ? user.current.value : "";
        const $pass:string = pass.current.value ? pass.current.value : "";
        e.preventDefault();
        const isValid = data.some(element => element.user === $user && element.pass === $pass);
        const $icon = data.find(element => element.user === $user && element.pass === $pass)?.icon;
        setSession([{user:$user,icon:$icon[0]}])
        setValue(isValid)
    }

    return(
        <form action="#" className={style.form} onSubmit={validate} method='POST'>
            <div className={style.form_inputs}>
                <Alert isVisible={alert}>User or pass are incorrect</Alert>
                <input ref={user} type="text" name="user" title="user" placeholder='Enter your email' autoComplete='off'/>
                <input ref={pass} type="password" name="pass" title="pass" placeholder='••••••••' autoComplete='off'/>
            </div>
            <div className={style.form_remember}>
                <div>
                    <input type="checkbox" name="check" id="check" title="check" />
                    <label htmlFor="check">Remember for 30 days</label>
                </div>
                <a href='#'>Forgot password</a>
            </div>
            <div className={style.form_send}>
                <button type='submit'>Sign in</button>
            </div>
            <div className={style.form_sing}>
                <span>Don’t have an account?</span>
                <span>Sign up</span>
            </div>
        </form>
    )
}

function LogIn (){
    return(
        <main className={style.container}>
            <section className={style.form_container}>
                <figure className={style.form_icon}>
                    <img src="/public/imgs/log-in/icon.png" alt="icon" />
                </figure>
                <div className={style.form_title}>
                    <h1>Welcome back</h1>
                    <p>Please enter your details.</p>
                </div>
                <Form />
            </section>
        </main>
    )
}

export default LogIn;
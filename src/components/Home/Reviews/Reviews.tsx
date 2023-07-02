import React from 'react'
import { useState , useEffect} from 'react'

//! estilos
import style from './style.module.scss';

const data = [
    {
        id:1,
        rating:"/imgs/Home/reviews/Stars.png",
        name:"Katherine Moss",
        ocupation:"Project Manager, Layers",
        review: "We’ve really sped up our workflow with Company  and haven’t looked back.",
        avatar:"/imgs/Home/reviews/Avatar1.png"
    },
    {
        id: 2,
        rating:"/imgs/Home/reviews/Stars.png",
        name: "John Doe",
        ocupation: "Software Engineer, Tech Solutions",
        review: "I've been using Company for a few months now and it has really helped me streamline my work.",
        avatar: "/imgs/Home/reviews/Avatar2.png"
    },
    {
        id: 3,
        rating:"/imgs/Home/reviews/Stars.png",
        name: "Sarah Johnson",
        ocupation: "UI/UX Designer, Creative Minds",
        review: "Company has been a game changer for our design team. It's made collaboration and iteration so much easier.",
        avatar: "/imgs/Home/reviews/Avatar3.png"
    },
    {
        id: 4,
        rating:"/imgs/Home/reviews/Stars.png",
        name: "David Lee",
        ocupation: "Full Stack Developer, Code Wizards",
        review: "I was skeptical at first, but after using Company for a few weeks, I can't imagine going back to our old workflow.",
        avatar: "/imgs/Home/reviews/Avatar4.png"
    },
    {
        id: 5,
        rating:"/imgs/Home/reviews/Stars.png",
        name: "Emily Chen",
        ocupation: "Product Manager, Launchpad",
        review: "Company has helped us stay organized and on track with our product development. Highly recommend!",
        avatar: "/imgs/Home/reviews/Avatar5.png"
    }

]


function Review(){
    const [count, setCount] = useState(0)
    const [current, setCurrent] = useState([data[count]])
    useEffect(()=>{
        setCurrent([data[count]])
    },[count])

    function increment(){
        setCount(prevCount => {
            if(prevCount + 1 === data.length){
                return 0
            }else{
                return prevCount +1
            }
        })
    }

    function decrement(){
        setCount(prevCount => {
            if(prevCount === 0){
                return data.length - 1
            }else{
                return prevCount -1
            }
        })
    }

/*     setInterval(function(){
        increment();
    },8000) */

    return(
        <section className={style.review}>
            {
                current.map(element=>(
                    <React.Fragment key={element.id}>
                        <div className={style.rating}>
                            <figure>
                                <img src={element.rating} alt="rating" />
                            </figure>
                        </div>
                        <div className={style.reviewText}>
                            <h4>{element.review}</h4>
                        </div>
                        <div className={style.avatar}>
                            <figure>
                                <img src={element.avatar} alt={element.name} />
                            </figure>
                            <div>
                                <h5>{element.name}</h5>
                                <p>{element.ocupation}</p>
                            </div>
                        </div>
                    </React.Fragment>
                ))
            }
            <div className={style.arrows}>
                <figure>
                    <img src="/imgs/Home/reviews/arrow-left.png" onClick={decrement} alt="" />
                </figure>
                <figure>
                    <img src="/imgs/Home/reviews/arrow-right.png" onClick={increment} alt="" />
                </figure>
            </div>
        </section>
    )
}



function Reviews(){
    return(
        <section className={style.reviews}>
            <Review />
            <section>
                <figure>
                    <img src="/imgs/Home/reviews/Contents.png" alt="avatars" />
                </figure>
            </section>
        </section>
    )
}


export default Reviews;
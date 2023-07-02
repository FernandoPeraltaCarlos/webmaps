import React from  'react'
import {useState} from 'react'
import styled from 'styled-components';

import style from './style.module.scss'

import plus from '../../../../public/imgs/Home/questions/plus-circle.svg';
import minus from '../../../../public/imgs/Home/questions/minus-circle.svg';

const data = [
    {
        question:"Is there a free trial available?",
        answer:"Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
    },
    {
        question:"Can I change my plan later?",
        answer:"Yes, you can change your plan at any time. Just go to your account settings and select the new plan you want to switch to."
    },
    {
        question:"What is your cancellation policy?",
        answer:"You can cancel your subscription at any time. If you cancel within the first 30 days, you will not be charged. After that, you will be charged for the current month, but your subscription will not renew for the following month."
    },
    {
        question:"Can other info be added to an invoice?",
        answer:"Yes, you can add additional information to your invoice, such as a purchase order number or a billing address. Just contact our support team and they will be happy to assist you."
    },
    {
        question:"How does billing work?",
        answer:"We offer monthly and annual billing options. You will be charged on the same day each month or year, depending on your billing cycle. You can view your billing history and download invoices from your account settings."
    },
    {
        question:"How do I change my account email?",
        answer:"You can change your account email by going to your account settings and selecting 'Edit Profile'. From there, you can update your email address and save your changes."
    }
]

type PProps = {
    IsActive: boolean;
};

const P = styled.p<PProps>`
    display:${props => (props.IsActive ? 'flex' : 'none')};
    font-size:clamp(.8rem,5vw,1rem);
    color:#667085;
    border-bottom: .5px solid #d0d5dd;
    padding-bottom: 2rem;
`;

function Question({question, answer}){
    const [state,setState] = useState(false);

    function toogleStatus(){
        setState(!state)
    }

    return(
        <div className={style.q}>
            <h5 onClick={toogleStatus}>{question} <img src={state ? minus : plus} alt="icon" /></h5>
            <P IsActive={state} >{answer}</P>
        </div>
    )
}

function Questions (){
    return(
        <section className={style.questions}>
            <section className={style.title}>
                <h5>Frequently asked questions</h5>
                <p>Everything you need to know about the product and billing.</p>
            </section>
            <section className={style.asked}>
                {
                    data.map(question=>(
                        <Question key={question.question} question={question.question} answer={question.answer} />
                    ))
                }
            </section>
            <section className={style.getTouch}>
                <figure>
                    <img src="/public/imgs/Home/questions/avatarGroup.png" alt="avatars" />
                </figure>
                <h5>Still have questions?</h5>
                <p>Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
                <a href="#">Get in touch</a>
            </section>
        </section>
    )
}

export default Questions;
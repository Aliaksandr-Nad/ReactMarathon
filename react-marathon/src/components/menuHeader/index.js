import {useState} from 'react'

import {NotificationManager} from "react-notifications";

import Menu from "../menu";
import Navbar from "../navbar";
import Modal from "../modal";
import LoginForm from "../loginForm";

const key = 'AIzaSyCt91QcxAv0f7zM-3pDqEaLqLI5t6HdB2k';
const registration = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const login = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';


function MenuHeader({bgActive}) {
    const [isActive, setActive] = useState(null);
    const [isOpenModal, setOpenModal] = useState(null);

    const handlerHamburger = () => {
        setActive(prevState => !prevState)
    }

    const handlerClickLogin = () => {
        setOpenModal(prevState => !prevState)
    }

    const handlerSubmitMenuForm = async ({isNewUser, email, password}) => {
        const connectionString = isNewUser ? registration + key : login + key;

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            })
        };

        const response = await fetch(connectionString, requestOptions)
            .then(res => res.json());

        if (response.hasOwnProperty('error')){
            NotificationManager.error(response.error.message, 'Wrong!');
        }else {
            localStorage.setItem('idToken', response.idToken);
            NotificationManager.success('Success ' + (isNewUser ? 'register!' : 'login!'));
        }
    }

    return (
        <>
            <Menu
                isActive={isActive}
                handlerHamburger={handlerHamburger}
            />
            <Navbar
                isActive={isActive}
                bgActive={bgActive}
                onClickHamburger={handlerHamburger}
                onClickLogin={handlerClickLogin}
            />
            <Modal
                title="AUTH"
                isOpen={isOpenModal}

                oncloseModal={handlerClickLogin}
            >
                <LoginForm
                    isOpen={isOpenModal}
                    onSubmit={handlerSubmitMenuForm}
                />
            </Modal>
        </>
    );
}


export default MenuHeader;

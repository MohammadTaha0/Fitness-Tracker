import React, { useState } from 'react'

export default function AuthUtils() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profile, setProfile] = useState(null)

    const alert_ = (msg, type) => {
        setMsgs(prevMsgs => [...prevMsgs, msg]);
        setTypes(prevTypes => [...prevTypes, type]);
        setShowAlert(prevShowAlert => ({
            ...prevShowAlert,
            show: true,
            msg: [...prevShowAlert.msg, msg],
            type: [...prevShowAlert.type, type]
        }));
    };
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [msgs, setMsgs] = useState([]);
    const [types, setTypes] = useState([]);
    const [showAlert, setShowAlert] = useState({
        show: true,
        msg: msgs,
        type: types
    });


    const [btn, setBtn] = useState({
        loading: false,
        disabled: false,
    });

    const emptyForm = () => {
        setEmail("");
        setName("");
        setPassword("");
        setBtnDisabled(false);
    }

    return { alert_, showAlert, emptyForm, btn, setBtn, setMsgs, msgs, setTypes, email, setEmail, password, setPassword, name, setName, profile, setProfile }
}

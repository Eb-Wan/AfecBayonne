

import React from 'react';
import axios from "axios";
import { useState } from "react";
import Message from "./Message";
import Card from "./Card";

const Main = () => {

    const [data, setData] = useState("");

    function getData() {
        axios.get("http://127.0.0.1:4000/api/data")
        .then(response => {
            if (!response.data) setData(Message({ type:"is-warning", title:"Truc pas ouf", message:"L'api n'a rien renvoyé." }));
            else {
                const data = response.data.data.map(e => {
                    return (Card({
                        title:e.username,
                        name: e.name,
                        company: e.company.name,
                        topContents:e.company.catchPhrase,
                        bottomContents: e.company.bs
                    }));
                })
                setData(data);
            }
        }).catch(error => {
            console.log(error.message);
            setData(Message({ type:"is-danger", title:"Truc vraiment pas ouf", message:error.message }));
        });
    }
    function postData() {
        const postData = {
            name: "John Doe",
            email: "email@email.com"
        };
        axios.post("http://127.0.0.1:4000/api/data", postData)
        .then(response => {
            const responceData = response.data;
            setData(
                <>
                    <h4>Résultats</h4>
                    Post: {JSON.stringify(postData)}
                    <br/>
                    Résponse: {JSON.stringify(responceData)}
                </>
            );
        }).catch(error => {
            console.log(error.message);
            setData(Message({ type:"is-danger", title:"Truc vraiment pas ouf", message:error.message }));
        });
    }
    function getError() {
        axios.get("http://127.0.0.1:4000/api/error")
        .then(response => {
            setData(<h4>Résultats</h4>);
        }).catch((error) => {
            console.log(error.message);
            let message = error.message;
            if (error.response) {
                message += `  |  reponse:` + JSON.stringify(error.response.data);
            }
            setData(Message({ type:"is-danger", title:"Truc vraiment pas ouf", message: message }));
        });
    }

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                <p className="modal-card-title">Démo Axios</p>
                </header>
                <section id="result" className="modal-card-body">
                    {data}
                </section>
                <footer className="modal-card-foot">
                <div className="buttons">
                    <button onClick={getData} className="button is-success">Get Données</button>
                    <button onClick={postData} className="button is-warning">Post Données</button>
                    <button onClick={getError} className="button is-danger">Test Érreur</button>
                </div>
                </footer>
            </div>
        </div>
    );
}

export default Main
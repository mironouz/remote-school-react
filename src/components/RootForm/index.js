import React, {useState} from "react"
import {Tab, Tabs} from "@mui/material"
import './style.css'
import {LoginForm} from "../LoginForm";
import {RegistrationForm} from "../RegistrationForm";

function getForm(tab) {
    switch (tab) {
        case 0:
            return <LoginForm/>
        case 1:
            return <RegistrationForm />
        default:
            return 0
    }
}

export default function RootForm() {
    const [activeTab, setActiveTab] = useState(0)
    return (
            <div className="RegistrationWrapper">
                <Tabs
                    value={activeTab}
                    onChange={(e, v) => setActiveTab(v)}
                    centered
                >
                    <Tab label="Вход"/>
                    <Tab label="Регистрация"/>
                </Tabs>
                {getForm(activeTab)}
            </div>
    );
}
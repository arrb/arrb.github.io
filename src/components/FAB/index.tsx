import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineHome } from 'react-icons/md'

import './styles.scss'

function FAB() {
    const navigate = useNavigate()
    return (
        <div className="fab-container">
            <div className="fab-button">
                <MdOutlineHome size={30} onClick={() => navigate('/')} />
            </div>
        </div>
    )
}

export default FAB

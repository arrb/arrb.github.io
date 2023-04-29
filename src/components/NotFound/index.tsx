import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-router-dom'

import './styles.scss'

function NotFound() {
    return (
        <div className="container">
            <div className="copy-container center-xy">
                <TypeAnimation
                    className={'some-test'}
                    sequence={['404, page not found.', 1000, '']}
                    speed={30}
                    style={{ fontSize: '2em', display: 'flex' }}
                    repeat={Infinity}
                />
            </div>
            <div className="link-to-go-back">
                <Link to={'/'}>Home</Link>
            </div>
        </div>
    )
}

export default NotFound

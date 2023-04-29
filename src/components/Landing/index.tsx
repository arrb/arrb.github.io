import React from 'react'
import anaImg from '../../images/ana.png'
import { useNavigate } from 'react-router-dom'

import './styles.scss'

function Index() {
    const navigate = useNavigate()
    return (
        <div className="landing-wrapper">
            <div className="pic-wrapper">
                <img
                    src={anaImg}
                    className="personal-pic"
                    alt="personal picture"
                    onClick={() =>
                        window.open('/anaArribasplata_resume.pdf', '_blank')
                    }
                />
            </div>
            <div className="info-wrapper">
                <div className="text">
                    <div className="wrapper">
                        <div id="H" className="letter">
                            H
                        </div>
                        <div className="shadow">H</div>
                    </div>
                    <div className="wrapper">
                        <div id="O" className="letter">
                            O
                        </div>
                        <div className="shadow">O</div>
                    </div>
                    <div className="wrapper">
                        <div id="L" className="letter">
                            L
                        </div>
                        <div className="shadow">L</div>
                    </div>
                    <div className="wrapper">
                        <div id="A" className="letter">
                            A
                        </div>
                        <div className="shadow">A</div>
                    </div>
                    <div className="wrapper">
                        <div id="!" className="letter">
                            !
                        </div>
                        <div className="shadow">!</div>
                    </div>
                </div>
                <div className="about-me">
                    <p>
                        I'm Ana Arribasplata, a stack developer with a Masters
                        in Management in Engineering from Tufts University,
                        graduated in 2022. I also hold a Bachelor's degree in
                        Computer Science from the University of Massachusetts
                        Lowell, which I obtained in 2015.
                    </p>

                    <p>
                        Throughout my career, I've gained extensive experience
                        in stack and front-end development, specializing in
                        React and building REST API applications. I'm passionate
                        about creating beautiful and functional web applications
                        that are both scalable and user-friendly. With my
                        technical and management skills, I aspire to lead a team
                        to success and drive meaningful impact for any
                        organization. Let's connect and discuss how I can
                        contribute to your team's success!
                    </p>
                </div>
                <div className="buttons-wrap-resume">
                    <button
                        onClick={() => navigate('/resume')}
                        className="tags-button"
                    >
                        See Interactive Resume
                    </button>
                    <a
                        className="tags-button"
                        href="/anaArribasplata_resume.pdf"
                        download
                    >
                        Click to download
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Index

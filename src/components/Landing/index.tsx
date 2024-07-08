import React from 'react'
import anaImg from '../../images/ana.png'
import { useNavigate } from 'react-router-dom'

import './styles.scss'

const Index = ()  => {
    const navigate = useNavigate()
    const resumePath = `${process.env.PUBLIC_URL}/anaArribasplata_resume.pdf`
    return (
        <div className="landing-wrapper">
            <div className="pic-wrapper">
                <img
                    src={anaImg}
                    className="personal-pic"
                    alt="personal picture"
                    onClick={() => {
                        const newWindow = window.open(resumePath, '_blank')
                        if (newWindow) {
                            newWindow.focus();
                        }
                    }}
                />
            </div>
            <div className="info-wrapper">
                <div className="text">
                    {['H', 'O', 'L', 'A', '!'].map((char) => (
                        <div className="wrapper" key={char}>
                            <div className="letter">{char}</div>
                            <div className="shadow">{char}</div>
                        </div>
                    ))}
                </div>
                <div className="about-me">
                    <p>
                        I'm Ana Arribasplata, a Senior Frontend Engineer with a Master's in Management in Engineering
                        from Tufts University (2022) and a Bachelor's degree in Computer Science from the University of
                        Massachusetts Lowell (2015). I have a strong background in both frontend and full-stack
                        development.
                    </p>

                    <p>
                        With over 8 years of experience, I've honed my skills in React, TypeScript, and building
                        scalable, user-friendly web applications. My career highlights include:
                    </p>

                    <ul>
                        <li>Leading a complete frontend overhaul at Damedic, improving code efficiency by 75% and
                            increasing accessibility, resulting in significant revenue growth.
                        </li>
                        <li>Publishing and deploying a mobile app, AgrandoPro, on Android and iOS, enhancing user
                            engagement by 15% through real-time messaging and push notifications.
                        </li>
                        <li>Introducing React at Paytronix Inc., reducing hiring time for JavaScript experts by 50% and
                            streamlining the campaign creation process by 30%.
                        </li>
                    </ul>

                    <p>
                        I excel in collaborating with cross-functional teams, driving projects to successful completion,
                        and implementing data-driven optimizations. My technical and leadership skills enable me to
                        deliver high-quality solutions that meet user needs and business objectives.
                    </p>

                    <p>
                        Let's connect and discuss how I can contribute to your team's success!
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

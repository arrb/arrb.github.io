import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import {
    convertJsonCases,
    InfoType,
    parseResume,
    CompanyType,
} from '../../utils/resumeUtils'
import FAB from '../FAB'

import './styles.scss'

const yaml = require('js-yaml')
function Resume() {
    const [rawData, setRawData] = useState(null)
    const [resume, setResume] = useState<InfoType>()
    const [tagsToShow, setSelectTagsToShow] = useState<string[]>([])
    const [tags, setSelectedTags] = useState<string[]>([])

    const retrieveResume = () => {
        if (!rawData) {
            let client = new XMLHttpRequest()
            client.open('GET', '/resume.yaml')
            client.send()
            client.onreadystatechange = function () {
                if (
                    client.readyState === 4 &&
                    client.status === 200 &&
                    client.responseText
                ) {
                    return
                } else {
                    let resumeObjects = yaml.load(client.responseText)
                    setRawData(resumeObjects)
                }
            }
        }
    }

    useEffect(() => {
        retrieveResume()
        if (rawData && !resume) {
            convertJsonCases(rawData)
            const res = parseResume(rawData)
            setResume(res)
            const tags = Object.values(res.sortedTags).map((inn) => inn.tag)
            const tagsAvailable = new Set(tags)
            setSelectTagsToShow(Array.from(tagsAvailable))
        }
    }, [rawData, retrieveResume])

    const addToTags = (tag: string) => {
        if (tags.includes(tag)) {
            setSelectedTags(tags.filter((inn) => inn !== tag))
        } else {
            setSelectedTags([...tags, tag])
        }
    }

    const companyDetailsCommon = (companyType: CompanyType) => {
        let tagsToCheck: string[] = tags
        if (tags.length === 0) {
            if (resume) {
                tagsToCheck = resume.sortedTags?.map((inn) => inn.tag)
            }
        }

        const filteredObj =
            resume?.sortedTags.filter(
                (inn) =>
                    inn.company === companyType.company &&
                    tagsToCheck.includes(inn.tag)
            ) || []

        return Object.values(
            filteredObj.reduce(
                (acc, obj) => ({ ...acc, [obj?.text || '']: obj.text }),
                {}
            )
        )
    }

    const showCompanyDetails = (companyType: CompanyType) => {
        return companyDetailsCommon(companyType).length !== 0
    }

    const renderCompanyDetails = (companyType: CompanyType) => {
        const result = companyDetailsCommon(companyType)
        if (result) {
            // @ts-ignore
            return result.map((inn) => <li>{inn || ' '}</li>)
        }
        return null
    }

    return (
        <div className="resume-wrap">
            <div className="basic-info-wrap">
                <div className="section-title-main"> ~ Ana Arribasplata ~ </div>
                <div className="social-main">
                    <Link to="https://github.com/arrb" target="_blank">Github</Link>
                    <Link to="https://www.linkedin.com/in/anaarribasplata/" target="_blank">
                        Linkedin
                    </Link>
                </div>
            </div>
            <div className="buttons-wrap">
                {tagsToShow.map((inn, index) => (
                    <button
                        onClick={() => addToTags(inn)}
                        className={classNames('tags-button', {
                            'tags-button--selected': tags.includes(inn),
                        })}
                        key={index}
                    >
                        {inn}
                    </button>
                ))}
            </div>

            <div className="company-info-wrap">
                <div className="section-title">Experience</div>
                <div className="company-wrapper">
                    {resume &&
                        resume.companies.map((inn, index) => {
                            if (showCompanyDetails(inn)) {
                                return (
                                    <>
                                        <div
                                            className="company-name-and-dates"
                                            key={index}
                                        >
                                            <div className="company-section">
                                                {inn.company} - {inn.title}
                                            </div>
                                            <div className="company-dates">
                                                {inn.time}
                                            </div>
                                        </div>
                                        <div className="company-description">
                                            {inn.desc}
                                        </div>
                                        <div className="company-examples">
                                            {
                                                <ul>
                                                    {renderCompanyDetails(inn)}
                                                </ul>
                                            }
                                        </div>
                                    </>
                                )
                            } else {
                                return <></>
                            }
                        })}
                </div>
            </div>

            <div className="education-info-wrap">
                <div className="section-title">Education</div>
                {resume &&
                    resume.educations.map((inn, index) => (
                        <div className="education-info" key={index}>
                            <div className="education-name">
                                {inn.education}
                            </div>
                            <div className="education-address">
                                {inn.degree} in {inn.major}
                            </div>
                            <div className="education-dates">{inn.dates}</div>
                        </div>
                    ))}
            </div>
            <FAB />
        </div>
    )
}

export default Resume

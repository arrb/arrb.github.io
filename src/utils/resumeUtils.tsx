export interface InfoType {
    companies: CompanyType[]
    companyProjects: CompanyProject[]
    educations: EducationType[]
    tags: TagType[]
    sortedTags: TagType[]
    meta: MetaType[]
}

interface EducationType {
    degree: string
    education: string
    location: string
    major: string
    dates: string
}

interface MetaType {
    descs: DescsType[]
    linkedin: string
    location: string
    name: string
    title: string
}

interface TagType {
    uses?: number
    tag: string
    company?: string
    text?: string
}

export interface CompanyType {
    company: string
    desc: string
    tags: TagType[]
    time: string
    title: string
}

interface CompanyProject {
    companyProject: string
    tags: TagType[]
    desc: string
}

interface DescsType {
    info: string
    tags?: TagType[]
    text?: string
}

const info: InfoType = {
    companies: [],
    companyProjects: [],
    educations: [],
    tags: [],
    sortedTags: [],
    meta: [],
}

export const error = (msg: string) => {
    console.log(msg)
}

const toCamelCase = (str: string) => {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase()
        })
        .replace(/\s+/g, '')
}

export const convertJsonCases = (obj: {
    [x: string]: any
    hasOwnProperty: (arg0: string) => any
}) => {
    let key, convertedKey
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            convertedKey = toCamelCase(key)
            if (convertedKey !== key) {
                obj[convertedKey] = obj[key]
                delete obj[key]
            }
            if (typeof obj[convertedKey] === 'object') {
                convertJsonCases(obj[convertedKey])
            }
        }
    }
}

const addTag = (tagToAdd: string, obj: CompanyProject) => {
    const lTag = tagToAdd?.toLowerCase()
    let uses = 1
    const filteredInfo = info?.tags?.filter(
        (inn) =>
            inn.tag === lTag &&
            inn.company === obj.companyProject &&
            inn.text === obj.desc
    )
    if (filteredInfo?.length !== 0) {
        filteredInfo?.map((inn) =>
            inn.uses &&
            inn.company === obj.companyProject &&
            inn.text === obj.desc
                ? (inn.uses += 1)
                : undefined
        )
    } else {
        info.tags.push({
            tag: lTag,
            uses,
            company: obj.companyProject,
            text: obj.desc,
        })
    }

    return info?.tags?.filter((inn) => inn.tag === lTag)[0]
}

const addTagsAndDescsCompanyType = (obj: CompanyProject) => {
    const parsedTags: TagType[] = []
    let tags = obj.tags

    for (let i in tags) {
        const tag: TagType | string = tags[i]

        let tagText
        if (typeof tag == 'string') {
            tagText = tag
        } else {
            tagText = tag.tag
        }

        const canonicalTag = addTag(tagText, obj)
        if (canonicalTag) {
            parsedTags.push({
                ...canonicalTag,
            })
        }
    }
    return { tags: parsedTags }
}

const parseResumeObject = (
    obj:
        | string
        | TagType
        | CompanyType
        | MetaType
        | EducationType
        | CompanyProject
) => {
    let string = Object.keys(obj)[0]
    if (string === 'company') {
        info?.companies?.push({ ...(obj as CompanyType) })
    } else if (string === 'meta') {
        info.meta.push({ ...(obj as MetaType) })
    } else if (string === 'companyProject') {
        const t = addTagsAndDescsCompanyType(obj as CompanyProject)
        info?.companyProjects?.push({
            ...(obj as CompanyProject),
            tags: t.tags,
        })
    } else if (string === 'education') {
        info?.educations?.push(obj as EducationType)
    } else {
        error(`Could not parse resume, ${obj} is invalid`)
    }
}

export const parseResume = (resumeObjects: string[]) => {
    for (let i in resumeObjects) {
        parseResumeObject(resumeObjects[i])
    }

    info.sortedTags = []
    for (let tag in info.tags) {
        info.sortedTags.push(info.tags[tag])
    }
    info.sortedTags = info.sortedTags?.sort(function (tag1, tag2) {
        if (tag1.uses && tag2.uses) {
            if (tag1?.uses < tag2?.uses) return 1
            if (tag1?.uses > tag2?.uses) return -1
            return 0
        }
        return 0
    })

    return info
}

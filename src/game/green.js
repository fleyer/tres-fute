
const Rule = [
    [
        { content: '\u22651', indicator: 1 },
        { content: '\u22652', indicator: 3 },
        { content: '\u22653', indicator: 6 },
        { content: '\u22654', bonus: '+1', indicator: 10 },
        { content: '\u22655', indicator: 15 },
        { content: '\u22651', mark: 'blue', indicator: 21 },
        { content: '\u22652', bonus: 'wolf', indicator: 28 },
        { content: '\u22653', indicator: 36 },
        { content: '\u22654', mark: 'purple-6', indicator: 45 },
        { content: '\u22655', bonus: 'replay', indicator: 55 },
        { content: '\u22656', indicator: 66 }
    ]
]

const Css = {
    bg: 'bg-green-500',
    color: 'green-500',
}

const Id = 'green'

const calculateScore = (step) => {
    const keys = Object.keys(step)

    const result = keys.filter((key) => { 
        const split = key.split('-')
        const lastIndex = split.length - 1

        return step[key] && Number(split[lastIndex]) >= 0
    }).length


    return result > 1 ? Rule[0][result-1].indicator : 0
}

export { Rule, Css, Id, calculateScore }
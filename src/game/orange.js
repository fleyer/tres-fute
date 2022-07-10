const Rule = [
    [
        { content: '', },
        { content: '', },
        { content: '', bonus: 'replay' },
        { content: 'x2', },
        { content: '', mark: 'yellow', colorVariation: 400 },
        { content: '', bonus: '+1' },
        { content: 'x2' },
        { content: '', bonus: 'wolf' },
        { content: 'x2' },
        { content: '', mark: 'purple-6' },
        { content: 'x3', }
    ]
]

const Css = {
    bg: 'bg-yellow-500',
    color: 'yellow-500'
}

const Id = 'orange'

const calculateScore = (step) => {
    return Object.values(step)
    .filter(value => typeof value === 'number')
    .reduce((acc,current) => acc + current,0)
}

export { Rule, Css, Id, calculateScore }
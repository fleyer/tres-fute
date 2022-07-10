
const Rule = [
    [
        {},
        {},
        { bonus: 'replay' },
        { mark: 'blue' },
        { bonus: '+1' },
        { mark: 'yellow', colorVariation: '400' },
        { bonus: 'wolf' },
        { bonus: 'replay' },
        { mark: 'green' },
        { mark: 'yellow-6', colorVariation: '500' },
        { bonus: '+1' }
    ]
]

const Css = {
    bg: 'bg-purple-500'
}

const Input = {
    type: 'number'
}

const Id = 'purple'

const calculateScore = (step) => {
    return Object.values(step)
    .filter(value => typeof value === 'number')
    .reduce((acc,current) => acc + current,0)
}

export { Rule, Css, Input, Id , calculateScore }
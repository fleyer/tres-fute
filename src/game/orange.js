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
    bg: 'bg-orange-500',
    color: 'orange-500'
}

const Id = 'orange'

const calculateScore = (step) => {
    return Object.values(step)
    .filter(value => typeof value === 'number')
    .reduce((acc,current,index) => acc + (Rule[0][index].content === 'x2' ? 2*current : 
        Rule[0][index].content === 'x3' ? 3*current : 
        current
    ),0)
}

const isWolfChecked = (step) => {
    return Object.values(step)
        .some((step,index) => Rule[0][index].bonus === 'wolf' && typeof step === 'number' )
}



export { Rule, Css, Id, calculateScore, isWolfChecked }
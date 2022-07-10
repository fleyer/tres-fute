const Rule = [
    [
        {content: '3'},
        {content: '6'},
        {content: '5'},
        {},
        {mark: 'blue', tail: true}
    ],
    [
        {content: '2'},
        {content: '1'},
        {},
        {content: '5'},
        {mark: 'yellow-4', colorVariation: '500', tail: true}
    ],
    [
        {content: '1'},
        {},
        {content: '2'},
        {content: '4'},
        {mark: 'green', tail: true}
    ],
    [
        {},
        {content: '3'},
        {content: '4'},
        {content: '6'},
        {bonus: 'wolf', tail: true}
    ],
    [
        {indicator: 10,tail: true},
        {indicator: 14,tail: true},
        {indicator: 16,tail: true},
        {indicator: 20,tail: true},
        {bonus: '+1',tail: true},
    ]
]

const Css = {
    bg: 'bg-yellow-400',
    color: 'black-500'
}

const Id = 'yellow'

const calculateScore = (step) => {
    let result = 0

    for(let i = 0; i < 4; i++){
        if(isColumnCompleted(step,i)) result += getColumnScore(i)
    }

    return result;
}

const getColumnScore = (column) => Rule[4][column].indicator

const isColumnCompleted = (step,column) => {
    let row = 0

    while(row < 4 && step[`${Id}-${row}-${column}`]) row++;

    return row == 4;
}

export {Rule,Css,Id,calculateScore} 
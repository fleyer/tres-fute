const Rule = [
    [
        {content: '3'},
        {content: '6'},
        {content: '5'},
        {content: 'X'},
        {mark: 'blue', tail: true}
    ],
    [
        {content: '2'},
        {content: '1'},
        {content: 'X'},
        {content: '5'},
        {mark: 'yellow-4', colorVariation: '500', tail: true}
    ],
    [
        {content: '1'},
        {content: 'X'},
        {content: '2'},
        {content: '4'},
        {mark: 'green', tail: true}
    ],
    [
        {content: 'X'},
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

export {Rule,Css} 
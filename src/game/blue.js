const Rule = [
    [
        {image: 'square-blue+plus-white+square-white',tail: true},
        {content: '2'},
        {content: '3'},
        {content: '4'},
        {mark: 'orange-5', tail: true}
    ],
    [
        {content: '5'},
        {content: '6'},
        {content: '7'},
        {content: '8'},
        {mark: 'yellow', colorVariation: '400', tail: true}
    ],
    [
        {content: '9'},
        {content: '10'},
        {content: '11'},
        {content: '12'},
        {bonus: 'wolf', tail: true}
    ],
    [
        {bonus: 'replay', tail: true},
        {mark: 'green', tail: true},
        {mark: 'purple-6', tail: true},
        {bonus: '+1', tail: true}
    ]
]

const Css = {
    bg: 'bg-blue-500'
}

const Header = [
    [
        { indicator: 1, content: '1', tail: true},
        { indicator: 2,  content: '2', tail: true},
        { indicator: 4,  content: '3', tail: true},
        { indicator: 7,  content: '4', tail: true},
        { indicator: 11,  content: '5', tail: true},
        { indicator: 16,  content: '6', tail: true},
        { indicator: 22,  content: '7', tail: true},
        { indicator: 29,  content: '8', tail: true},
        { indicator: 37,  content: '9', tail: true},
        { indicator: 46,  content: '10', tail: true},
        { indicator: 56,  content: '11', tail: true}
    ]
]

export {Rule,Css,Header} 
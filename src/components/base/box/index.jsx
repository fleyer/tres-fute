import { h } from 'preact'

const Box = ({css,children}) => {
    return(
        <div class={`p-1 z-10 border-2 border-white text-sm font-bold rounded ${css}`}>{children}</div>
    )
}

export default Box
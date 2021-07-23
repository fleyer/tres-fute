import { h } from 'preact'
import { renderToString } from 'preact-render-to-string'

import { BsSquare } from 'react-icons/bs'
import { TiPlusOutline } from 'react-icons/ti'

const Image = ({image}) =>{

    return <div>
        {getImagesValues(image)}
    </div>
}

const getImagesValues = (image) => {
    const images = image.split("+")

    return images.map(image => build(image))
    .map(imageObj => createImage(imageObj))
}

const build = (image) => {
    const [icon,color,colorVariation] = image.split('-')

    return {
        icon: icon,
        color: `text-${color}${colorVariation ? "-"+colorVariation : ""}`
    }
}

const createImage = ({icon,color}) => {
    const ImageCmp =  getImage

return (<div class={color}>
       <ImageCmp icon={icon}></ImageCmp>
    </div>)
}

const getImage = ({icon}) => {
    switch(icon){
        case 'square':
            return (<BsSquare></BsSquare>)
        break

        case 'plus':
            return (<TiPlusOutline></TiPlusOutline>)
        break

        default:
            return null
    }

    // return <IoSquare></IoSquare>
}


export default Image
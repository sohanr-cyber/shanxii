import { colors } from './color'

const findRGB = (color) => {
    const rgb = colors.find(c => c.name == color)?.rgb
    return rgb
}

export { findRGB }






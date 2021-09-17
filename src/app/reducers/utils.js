const getId = (color) => (index) => `${color}-0-${index}`
const getDisabledId = (color) => (id) => `${getId(color)(id)}-disabled`
const getErrorId = (color) => (id) => `${getId(color)(id)}-error`

export { getId, getDisabledId, getErrorId }
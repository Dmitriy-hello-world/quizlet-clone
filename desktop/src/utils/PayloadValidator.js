
export default class PayloadValidator {
    constructor(rules) {
        this.rules = rules;
        this.checkList = {
            'max-length': (field, length) => field?.length <= length,
            'required': (field) => !!field?.length,
            'image-size': (field, maxSize) => maxSize > (field?.size || 0),
            'image-type': (field, types) => field?.type ? types.includes(field?.type) : true,
            'trim' : (field) => !!field.trim()?.length
        }
        this.errorMessageMapper = {
            'max-length': 'Your message too long',
            'required' : 'Field is required',
            'image-size': 'Your image too large',
            'image-type': 'Invalid image format',
            'trim': 'Field is required'
        }
    }

    validate(payload) {
        for (const [ field, rules ] of Object.entries(this.rules)) {
            for (const rule of rules) {
                const [ key, value ] = typeof(rule) === 'object' ? Object.entries(rule)[0] : [ rule ];

                if (!this.checkList?.[key](payload?.[field], value)) throw {
                    [field]: this.errorMessageMapper[key]
                }
            }
        }
    }
}
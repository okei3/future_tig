/**
 * validate.js
 */
// ----[ Modules ]--------------------------------------------------------------
var Exception = require('../system/exception');

// ----[ Constants ]------------------------------------------------------------
const KEY_TYPE      = 'TYPE';
const KEY_DEFAULT   = 'DEFAULT';
const KEY_MIN       = 'MIN';
const KEY_MAX       = 'MAX';

const TYPE_BOOL     = 'BOOL';
const TYPE_INT      = 'INT';
const TYPE_STRING   = 'STRING';
const TYPE_ARRAY    = 'ARRAY';
const TYPE_OBJECT   = 'OBJECT';

/**
 * Key
 */
const KEY = {
    TYPE:     KEY_TYPE,
    DEFAULT:  KEY_DEFAULT,
    MIN:      KEY_MIN,
    MAX:      KEY_MAX,
}

/**
 * Type
 */
const TYPE = {
    BOOL:   TYPE_BOOL,
    INT:    TYPE_INT,
    STRING: TYPE_STRING,
    ARRAY:  TYPE_ARRAY,
    OBJECT: TYPE_OBJECT,
}

// ----[ Export Methods ]-------------------------------------------------------
/**
 * validate
 *
 * @param   object  object to check
 * @param   object  object rule
 * @return  object
 */
function validate(input, settings) {
    var ret = {};
    validateSettings(settings).each(function(setting, key) {
        var value = null;
        if (input.hasKey(key)) {
            value = input[key];
        } else if (setting.hasKey(KEY_DEFAULT)) {
            value = setting[KEY_DEFAULT];

            // return if default
            ret[key] = setting[KEY_DEFAULT];
            return;
        } else {
            throw new Exception(
                'required key does not exist',
                {key: key, input: input}
            );
        }

        // type validate
        if (setting.hasKey(KEY_TYPE)) {
            value = convertType(value, setting[KEY_TYPE]);
        }

        // min, max validation
        var valueToCompare = (setting[KEY_TYPE] === TYPE_INT)
            ? value
            : value.length;
        if (setting.hasKey(KEY_MIN) && valueToCompare < setting[KEY_MIN]) {
            throw new Exception(
                'the value cannot be less than MIN',
                {min: setting[KEY_MIN], value: ret[key]}
            );
        }
        if (setting.hasKey(KEY_MAX) && setting[KEY_MAX] < valueToCompare) {
            throw new Exception(
                'the value cannot be more than MAX',
                {max: setting[KEY_MAX], value: ret[key]}
            );
        }

        ret[key] = value;
    });

    return ret;
}
module.exports = validate;

// ----[ Methods ]--------------------------------------------------------------
/**
 * validate settings
 *
 * @param   object  settings
 * @return  object  validated setting
 */
function validateSettings(settings)
{
    settings.map(function(setting) {
        var ret = {};
        Object.keys(setting).each(function(key) {
            if (!KEY.has(key)) {
                throw new Exception(
                    'invalid setting, undefined key',
                    {key: key, allowed_keys: KEY}
                );
            }
        });

        // check type
        if (setting.hasKey(KEY_TYPE)) {
            if (!TYPE.has(setting[KEY_TYPE])) {
                throw new Exception(
                    'invalid setting',
                    {key: setting[KEY_TYPE]}
                );
            } else {
                ret[KEY_TYPE] = setting[KEY_TYPE];
            }
        }

        // check default
        if (setting.hasKey(KEY_DEFAULT)) {
            ret[KEY_DEFAULT] = setting[KEY_DEFAULT];
        }

        // check min
        if (setting.hasKey(KEY_MIN)) {
            if (!ret.hasKey(KEY_TYPE)) {
                throw new Exception('type is required to check MIN');
            } else if (isNaN(setting[KEY_MIN])) {
                throw new Exception(
                    'the setting "min" must be numeric',
                    {min: setting[KEY_MIN]}
                );
            }
            ret[KEY_MIN] = setting[KEY_MIN];
        }

        // check max
        if (setting.hasKey(KEY_MAX)) {
            if (!ret.hasKey(KEY_TYPE)) {
                throw new Exception('type is required to check MIN');
            } else if (isNaN(setting[KEY_MAX])) {
                throw new Exception(
                    'the setting "max" must be numeric',
                    {max: setting[KEY_MAX]}
                );
            }
            ret[KEY_MAX] = setting[KEY_MAX];
        }

        return ret;
    });

    return settings;
}

/**
 * convert type
 *
 * @param   any
 * @param   string
 * @return  any
 */
function convertType(value, type)
{
    switch (type) {
        case TYPE_BOOL:
            if (value instanceof Object) {
                throw new Exception(
                    'value must be Boolean',
                    {key: key, value: value}
                );
            }
            return !!value;

        case TYPE_INT:
            if (isNaN(value) || value != (value | 0)) {
                throw new Exception(
                    'value must be an Integer',
                    {key: key, value: value}
                );
            }
            return +value;

        case TYPE_STRING:
            if (!['string', 'number'].has(typeof value)) {
                throw new Exception(
                    'value must be an String',
                    {key: key, value: value}
                );
            }
            return value + '';

        case TYPE_ARRAY:
            if (!(value instanceof Array)) {
                throw new Exception(
                    'value must be an Array',
                    {key: key, value: value}
                );
            }
            return value;

        case TYPE_OBJECT:
            var isObject = (typeof value === 'object');
            if (!isObject || value instanceof Array) {
                throw new Exception(
                    'value must be an Object',
                    {key: key, value: value}
                );
            }
            return value;
            break;

        default:
            return value;
    }
}


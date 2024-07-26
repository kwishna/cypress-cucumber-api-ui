const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

function validateSchema(schema, data) {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    console.log(validate.errors)
    return valid;
};

const data = {
  "todos": [
    {
      "id": 6,
      "title": "process payroll",
      "doneStatus": false,
      "description": ""
    },
    {
      "id": 9,
      "title": "tidy meeting room",
      "doneStatus": false,
      "description": ""
    }
   ]
};

const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "object",
    "properties": {
        "todos": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "number"
                    },
                    "title": {
                        "type": "string"
                    },
                    "doneStatus": {
                        "type": "boolean"
                    },
                    "description": {
                        "type": "string"
                    }
                },
                "required": [
                    "id",
                    "title",
                    "doneStatus",
                    "description"
                ]
            }
        }
    },
    "required": [
        "todos"
    ]
};

console.log(validateSchema(schema, data));
'use strict';

const checkAllowedFields = function(objectToSanitize, allowedKeys) {
	const unallowedKeysFound = [];

	Object.keys(objectToSanitize).forEach(function(key) {
		if (allowedKeys.indexOf(key) === -1) {
			unallowedKeysFound.push(key);
		}
	});

	if (unallowedKeysFound.length !== 0) {
		const message = 'Unallowed key(s) found for objectToSanitize: ' + unallowedKeysFound.join(', ');
		throw new Error(message);
	}
};

//exports.checkIfMissingMandatoryFields = function(objectToSanitize, mandatoryFields) {
	//var missingFieldsFound = [];

	//mandatoryFields.forEach(function(field) {
		//if (Object.keys(objectToSanitize).indexOf(field) === -1) {
			//missingFieldsFound.push(field);
		//}
	//});

	//if (missingFieldsFound.length !== 0) {
		//var message = 'Mandatory fields missing for objectToSanitize: ' + missingFieldsFound.join(', ');
		//throw new Error(message);
	//}
//};

const checkForMandatory = function(objectToSanitize, field) {
	const fieldName = field.name;

	if (Object.keys(objectToSanitize).indexOf(fieldName) === -1) {
		let message = 'Mandatory field '+fieldName+' was not provided.';
		throw new Error(message);
	}
};

const checkIfString = function(variable) {
	if (!(typeof variable === 'string' || variable instanceof String)) {
		const message = 'variable should be a string, received: '+typeof(variable);
		throw new Error(message);
	}
};

const checkIfNumber = function(variable) {
	if (isNan(variable)) {
		const message = 'variable should be a number, received: '+typeof(variable);
		throw new Error(message);
	}
};

const checkIfAlphaNum = function(variable) {
	try {
		checkIfString(variable);
	}
	catch(e){
		const message = 'variable should be alphanumeric, received: '+typeof(variable);
		throw new Error(message);
	}

	if (!variable.match(/^[0-9a-z]+$/)) {
		const message = 'variable should be alphanumeric, received: '+typeof(variable);
		throw new Error(message);
	}
};

const checkIfBoolean = function(variable) {
	if (!(typeof variable === 'boolean' || variable instanceof Boolean)) {
		const message = 'variable should be a boolean, received: '+typeof(variable);
		throw new Error(message);
	}
};

const checkIfObject = function(variable) {
	if (variable === null || typeof variable !== 'object') {
		const message = 'variable should be a non null object, received: '+typeof(variable);
		throw new Error(message);
	}
};

const checkIfArray = function(variable) {
	if (!Array.isArray(variable)) {
		const message = 'variable should be an array, received: '+typeof(variable);
		throw new Error(message);
	}
};

const checkForType = function(objectToSanitize, field) {
	const allowedTypes = ['string', 'number', 'alphanum', 'boolean', 'object', 'array'];

	// First, checking that the field.type is compliant
	const fieldType = field.type;
	checkIfString(fieldType);
	if (allowedTypes.indexOf(fieldType) === -1) {
		const message = 'fieldType provided unknown or not allowed, received: ' + fieldType;
		throw new Error(message);
	}

	// And now checking that the field of the object to sanitize is of the expected type
	// If the field is not present, it means it is not mandatory since mandatory check was run before.
	if (!objectToSanitize[field.name]) {
		return;
	}

	const fieldToCheck = objectToSanitize[field.name];

	switch (fieldType) {
		case 'string':
			checkIfString(fieldToCheck);
			break;
		case 'number':
			checkIfNumber(fieldToCheck);
			break;
		case 'alphanum':
			checkIfAlphaNum(fieldToCheck);
			break;
		case 'boolean':
			checkIfBoolean(fieldToCheck);
			break;
		case 'object':
			checkIfObject(fieldToCheck);
			break;
		case 'array':
			checkIfArray(fieldToCheck);
			break;
		default:
			const message = 'fieldType provided unknown or not allowed, received: ' + fieldType;
			throw new Error(message);
	}
};

const validate = function(objectToSanitize, fields) {
	if (!Array.isArray(fields)) {
		const message = 'Expected an array for variable fields, received: ' + typeof(fields);
		throw new Error(message);
	}

	fields.forEach(function(field) {
		if (!field.name) {
			let message = 'No name provided for the field.';
			throw new Error(message);
		}
		if (!field.type) {
			let message = 'No type provided for the field.';
			throw new Error(message);
		}

		if (field.mandatory) {
			checkForMandatory(objectToSanitize, field);
		}

		checkForType(objectToSanitize, field);
	});
};

exports.checkAllowedFields = checkAllowedFields;
exports.validate = validate;

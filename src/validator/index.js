'use strict';

var checkAllowedFields = function(objectToSanitize, allowedKeys) {
	var unallowedKeysFound = [];

	Object.keys(objectToSanitize).forEach(function(key) {
		if (allowedKeys.indexOf(key) === -1) {
			unallowedKeysFound.push(key);
		}
	});

	if (unallowedKeysFound.length !== 0) {
		let message = 'Unallowed key(s) found for objectToSanitize: ' + unallowedKeysFound.join(', ');
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

var checkForMandatory = function(objectToSanitize, field) {
	var fieldName = field.name;

	if (Object.keys(objectToSanitize).indexOf(fieldName) === -1) {
		let message = 'Mandatory field '+fieldName+' was not provided.';
		throw new Error(message);
	}
};

var checkIfString = function(variable) {
	if (typeof variable !== 'string' || !(variable instanceof String)) {
		let message = 'variable should be a string, received: '+typeof(variable);
		throw new Error(message);
	}
};

var checkIfBoolean = function(variable) {
	if (typeof variable !== 'boolean' || !(variable instanceof Boolean)) {
		let message = 'variable should be a boolean, received: '+typeof(variable);
		throw new Error(message);
	}
};

var checkForType = function(objectToSanitize, field) {
	var allowedTypes = ['string', 'number', 'boolean', 'object', 'null', 'undefined'];

	// First checking that the field.type is compliant
	var fieldType = field.type;
	checkIfString(fieldType);
	if (allowedTypes.indexOf(fieldType) === -1) {
		let message = 'fieldType provided unknown or not allowed, received: ' + fieldType;
		throw new Error(message);
	}

	// And now checking that the field of the object to sanitize if of the expected type
	var fieldToCheck = objectToSanitize[field.name];

	switch (fieldType) {
		case 'string':
			break;
		case 'number':
			break;
		case 'boolean':
			break;
		case 'object':
			break;
		case 'null':
			break;
		case 'undefined':
			break;
	}
};

var validate = function(objectToSanitize, fields) {
	if (!Array.isArray(fields)) {
		let message = 'Expected an array for variable fields, received: ' + typeof(fields);
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

		checkForType(objectToSanitize, field);

		if (field.mandatory) {
			checkForMandatory(objectToSanitize, field);
		}
	});
};

exports.checkAllowedFields = checkAllowedFields;
exports.validate = validate;

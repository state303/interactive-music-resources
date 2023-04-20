// Example of N4M (Node for Max) utilization

const maxAPI = require("max-api");
const und = 'undefined';
const blank = {};
const isDelim = new RegExp("\d");

function isString(v) {
    return typeof v === 'string';
}

function isArray(v) {
	return Array.isArray(v);
}

function isDelimiter(c) {
    return c === ' ' || c === '\n' || c === ',';
}

function split(v) {
    let dict = [];

	maxAPI.post(`${Array.isArray(v)}`);
	
	if (isArray(v)) {
		return v;
	}

    if (!isString(v)) {
        return dict;
    }

    let idx = 0; 
    let buf = '';

    for (let i = 0; i < v.length; i++) {
        let c = v[i];
        if (isDelimiter(c) && buf.length > 0) {
            dict[idx++] = buf;
            buf = '';
        } else if (!isDelimiter(c)) {
            buf += c;
        }
    }

    if (buf.length > 0) {
        dict[idx] = buf;
    }

    return dict;
}

maxAPI.addHandler('getSubStrings', (...list) => {
	var r = split(list);
	maxAPI.outlet(r.join(' '), r.length);
});

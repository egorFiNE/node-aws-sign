var 
	crypto = require('crypto'),
	querystring = require('querystring');


function AWSRestSigner(credentials) {
	this.accessKeyId = credentials.accessKeyId; 
	this.secretAccessKey = credentials.secretAccessKey; 
	this.debug = false;
}

AWSRestSigner.subResources = ['acl', 'lifecycle', 'location', 'logging', 'notification', 'partNumber', 'policy', 'requestPayment', 'torrent', 'uploadId', 'uploads', 'versionId', 'versioning', 'versions', 'website'];

AWSRestSigner.prototype.canonizeAwzHeaders = function(xAmzHeaders) {
	if (xAmzHeaders) {
		var lcHeaders = {};
		Object.keys(xAmzHeaders).forEach(function(header) {
			var h = header.toLowerCase();
			if (h!='x-amz-date')  {
				lcHeaders[h]=xAmzHeaders[header];
			}
		});

		return Object.keys(lcHeaders)
			.map(function(header) {
				return header.toLowerCase();
			})
			.sort()
			.map(function(header) {
				return header+':'+lcHeaders[header]+"\n";
			})
			.join('');
	} else { 
		return '';
	}
}

AWSRestSigner.prototype.extractSubResources = function(queryString) {
	var query = querystring.parse(queryString);

	var subresources = [];
	Object.keys(query).forEach(function(param) {
		if (AWSRestSigner.subResources.indexOf(param)>=0) {
			subresources.push(param);
		}
	});

	if (subresources.length) {
		subresources = subresources.sort();
		var queryToSign = subresources.map(function(param) {
			var result = param;
			if (query[param]!='') {
				result+="="+query[param];
			}
			return result;
		});
		return "?"+queryToSign.join("&")
	}

	return '';
}

AWSRestSigner.prototype.sign = function(opts) {
	var
		method = opts.method,
		host = opts.host || '',
		path = opts.path,
		xAmzHeaders = {},
		date, contentType, contentMd5,
		bucket = "";

	var _match = host.match(/^(.*)\.s3\.amazonaws\.com/); 
	if (_match) {
		bucket = _match[1];
	} else {
		bucket = host;
	}

	if (!opts.headers) {
		opts.headers = {};
	}

	Object.keys(opts.headers).forEach(function(key) {
		var lcKey = key.toLowerCase();
		switch(lcKey) {
			case "date": 
				date = opts.headers[key]; 
				break;
			case "content-type": 
				contentType = opts.headers[key]; 
				break;
			case "content-md5": 
				contentMd5 = opts.headers[key]; 
				break;
			default:
				if("x-amz-" === lcKey.slice(0, 6)) {
					xAmzHeaders[lcKey] = opts.headers[key];
				}
				break;
		}
	});

	if (!date) {
		date = new Date().toUTCString();
		opts.headers.date = date;
	}
	
	opts.headers["Authorization"] = this._sign(method, bucket, path, date, contentType, contentMd5, xAmzHeaders);
}


AWSRestSigner.prototype._sign = function(method, bucket, path, date, contentType, contentMd5, xAmzHeaders) {
	var qPos = path.indexOf('?'), queryToSign='';
	if (qPos>=0) {
		var queryPart = path.substr(qPos+1, path.length);
		path = path.substr(0,qPos);
		queryToSign = this.extractSubResources(queryPart);
	}

	var canonicalizedAmzHeaders = this.canonizeAwzHeaders(xAmzHeaders);

	var canonicalizedResource = '';
	if (bucket!='') {
		canonicalizedResource += '/'+bucket;
	}
	canonicalizedResource += path + queryToSign;

	var stringToSign = method + "\n";
	if (contentMd5) { 
		stringToSign += contentMd5;
	} 
	stringToSign += "\n";

	if (contentType) {
		stringToSign += contentType;
	}
	stringToSign += "\n";

	stringToSign +=  
		date + "\n" +
		canonicalizedAmzHeaders +
		canonicalizedResource;

	if (this.debug) { 
		console.log("-----------")
		console.log(stringToSign.replace(/\n/g, "\\n\n"));
		console.log("-----------")
	}

	return 'AWS ' + this.accessKeyId + ':' + crypto.createHmac('sha1', this.secretAccessKey).update(stringToSign).digest('base64'); 
}

module.exports = AWSRestSigner;


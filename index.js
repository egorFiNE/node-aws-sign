'use strict';

const
	crypto = require('crypto'),
	querystring = require('querystring');

class AWSRestSigner {
	constructor(credentials) {
		this.accessKeyId = credentials.accessKeyId;
		this.secretAccessKey = credentials.secretAccessKey;
		this.debug = false;
	}

	static canonizeAwzHeaders(xAmzHeaders) {
		if (xAmzHeaders) {
			const lcHeaders = {};
			for (const header of Object.keys(xAmzHeaders)) {
				const h = header.toLowerCase();
				if (h != 'x-amz-date')  {
					lcHeaders[h] = xAmzHeaders[header];
				}
			}

			return Object.keys(lcHeaders)
				.map(header => header.toLowerCase())
				.sort()
				.map(header => header + ':' + lcHeaders[header] + "\n")
				.join('');
		}

		return '';
	}

	static extractSubResources(queryString) {
		const query = querystring.parse(queryString);

		const subresources = [];
		for (const param of Object.keys(query)) {
			if (AWSRestSigner.subResources.indexOf(param) >= 0) {
				subresources.push(param);
			}
		}

		if (subresources.length) {
			subresources.sort();

			const queryToSign = subresources.map(param => {
				let result = param;
				if (query[param] != '') {
					result += "=" + query[param];
				}
				return result;
			});

			return "?" + queryToSign.join("&");
		}

		return '';
}

	sign(opts) {
		const method = opts.method,
			host = opts.host || '',
			path = opts.path || opts.pathname,
			xAmzHeaders = {};
		let
			date=null, contentType=null, contentMd5=null,
			bucket = "";

		const _match = host.match(/^(.*)\.s3\.amazonaws\.com/);
		if (_match) {
			bucket = _match[1];
		} else {
			bucket = host;
		}

		if (!opts.headers) {
			opts.headers = {};
		}

		for (const key of Object.keys(opts.headers)) {
			const lcKey = key.toLowerCase();

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
					if(lcKey.slice(0, 6) == "x-amz-") {
						xAmzHeaders[lcKey] = opts.headers[key];
					}
					break;
			}
		}

		if (!date) {
			date = new Date().toUTCString();
			opts.headers.date = date;
		}

		opts.headers["Authorization"] = this._sign(method, bucket, path, date, contentType, contentMd5, xAmzHeaders);
	}


	_sign(method, bucket, path, date, contentType, contentMd5, xAmzHeaders) {
		const qPos = path.indexOf('?');
		let queryToSign = '';

		let _path = path;
		if (qPos >= 0) {
			const queryPart = path.substr(qPos + 1, path.length);
			_path = path.substr(0, qPos);
			queryToSign = AWSRestSigner.extractSubResources(queryPart);
		}

		const canonicalizedAmzHeaders = AWSRestSigner.canonizeAwzHeaders(xAmzHeaders);

		let canonicalizedResource = '';
		if (bucket!='') {
			canonicalizedResource += '/'+bucket;
		}
		canonicalizedResource += _path + queryToSign;

		let stringToSign = method + "\n";
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
			console.log("-----------");
			console.log(stringToSign.replace(/\n/g, "\\n\n"));
			console.log("-----------");
		}

		return 'AWS ' + this.accessKeyId + ':' + crypto.createHmac('sha1', this.secretAccessKey).update(stringToSign).digest('base64');
	}
}

AWSRestSigner.subResources = ['acl', 'lifecycle', 'location', 'logging', 'notification', 'partNumber', 'policy', 'requestPayment', 'torrent', 'uploadId', 'uploads', 'versionId', 'versioning', 'versions', 'website'];

module.exports = AWSRestSigner;


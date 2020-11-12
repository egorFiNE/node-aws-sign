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
			for (const [ header, value ] of Object.entries(xAmzHeaders)) {
				const lcHeader = header.toLowerCase();
				if (lcHeader != 'x-amz-date')  {
					lcHeaders[lcHeader] = value;
				}
			}

			return Object.keys(lcHeaders)
				.sort()
				.map(header => header + ':' + lcHeaders[header] + '\n')
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

		if (subresources.length <= 0) {
			return '';
		}

		subresources.sort();

		const queryToSign = subresources.map(param => {
			if (query[param] != '') {
				return param + '=' + query[param];
			}
			return param; // FIXME do we really need to return this part as param namae with no '=' ?
		});

		return '?' + queryToSign.join('&');
}

	sign(opts) {
		const method = opts.method,
			host = opts.host || '',
			path = opts.path || opts.pathname,
			xAmzHeaders = {};

		let
			date = null, contentType = null, contentMd5 = null,
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

		for (const [ key, value ] of Object.entries(opts.headers)) {
			const lcKey = key.toLowerCase();

			switch(lcKey) {
				case 'date':
					date = value;
					break;

				case 'content-type':
					contentType = value;
					break;

				case 'content-md5':
					contentMd5 = value;
					break;

				default:
					if (lcKey.startsWith('x-amz-')) {
						xAmzHeaders[lcKey] = value;
					}
					break;
			}
		}

		if (!date) {
			date = new Date().toUTCString();
			opts.headers.date = date;
		}

		opts.headers['Authorization'] = this._sign(method, bucket, path, date, contentType, contentMd5, xAmzHeaders);
	}


	_sign(method, bucket, path, date, contentType, contentMd5, xAmzHeaders) {
		const qPos = path.indexOf('?');
		let queryToSign = '';

		let _path = path;
		if (qPos >= 0) {
			const queryPart = path.substr(qPos + 1);
			_path = path.substr(0, qPos);
			queryToSign = AWSRestSigner.extractSubResources(queryPart);
		}

		const canonicalizedAmzHeaders = AWSRestSigner.canonizeAwzHeaders(xAmzHeaders);

		let canonicalizedResource = '';
		if (bucket != '') {
			canonicalizedResource += '/' + bucket;
		}
		canonicalizedResource += _path + queryToSign;

		let stringToSign = method + '\n';
		if (contentMd5) {
			stringToSign += contentMd5;
		}
		stringToSign += '\n';

		if (contentType) {
			stringToSign += contentType;
		}
		stringToSign += '\n';

		stringToSign +=
			date + '\n' +
			canonicalizedAmzHeaders +
			canonicalizedResource;

		if (this.debug) {
			console.log('-----------');
			console.log(stringToSign.replace(/\n/g, '\\n\n'));
			console.log('-----------');
		}

		return 'AWS ' + this.accessKeyId + ':' + crypto.createHmac('sha1', this.secretAccessKey).update(stringToSign).digest('base64');
	}
}

AWSRestSigner.subResources = [
	'acl',
	'lifecycle',
	'location',
	'logging',
	'notification',
	'partNumber',
	'policy',
	'requestPayment',
	'torrent',
	'uploadId',
	'uploads',
	'versionId',
	'versioning',
	'versions',
	'website'
];

module.exports = AWSRestSigner;

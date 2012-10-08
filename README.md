# node-aws-sign

Simple module to calculate `Authorization` header for Amazon AWS REST requests.

Simple it is: 
	
```javascript
var AwsSign = require('aws-sign');
var signer = new AwsSign({ 
	accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
	secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
});

var opts = {
	method: 'PUT',
	host: 'johnsmith.s3.amazonaws.com',
	path: '/photos/puppy.jpg',
	headers: { ... },
	... // Other request options, ignored by AwsSign.
};
signer.sign(opts);
https.request(opts, ...);
```

The following keys are mandatory: 

* `method`
* `host`
* `path`

Others are optional. A date header (`headers.date`) will be added for you if it is not already set.

## Non-goals

Node.js has no legacy ;-) so there is no need to support some legacy features of Amazon API for older software. I.e. there is no support for path-style bucket access.

`x-amz-date` substitution is not supported because Node's http module has no problems setting `Date` header.

Multiple `x-amz-` keys are not supported. I.e. the following part of the example won't work: 

	X-Amz-Meta-ReviewedBy: joe@johnsmith.net
	X-Amz-Meta-ReviewedBy: jane@johnsmith.net

Use a single header instead: 

	X-Amz-Meta-ReviewedBy: joe@johnsmith.net,jane@johnsmith.net

## 0.0.x to 0.1.x migration guide

0.1.x supports the same options as http.request (thanks to Ben Trask). 

Before:

```javascript
	auth = signer.sign({
		method: 'PUT', 
		bucket: 'johnsmith', 
		path: '/photos/puppy.jpg', 
		date: 'Tue, 27 Mar 2007 21:15:45 +0000', 
		contentType: 'image/jpeg'
	});
	http.request({
		…
		headers: {
			…,
			Authorization: auth
		}
	});
```

After: 

```javascript
	var opts = {
		method: 'PUT', 
		host: 'johnsmith.s3.amazonaws.com',
		path: '/photos/puppy.jpg', 
		headers: {
			date: 'Tue, 27 Mar 2007 21:15:45 +0000', 
			contentType: 'image/jpeg'
		}
	};
	signer.sign(opts);
	http.request(opts);
```


## Testing

	nodeunit test/
	
## Installation

	npm install aws-sign

## Author

Egor Egorov, me@egorfine.com.

## License

MIT.

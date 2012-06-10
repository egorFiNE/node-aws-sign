# node-aws-sign

Simple module to calculate `Authorization` header for Amazon AWS REST requests.

Simple it is: 
	
```javascript
var AwsSign = require('aws-sign');
var signer = new AwsSign({ 
	accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
	secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
});

var authorization = signer.sign({
	method: 'PUT', 
	bucket: 'johnsmith', 
	path: '/photos/puppy.jpg',  
	date: 'Tue, 27 Mar 2007 19:36:42 +0000', 
	contentType: 'image/puppy',
	contentMd5: null, 
	xAmzHeaders: {}
});
```
	
The following keys are mandatory: 

* `method`
* `bucket`
* `path`

Others are optional. `Date` is set to current date if not specified.

## Non-goals

Node.js has no legacy ;-) so there is no need to support some legacy features of Amazon API for older software. I.e. there is no support for path-style bucket access.

`x-amz-date` substitution is not supported because Node's http module has no problems setting `Date` header.

Multiple `x-amz-` keys are not supported. I.e. the following part of the example won't work: 

	X-Amz-Meta-ReviewedBy: joe@johnsmith.net
	X-Amz-Meta-ReviewedBy: jane@johnsmith.net

Use a single header instead: 

	X-Amz-Meta-ReviewedBy: joe@johnsmith.net,jane@johnsmith.net

## Author

Egor Egorov, me@egorfine.com.

## License

MIT, of course. 

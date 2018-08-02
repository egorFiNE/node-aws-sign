# node-aws-sign

Simple module to calculate `Authorization` header for Amazon AWS REST requests.

Simple it is:

```javascript
const AwsSign = require('aws-sign');
const signer = new AwsSign({
	accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
	secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
});

const opts = {
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


## Testing

	mocha test/

## Installation

	npm install aws-sign

## Author

Egor Egorov, me@egorfine.com.

## License

MIT.

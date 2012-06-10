var 
	util = require('util'),
	AwsSign = require('../');

var credentials = { 
	accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
	secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
};

// main test suite as per http://docs.amazonwebservices.com/AmazonS3/latest/dev/RESTAuthentication.html#ConstructingTheAuthenticationHeader
exports['main'] = function(test) {
	test.expect(8);

	var signer = new AwsSign(credentials);
	var auth;

	// Example Object GET
	auth = signer.sign({
		method: 'GET', 
		bucket: 'johnsmith', 
		path: '/photos/puppy.jpg',  
		date: 'Tue, 27 Mar 2007 19:36:42 +0000',
	});
	test.equal(auth, 'AWS AKIAIOSFODNN7EXAMPLE:bWq2s1WEIj+Ydj0vQ697zp+IXMU=');

	// Example Object PUT
	auth = signer.sign({
		method: 'PUT', 
		bucket: 'johnsmith', 
		path: '/photos/puppy.jpg', 
		date: 'Tue, 27 Mar 2007 21:15:45 +0000', 
		contentType: 'image/jpeg'
	});
	test.equal(auth, 'AWS AKIAIOSFODNN7EXAMPLE:MyyxeRY7whkBe+bq8fHCL/2kKUg=');

	// Example List
	auth = signer.sign({
		method: 'GET', 
		bucket: 'johnsmith', 
		path: '/?prefix=photos&max-keys=50&marker=puppy',  
		date: 'Tue, 27 Mar 2007 19:42:41 +0000'
	});
	test.equal(auth, 'AWS AKIAIOSFODNN7EXAMPLE:htDYFYduRNen8P9ZfE/s9SuKy0U=');

	// Example Fetch
	auth = signer.sign({
		method: 'GET', 
		bucket: 'johnsmith', 
		path: '/?acl',  
		date: 'Tue, 27 Mar 2007 19:44:46 +0000'
	});
	test.equal(auth, 'AWS AKIAIOSFODNN7EXAMPLE:c2WLPFtWHVgbEmeEG93a4cG37dM=');

	// Example List All My Buckets
	auth = signer.sign({
		method: 'GET',
		bucket: '',
		path: '/',
		date: 'Wed, 28 Mar 2007 01:29:59 +0000'
	});
	test.equal(auth, 'AWS AKIAIOSFODNN7EXAMPLE:qGdzdERIC03wnaRNKh6OqZehG9s=');

	// Example Delete
	// The following is deliberately left here to illustrate that it won't work (see README.md):
	auth = signer.sign({
		method: 'DELETE', 
		bucket: 'johnsmith', 
		path: '/photos/puppy.jpg',  
		date: 'Tue, 27 Mar 2007 21:20:27 +0000',
		xAmzHeaders: {
			'x-amz-date': 'Tue, 27 Mar 2007 21:20:26 +0000'
		}
	});
	test.ok(auth!='AWS AKIAIOSFODNN7EXAMPLE:9b2sXq0KfxsxHtdZkzx/9Ngqyh8=');

	// Example Unicode Keys
	auth = signer.sign({
		method: 'GET', 
		bucket: 'dictionary', 
		path: '/fran%C3%A7ais/pr%c3%a9f%c3%a8re',  
		date: 'Wed, 28 Mar 2007 01:49:49 +0000'
	});
	test.equal(auth, 'AWS AKIAIOSFODNN7EXAMPLE:DNEZGsoieTZ92F3bUfSPQcbGmlM=');

	auth = signer.sign({
		method: 'PUT',
		bucket: 'static.johnsmith.net',
		path: '/db-backup.dat.gz',
		date: 'Tue, 27 Mar 2007 21:06:08 +0000',
		contentType: 'application/x-download',
		contentMd5: '4gJE4saaMU4BqNR0kLY+lw==',
		xAmzHeaders: {
			'x-amz-acl': 'public-read',
			'X-Amz-Meta-ReviewedBy': 'joe@johnsmith.net,jane@johnsmith.net',
			'X-Amz-Meta-FileChecksum': '0x02661779',
			'X-Amz-Meta-ChecksumAlgorithm': 'crc32',
		}
	});
	test.equal(auth, 'AWS AKIAIOSFODNN7EXAMPLE:ilyl83RwaSoYIEdixDQcA4OnAnc=');

	test.done();
};

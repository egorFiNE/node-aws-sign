var 
	util = require('util'),
	AwsSign = require('../');

var credentials = { 
	accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
	secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
};

// main test suite as per http://docs.amazonwebservices.com/AmazonS3/latest/dev/RESTAuthentication.html#ConstructingTheAuthenticationHeader
exports['main'] = function(test) {
	test.expect(9);

	var signer = new AwsSign(credentials);
	var opts;

	// Example Object GET
	opts = {
		method: 'GET', 
		host: 'johnsmith.s3.amazonaws.com',
		path: '/photos/puppy.jpg',  
		headers: {
			date: 'Tue, 27 Mar 2007 19:36:42 +0000'
		}
	}
	signer.sign(opts);
	test.equal(opts.headers["Authorization"], 'AWS AKIAIOSFODNN7EXAMPLE:bWq2s1WEIj+Ydj0vQ697zp+IXMU=');

	// Example Object PUT
	opts = {
		method: 'PUT', 
		host: 'johnsmith.s3.amazonaws.com',
		path: '/photos/puppy.jpg', 
		headers: {
			date: 'Tue, 27 Mar 2007 21:15:45 +0000', 
			'content-type': 'image/jpeg'
		}
	};
	signer.sign(opts);
	test.equal(opts.headers["Authorization"], 'AWS AKIAIOSFODNN7EXAMPLE:MyyxeRY7whkBe+bq8fHCL/2kKUg=');

	// Example List
	opts = {
		method: 'GET', 
		host: 'johnsmith.s3.amazonaws.com',
		path: '/?prefix=photos&max-keys=50&marker=puppy',  
		headers: {
			date: 'Tue, 27 Mar 2007 19:42:41 +0000'
		}
	}
	signer.sign(opts);
	test.equal(opts.headers["Authorization"], 'AWS AKIAIOSFODNN7EXAMPLE:htDYFYduRNen8P9ZfE/s9SuKy0U=');

	// Example Fetch
	opts = {
		method: 'GET', 
		host: 'johnsmith.s3.amazonaws.com',
		path: '/?acl',  
		headers: {
			date: 'Tue, 27 Mar 2007 19:44:46 +0000'
		}
	}
	signer.sign(opts);
	test.equal(opts.headers["Authorization"], 'AWS AKIAIOSFODNN7EXAMPLE:c2WLPFtWHVgbEmeEG93a4cG37dM=');

	// Example List All My Buckets
	opts = {
		method: 'GET',
		bucket: '',
		path: '/',
		headers: {
			date: 'Wed, 28 Mar 2007 01:29:59 +0000'
		}
	}
	signer.sign(opts);
	test.equal(opts.headers["Authorization"], 'AWS AKIAIOSFODNN7EXAMPLE:qGdzdERIC03wnaRNKh6OqZehG9s=');

	// Example Delete
	// The following is deliberately left here to illustrate that it won't work (see README.md):
	opts = {
		method: 'DELETE', 
		host: 'johnsmith.s3.amazonaws.com',
		path: '/photos/puppy.jpg',  
		headers: {
			date: 'Tue, 27 Mar 2007 21:20:27 +0000',
			'x-amz-date': 'Tue, 27 Mar 2007 21:20:26 +0000'
		}
	}
	signer.sign(opts);
	test.ok(opts.headers["Authorization"]!='AWS AKIAIOSFODNN7EXAMPLE:9b2sXq0KfxsxHtdZkzx/9Ngqyh8=');

	// Example Unicode Keys
	opts = {
		method: 'GET', 
		host: 'dictionary.s3.amazonaws.com',
		path: '/fran%C3%A7ais/pr%c3%a9f%c3%a8re',  
		headers: {
			date: 'Wed, 28 Mar 2007 01:49:49 +0000'
		}
	}
	signer.sign(opts);
	test.equal(opts.headers["Authorization"], 'AWS AKIAIOSFODNN7EXAMPLE:DNEZGsoieTZ92F3bUfSPQcbGmlM=');

	opts = {
		method: 'PUT',
		host: 'static.johnsmith.net',
		path: '/db-backup.dat.gz',
		headers: {
			'date': 'Tue, 27 Mar 2007 21:06:08 +0000',
			'content-type': 'application/x-download',
			'content-md5': '4gJE4saaMU4BqNR0kLY+lw==',
			'x-amz-acl': 'public-read',
			'X-Amz-Meta-ReviewedBy': 'joe@johnsmith.net,jane@johnsmith.net',
			'X-Amz-Meta-FileChecksum': '0x02661779',
			'X-Amz-Meta-ChecksumAlgorithm': 'crc32',
		}
	}
	signer.sign(opts);
	test.equal(opts.headers["Authorization"], 'AWS AKIAIOSFODNN7EXAMPLE:ilyl83RwaSoYIEdixDQcA4OnAnc=');

	// No date specified
	opts = {
		method: 'PUT', 
		host: 'johnsmith.s3.amazonaws.com',
		path: '/photos/puppy.jpg', 
		headers: {
			// No date
		}
	};
	signer.sign(opts);
	test.ok(opts.headers.date);

	test.done();
};

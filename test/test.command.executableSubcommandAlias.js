var exec = require('child_process').exec
  , path = require('path')
  , should = require('should');

var bin = path.join(__dirname, './fixtures/pm');
if (process.platform === 'win32') {
  bin = 'node ' + bin;
}

// success case
exec(bin + ' i', function (error, stdout, stderr) {
  stdout.should.equal('install\n');
});

// subcommand bin file with explicit extension
exec(bin + ' p', function (error, stdout, stderr) {
  stdout.should.equal('publish\n');
});

if (process.platform !== 'win32') {
	// spawn EACCES
	exec(bin + ' s', function (error, stdout, stderr) {
	  // error info are not the same in between <v0.10 and v0.12
	  should.notEqual(0, stderr.length);
	});
}

if (process.platform !== 'win32') {
	// when `bin` is a symbol link for mocking global install
	var bin = path.join(__dirname, './fixtures/pmlink');
	// success case
	exec(bin + ' i', function (error, stdout, stderr) {
	  stdout.should.equal('install\n');
	});
}

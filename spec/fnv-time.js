var fnvtime = require('..');
var expect = require('chai').expect;

function randomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

describe('fnv-time', function () {
  var examples = [
    {
      value: 'the quick brown fox jumps over the lazy dog',
      hash: '7404cea13ff89bb0'
    },
    {
      value: {id: 18162, foo: 'bar', hello: 'world'},
      hash: '5df3a2934bd8d1ef'
    }
  ];

  describe('()', function () {
    var hash = fnvtime();

    it('should generate the hash of an empty string', function () {
      expect(hash('').substr(8)).to.equal('cbf29ce484222325');
    });

    it('should generate the hash of an empty object', function () {
      expect(hash({}).substr(8)).to.equal('08f44b07b5901a25');
    });

    it('should generate the hash of a number', function () {
      expect(hash(124903538).substr(8)).to.equal('cbf29ce484222325');
    });

    examples.forEach(function (example) {
      it('should generate the hash of `' + JSON.stringify(example.value) + '`', function () {
        expect(hash(example.value).substr(8)).to.equal(example.hash);
      });
    });

    [10, 100, 1000, 10000, 100000].forEach(function (length) {
      it('should generate the hash for a string of length ' + length, function () {
        expect(hash(randomString(length))).to.have.length(24);
      });
    });

    it('should use the passed date as the timestamp', function () {
      expect(hash('with time', new Date(1418775200752))).to.equal('i3ry4f749e880e3036473a62');
    });

    it('should generate a hash even if date is null', function () {
      expect(hash('hello world', null).substr(8)).to.equal('779a65e7023cd2e7');
    });

    it('should generate a hash even if date is a string', function () {
      expect(hash('hello world', 'wrong').substr(8)).to.equal('779a65e7023cd2e7');
    });
  });

  describe('(prefix)', function () {
    var hash = fnvtime('prefix');

    it('should generate a hash with the given prefix', function () {
      expect(hash('with a prefix', new Date(1418775200752))).to.equal('prefixi3ry4f741eb4e6918075701e');
    });
  });
});

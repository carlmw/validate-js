/*!
 * Tests were written for nodeunit
 * http://github.com/caolan/nodeunit
 */

var Validate = require('../lib/validate').Validate;
	
module.exports = {
	'isValid returns true on success': function(assert){
		var v = new Validate({name: {pattern:/^.{1,}$/}}, {name:'Bob'});

		assert.strictEqual(v.isValid, true);
		assert.done();
	},
	'isValid returns false on failure': function(assert){
		var v = new Validate({cantina: {pattern:/^han shot first$/}}, {cantina:'greedo shot first'});
		
		assert.strictEqual(v.isValid, false);
		assert.done();
	},
	'isValid returns TRUE when required is not true and value is null': function(assert){
		var v = new Validate({name:{pattern:/^.{1,}$/}}, {name:''});

		assert.strictEqual(v.isValid, true);
		assert.done();
	},
	'isValid returns FALSE when required is not true and value is null': function(assert){
		var v = new Validate({name:{pattern:/^.{1,}$/, required:true}}, {name:''});

		assert.strictEqual(v.isValid, false);
		assert.done();
	}
};
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
	},
	'isValid returns TRUE when using a pattern preset': function(assert){
		var v = new Validate({name:{pattern:'email'}}, {name:'klatuu@baradaniktu.com'});
		
		assert.strictEqual(v.isValid, true);
		assert.done();
	},
	'isValid returns TRUE when using a shorthand pattern': function(assert){
		var v = new Validate({name:/^.{1,}$/}, {name:'herp derp'});
	
		assert.strictEqual(v.isValid, true);
		assert.done();
	},
	'isValid returns TRUE when using a shorthand preset': function(assert){
		var v = new Validate({email:'email'}, {email:'klatuu@baradaniktu.com'});
	
		assert.strictEqual(v.isValid, true);
		assert.done();
	},
	'isValid returns TRUE when no value is undefined': function(assert){
		var v = new Validate({name:/^.{1,}$/}, {});

		assert.strictEqual(v.isValid, true);
		assert.done();
	},
	
};
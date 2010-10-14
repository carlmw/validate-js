/*!
 * A simple javascript validation runner
 * http://github.com/carlmw/validate-js/
 *
 * Copyright 2010, Carl Whittaker
 * Distributed under the MIT license.
 * http://github.com/carlmw/validate-js/license
 */
var Validate = (function(){
	var Validate = function(validators, data){
			this.validators = validators;
			this.data = data;
			this.failed = [];
			this.isValid = true;
		
			this.run();
		},
		Presets = {
			email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i
		};
		
	Validate.prototype = {
		addPreset:function(name, pattern){
			Presets[name] = pattern;
		},
		run: function(){
			for(var f in this.validators){
				this.validate(f, this.validators[f], this.data[f] ? this.data[f].trim() : '');
			}
		},
		validate: function(field, validator, data){
			var pattern = (typeof validator == 'string' || validator instanceof RegExp)? validator : validator.pattern;
			
			if(validator.required && data == ''){
				this.failed.push(field);
				this.isValid = false;

				return;
			}else if(data == ''){
				return;
			}

			if(!((typeof pattern == 'string' ? Presets[pattern] : pattern).exec(data))){
				this.failed.push(field);
				this.isValid = false;
			}
		}
	};
	
	return Validate;
})();

// Export for CommonJS or the browser.
(typeof exports !== 'undefined' ? exports : this).Validate = Validate;
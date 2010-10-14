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
	};
	Validate.prototype = {
		run: function(){
			for(var f in this.validators){
				this.validate(f, this.validators[f], this.data[f].trim());
			}
		},
		validate: function(field, validator, data){
			if(validator.required && data == ''){
				this.failed.push(field);
				this.isValid = false;

				return;
			}else if(data == ''){
				return;
			}

			if(!validator.pattern.exec(data)){
				this.failed.push(field);
				this.isValid = false;
			}
		}
	};
	
	return Validate;
})();

// Export for CommonJS or the browser.
(typeof exports !== 'undefined' ? exports : this).Validate = Validate;
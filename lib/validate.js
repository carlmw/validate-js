/*!
 * A simple javascript validation runner
 * http://github.com/carlmw/validate-js/
 *
 * Copyright 2010, Carl Whittaker
 * Distributed under the MIT license.
 * http://github.com/carlmw/validate-js/license
 */

({define:typeof define!='undefined'?define:function(deps,factory){module.exports=factory.apply(this,deps.map(require));}}).
define([/*'dep1path', 'dep2path', ...*/],function(/*dep1, dep2, ...*/){var exports={};

	var Validate = function(validators, data){
			this.validators = validators;
			this.data = data;
			this.failed = [];
			this.isValid = true;

			this.run();
		},
		Presets = {
			url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
			email: /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i,
			'postal-code': /^ *[a-zA-Z]\d[a-zA-Z] *\d[a-zA-Z]\d *$/
		};

	Validate.prototype = {
		addPreset: function(name, pattern){
			Presets[name] = pattern;
		},
		run: function(){
			for(var f in this.validators){
				this.validate(f, this.validators[f], this.data[f] ? this.data[f].trim() : '');
			}
		},
		validate: function(field, validator, data){
			var pattern = (typeof validator == 'string' || validator instanceof RegExp) ? validator : validator.pattern;

			if(validator.required && data === ''){
				this.failed.push(field);
				this.isValid = false;
				return;
			}else if(data === ''){
				return;
			}

			if(!((typeof pattern == 'string' ? Presets[pattern] : pattern).exec(data))){
				this.failed.push(field);
				this.isValid = false;
			}
		}
	};

exports.Validate = Validate;

return exports;
});

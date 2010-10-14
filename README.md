A simple Javascript Validation runner
=====================================

	var validate = new Validate(
		{
			name: {
				pattern: /^.{8,}$/
			},
			occupation: {
				pattern: /^.{20,}$/,
				required: true
			}
		},
		{
			name: 'Mal Reynolds',
			occupation: 'Captain Tight Pants'
		}
	);

	if(!validate.isValid){
		console.log(validate.failed.join(', '));
	}
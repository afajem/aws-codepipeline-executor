/**
 * AWS Lambda function that is periodically invoked to to start an
 * AWS CodePipeline pipeline.
 *
 * Event Flow:
 * 1. A trigger (such as an AWS CloudWatch Event) invoked the Lambda function
 * 2. The lambda function  executes the specified CodePipeline pipeline using the input pipeline name
 *
 * @param event AWS event object containing event data 
 * @param  context execution context of the function  
 * @param callback Optional callback to return information to the caller.
  */

exports.handler = function(event, context, callback) {
	"use strict";
 
 	// Retrieve the CodePipeline name
	const pipelineName = event.pipelineName;

 	// AWS SDK
	const AWS = require('aws-sdk');

	//Instantiate CodePipeline
	let codepipeline = new AWS.CodePipeline();

	let params = {
			name: pipelineName
	};

	codepipeline.startPipelineExecution(params, function(err, data) {
	  	if (err) {
	   		console.log(err, err.stack); // an error occurred
	   	}
	   	else { 
			console.log(data); // successful response
		}           
	 });

	callback(null, 'Periodic CodePipeline Executor.');
}
# CodePipeline Executor - An AWS Lambda-based CodePipeline invoker

## Why
A key component to a build system is the ability to periodically run the build (and deployment process). AWS CodePipeline currently does not appear to provide this function (at least to the best of my knowledge). AWS however has the building blocks needed to schedule tasks to be periodically executed as well as orchestrating the invocation of AWS services using the [AWS SDK][4]. There are two AWS services that provide these functions: 

* [AWS Lambda][1] - Allows for a snippet of code to be executed based on a predefined trigger
* [AWS CloudWatch][2] - Provides a mechanism for scheduling tasks to be executed

## How does it work?
The execution flow of this AWS Lambda function is depicted in the diagram below:

![AWS Lambda call flow](codepipelineexecutor.png)

An [AWS CloudWatch event rule][2] is defined to specify the schedule that dictates the frequency of invocation. The rule will invoke the AWS Lambda function that has been created, passing in the name of the [AWS CodePipeline][3] to be started. The AWS Lambda function will start the CodePipeline represented by the input pipeline name.  

## Content

The source code is based on a NodeJS package structure and uses NPM to import libraries that facilitate the core functions. The following are the key files needed: 
- [src/index.js][5]: The lambda function used to invoke the CodePipeline
- [package.json](package.json): Defines the packaging tasks and the npm modules in use

## Requirements
- Need to create an [AWS account](http://docs.aws.amazon.com/lambda/latest/dg/setting-up.html)
- Need to setup [AWS CLI](http://docs.aws.amazon.com/lambda/latest/dg/setup-awscli.html) with the credentials of your AWS account
- NodeJS and NPM need to be installed 

## Setting up the Components
1. Define an [AWS CodePipeline][3]
2. Define the [AWS Lambda function][2], using the code from [index.js][5] 
3. Create an [AWS CloudWatch event rule][4]. The rule should define the frequency of execution through a schedule (_fixed rate_ or Cron expression). The target should be the Lambda function created in _Step 2_  with the _Configure Input_ having a JSON object containing the configuration object (event input values) of the function. The following is an example configuration:

```json
{   
	"pipelineName": "MyFirstPipeline"
}
```

## Working with the source code
- Clone or fork this repository
- Ensure that you've followed the [Requirements](#requirements) section above
- Run `npm run build` to install dependencies, package the Lambda function and node modules in a zip and finally deploys the Lambda function to AWS using the AWS CLI. **Ensure that the AWS Lambda function name matches the name specified in the AWS deployment step in [package.json](package.json)**

###License

See [LICENSE](LICENSE) for further details.
 

[1]: http://docs.aws.amazon.com/lambda/latest/dg/welcome.html
[2]: http://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/WhatIsCloudWatchEvents.html
[3]: http://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html
[4]: https://aws.amazon.com/tools/#sdk
[5]: ./src/index.js
 
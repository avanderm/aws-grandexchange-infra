import * as cdk from '@aws-cdk/core';
import * as ssm from '@aws-cdk/aws-ssm';

export class AwsGrandexchangeInfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const association = new ssm.CfnAssociation(this, 'AnsiblePlaybook', {
      name: 'AWS-ApplyAnsiblePlaybooks',
      parameters: {
        "SourceType": [
          "GitHub"
        ],
        "SourceInfo": [
          JSON.stringify({
            "owner": "avanderm",
            "repository": "aws-grandexchange-infra",
            "path": "ansible",
            "getOptions": "branch:master",
            "tokenInfo": "{{ssm-secure:/github/token}}",
          })
        ],
        "InstallDependencies": ['True'],
        "PlaybookFile": ["playbook.yml"],
        "ExtraVariables": ["SSM=True"],
        "Check": ["False"],
        "Verbose": ["-v"]
      },
      targets: [
        {
          key: 'tag:Project',
          values: [
            'grand-exchange'
          ]
        }
      ],
      waitForSuccessTimeoutSeconds: 120
    });
  }
}

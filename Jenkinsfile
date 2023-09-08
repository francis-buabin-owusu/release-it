// App Names
def testingAppName = 'arms-enterprise-testing'
def stagingAppName = 'arms-enterprise-staging'
def productionAppName = 'arms-enterprise-production'

//Deployment Groups
def deployGroup = 'arms-resource-management'

def s3Bucket = 'arms-ent'
def s3FileName = 'arms-resource-management'

pipeline {
    agent any

    tools { nodejs 'nodejs' }

    environment {
        APOLLO_KEY = credentials('APOLLO_KEY')
        APOLLO_GRAPH_REF_TESTING = credentials('APOLLO_GRAPH_REF_TESTING')
        APOLLO_GRAPH_REF_STAGING = credentials('APOLLO_GRAPH_REF_STAGING')
        APOLLO_GRAPH_REF_PRODUCTION = credentials('APOLLO_GRAPH_REF_PRODUCTION')
        APOLLO_SUBGRAPH_NAME_TESTING = credentials('APOLLO_SUBGRAPH_NAME_TESTING')
        APOLLO_SUBGRAPH_NAME_STAGING = credentials('APOLLO_SUBGRAPH_NAME_STAGING')
        APOLLO_SUBGRAPH_NAME_PRODUCTION = credentials('APOLLO_SUBGRAPH_NAME_PRODUCTION')
        ROUTING_URL_TESTING = credentials('ROUTING_URL_TESTING')
        ROUTING_URL_STAGING = credentials('ROUTING_URL_STAGING')
        ROUTING_URL_PRODUCTION = credentials('ROUTING_URL_PRODUCTION')
        SCHEMA_PATH = './src/schema/schema.graphql'
    }

    stages {
        stage('Branch name validation') {
            when {
                changeRequest()
            }
            steps {
                script {
                    def BRANCH_NAME = env.CHANGE_BRANCH
                    sh 'chmod +x ./scripts/branch-name-validator.sh'
                    sh "./scripts/branch-name-validator.sh '${BRANCH_NAME}'"
                }
            }
        }

        stage('Install Rover') {
            when {
                anyOf {
                    branch 'testing'
                    branch 'staging'
                    branch 'production'
                }
            }
            steps {
                sh 'curl -sSL https://rover.apollo.dev/nix/latest | sh -s -- --force'
            }
        }

        stage('Publish Testing Graph') {
            when {
                branch 'testing'
            }
            steps {
                sh 'rover subgraph publish $APOLLO_GRAPH_REF_TESTING --name $APOLLO_SUBGRAPH_NAME_TESTING --schema $SCHEMA_PATH --routing-url $ROUTING_URL_TESTING'
            }
        }

        stage('Publish Staging Graph') {
            when {
                branch 'staging'
            }
            steps {
                sh 'rover subgraph publish $APOLLO_GRAPH_REF_STAGING --name $APOLLO_SUBGRAPH_NAME_STAGING --schema $SCHEMA_PATH --routing-url $ROUTING_URL_STAGING'
            }
        }

        stage('Publish Production Graph') {
            when {
                branch 'production'
            }
            steps {
                sh 'rover subgraph publish $APOLLO_GRAPH_REF_PRODUCTION --name $APOLLO_SUBGRAPH_NAME_PRODUCTION --schema $SCHEMA_PATH --routing-url $ROUTING_URL_PRODUCTION'
            }
        }

        stage('Prepare to Deploy Testing') {
            when {
                 branch 'testing'
            }
            steps {
                withAWS(region:'eu-west-1', credentials:'aws-cred') {
                    script {
                        def gitsha = sh(script: 'git log -n1 --format=format:"%H"', returnStdout: true)
                        s3FileName = "${s3FileName}-${gitsha}"
                        echo s3FileName
                        echo testingAppName
                        sh """
                            aws deploy push \
                            --application-name ${testingAppName} \
                            --description "This is a revision for the ${testingAppName}-${gitsha}" \
                            --ignore-hidden-files \
                            --s3-location s3://${s3Bucket}/${s3FileName}.zip \
                            --source .
                        """
                    }
                }
            }
        }

        stage('Prepare to Deploy Staging') {
            when {
                branch 'staging'
            }
            steps {
                withAWS(region:'eu-west-1', credentials:'aws-cred') {
                    script {
                        def gitsha = sh(script: 'git log -n1 --format=format:"%H"', returnStdout: true)
                        s3FileName = "${s3FileName}-${gitsha}"
                        echo s3FileName
                        echo stagingAppName
                        sh """
                            aws deploy push \
                            --application-name ${stagingAppName} \
                            --description "This is a revision for the ${stagingAppName}-${gitsha}" \
                            --ignore-hidden-files \
                            --s3-location s3://${s3Bucket}/${s3FileName}.zip \
                            --source .
                        """
                    }
                }
            }
        }

        stage('Prepare to Deploy Production') {
            when {
                branch 'production'
            }
            steps {
                withAWS(region:'eu-west-1', credentials:'aws-cred') {
                    script {
                        def gitsha = sh(script: 'git log -n1 --format=format:"%H"', returnStdout: true)
                        s3FileName = "${s3FileName}-${gitsha}"
                        echo s3FileName
                        echo productionAppName
                        sh """
                            aws deploy push \
                            --application-name ${productionAppName} \
                            --description "This is a revision for the ${productionAppName}-${gitsha}" \
                            --ignore-hidden-files \
                            --s3-location s3://${s3Bucket}/${s3FileName}.zip \
                            --source .
                        """
                    }
                }
            }
        }

        stage('Deploy to Testing') {
            when {
                branch 'testing'
            }
            steps {

                withAWS(region:'eu-west-1', credentials:'aws-cred') {
                    script {
                        sh """
                            aws deploy create-deployment \
                            --application-name ${testingAppName} \
                            --deployment-config-name CodeDeployDefault.OneAtATime \
                            --deployment-group-name ${deployGroup} \
                            --file-exists-behavior OVERWRITE \
                            --s3-location bucket=${s3Bucket},key=${s3FileName}.zip,bundleType=zip
                        """
                    }
                }
            }
        }

        stage('Smoke Test') {
            when {
                branch 'staging'
            }
            steps {
                withCredentials([string(credentialsId: 'SMOKE_GRAPHQL_ENDPOINT', variable: 'SMOKE_GRAPHQL_ENDPOINT')]) {
                    sh 'apt-get update'
                    sh 'apt-get install jq -y'
                    sh 'chmod +x ./scripts/smoke.sh'
                    sh './scripts/smoke.sh'
                }
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'staging'
            }
            steps {
                withAWS(region:'eu-west-1', credentials:'aws-cred') {
                    script {
                        sh """
                            aws deploy create-deployment \
                            --application-name ${stagingAppName} \
                            --deployment-config-name CodeDeployDefault.OneAtATime \
                            --deployment-group-name ${deployGroup} \
                            --file-exists-behavior OVERWRITE \
                            --s3-location bucket=${s3Bucket},key=${s3FileName}.zip,bundleType=zip
                        """
                    }
                }
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'production'
            }
            steps {
                withAWS(region:'eu-west-1', credentials:'aws-cred') {
                    script {
                        sh """
                            aws deploy create-deployment \
                            --application-name ${productionAppName} \
                            --deployment-config-name CodeDeployDefault.OneAtATime \
                            --deployment-group-name ${deployGroup} \
                            --file-exists-behavior OVERWRITE \
                            --s3-location bucket=${s3Bucket},key=${s3FileName}.zip,bundleType=zip
                        """
                    }
                }
            }
        }

        stage('Clean WS') {
            steps {
                cleanWs()
            }
        }
    }

    post {
        always {
            echo 'One way or another, I have finished'
            cleanWs()
        }
       success {
            withAWS(region:'eu-west-1', credentials:'aws-cred') {
                // sh 'aws ses send-email --from cloudamalitech@amalitech.org --to caleb.ackom@amalitech.com francis.owusu@amalitech.com --subject "Deployment Status" --text "ARMS Resource Management Service Deployment Passed"'
                echo 'Deployment successful'
            }
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            withAWS(region:'eu-west-1', credentials:'aws-cred') {
                // sh 'aws ses send-email --from cloudamalitech@amalitech.org --to caleb.ackom@amalitech.com francis.owusu@amalitech.com --subject "Deployment Status" --text "ARMS Resource Management Service Deployment Failed"'
                echo 'Deployment failed'
            }
        }
        changed {
            echo 'Things were different before ...'
        }
    }
}

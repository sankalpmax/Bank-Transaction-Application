pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Name of Node.js installation in Global Tool Configuration
    }
    stages {
        stage('Build') {
            steps {
                git url: 'https://github.com/sankalpmax/Bank-Transaction-Application.git', branch: 'main'
                sh 'npm install' // Install dependencies
            }
        }
        stage('Test') {
            steps {
                sh 'npm test' // Run automation tests
            }
        }
    }
}

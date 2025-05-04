pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/sankalpmax/Bank-Transaction-Application.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('bank-transaction-app:latest')
                }
            }
        }
    }
}

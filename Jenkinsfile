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
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        def appImage = docker.image('bank-transaction-app:latest')
                        appImage.push()
                    }
                }
            }
        }
    }
}

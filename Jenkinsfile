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
                    docker.build('sankalparava/bank-transaction-app:latest')
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        docker.image('sankalparava/bank-transaction-app:latest').push()
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Stop and remove any existing container with the same name
                    sh 'docker stop bank-transaction-app || true'
                    sh 'docker rm bank-transaction-app || true'
                    // Run the container from Docker Hub
                    sh 'docker run -d -p 4000:4000 --name bank-transaction-app sankalparava/bank-transaction-app:latest'
                }
            }
        }
    }
}

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
                    sh 'docker stop bank-transaction-app || true'
                    sh 'docker rm bank-transaction-app || true'
                    sh 'docker run -d -p 4000:4000 --name bank-transaction-app sankalparava/bank-transaction-app:latest'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    // SSH into the EC2 instance and deploy the container
                    sshagent(credentials: ['ec2-ssh-key']) {
                        sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@3.84.121.155 << 'EOF'
                       
                        # Stop and remove any existing container

                        docker stop bank-transaction-app || true
                        docker rm bank-transaction-app || true
                       
                        # Pull the latest image from Docker Hub
                       
                        docker pull sankalparava/bank-transaction-app:latest
                       
                        # Run the container
                       
                        docker run -d -p 4000:4000 --name bank-transaction-app sankalparava/bank-transaction-app:latest
                        EOF
                        '''
                    }
                }
            }
        }
    }
}

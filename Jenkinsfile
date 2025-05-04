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
                    docker.build('sankalparava/bank-transaction-app:07')
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        docker.image('sankalparava/bank-transaction-app:07').push()
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker stop bank-transaction-app || true'
                    sh 'docker rm bank-transaction-app || true'
                    sh 'docker run -d -p 4000:4000 --name bank-transaction-app sankalparava/bank-transaction-app:07'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    // Use the SSH key stored in Jenkins credentials (ID: 'ec2-ssh-key') to authenticate
                    // This step makes the SSH key available for the 'ssh' command below
                    sshagent(credentials: ['ec2-ssh-key']) {
                        // Connect to the EC2 instance as ec2-user
                        // Replace <ec2-public-ip> with your EC2 instance's public IP (e.g., 52.90.123.456)
                        // The commands between << 'EOF' and EOF are executed on the EC2 instance
                        // Stops any existing container (if it exists)
                        // Removes the stopped container (if it exists)
                        // Pulls the Docker image from Docker Hub
                        // Runs the container on the EC2 instance, mapping port 4000
                        sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@3.84.121.155 << 'EOF'
                        docker stop bank-transaction-app || true
                        docker rm bank-transaction-app || true
                        docker pull sankalparava/bank-transaction-app:07
                        docker run -d -p 4000:4000 --name bank-transaction-app sankalparava/bank-transaction-app:07
                        EOF
                        '''
                    }
                }
            }
        }
    }
}

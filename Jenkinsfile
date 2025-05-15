pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/sankalpmax/Bank-Transaction-Application.git'
            		}
        	}
 
	stage('Docker Build Image') {
		steps {
			sh 'docker build -t sankalparava/hdfc-bank-orchestrate:01 .'
				}
			}

	stage('Docker Run Container'){
		steps {
			sh 'docker run -d -p 3000:3000 --name hdfc sankalparava/hdfc-bank-orchestrate:01'
				}
			}

	stage('Docker Push'){
		steps {
			script {
			docker.withRegistry('https://index.docker.io/v1/', 'dockerhub'){
				sh 'docker push sankalparava/hdfc-bank-orchestrate:01' 
					}
				}
	stage('Kubernetes Deploy') {
		steps{
			sh 'kubectl create deployment hdfc-bank-deployment --image=sankalparava/hdfc-bank-orchestrate:01'

					}
				}
			}		
		}
	}
}


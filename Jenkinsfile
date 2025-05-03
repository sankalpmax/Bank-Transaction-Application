pipeline {
    agent any
    tools {
        nodejs 'NodeJS'            // Set this in Global Tools
        sonarQubeScanner 'SonarScanner'  // Set this in Global Tools
    }

    environment {
        SONARQUBE = 'SonarQube'    // Name of SonarQube server in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/sankalpmax/Bank-Transaction-Application.git', branch: 'main'
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${env.SONARQUBE}") {
                    sh 'sonar-scanner'
                }
            }
        }
    }
}


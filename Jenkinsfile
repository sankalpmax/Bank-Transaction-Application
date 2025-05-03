pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        SONARQUBE = 'SonarQube'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/sankalpmax/Bank-Transaction-Application.git' , git branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        // Optional: Only include if absolutely needed for test coverage
        /*
        stage('Start Application') {
            steps {
                sh 'npm start &'
                // Add timeout if needed
            }
        }
        */

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE}") {
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
    }
}


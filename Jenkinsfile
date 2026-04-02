pipeline {
    agent { label 'vinod' }

    stages {
        stage('Build') {
            steps {
                echo "Running on vinod agent"
            }
        }

        stage('Test') {
            steps {
                sh 'echo Testing...'
            }
        }

        stage('Deploy') {
            steps {
                sh 'echo Deploying...'
            }
        }
    }
}

pipeline {
    agent { label 'build-agent' }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerHubcred')
        DOCKERHUB_USERNAME = 'kalyan0996'
    }

    stages {

        stage('Code') {
            steps {
                echo "Running on build-agent"
                git branch: 'main', url: 'https://github.com/kalyan0996/todo-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t todo:latest .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh '''
                echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin
                docker tag todo:latest $DOCKERHUB_USERNAME/todo:latest
                docker push $DOCKERHUB_USERNAME/todo:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker rm -f todo-container || true
                docker run -d -p 8081:80 --name todo-container $DOCKERHUB_USERNAME/todo:latest
                '''
            }
        }
    }
}

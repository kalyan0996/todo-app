pipeline {
    agent { label 'vinod' }

    environment {
        dockerhubuser = 'your-dockerhub-username'
        dockerhubpass = 'your-dockerhub-password'
    }

    stages {
        stage('Code') {
            steps {
                echo "Running on vinod agent"
                git branch: 'main', url: 'https://github.com/kalyan0996/todo-app.git'
                echo "Code cloning successful"
            }
        }

        stage('Build') {
            steps {
                echo "Building the code..."
                sh 'whoami'
                sh 'docker build -t todo:latest .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo "Pushing image to DockerHub"

                sh '''
                echo "$dockerhubpass" | docker login -u "$dockerhubuser" --password-stdin
                docker tag todo:latest $dockerhubuser/todo:latest
                docker push $dockerhubuser/todo:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying container"
                sh 'docker run -d -p 8081:80 $dockerhubuser/todo:latest'
            }
        }
    }
}

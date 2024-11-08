pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'simple-microservice'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/ishikaa-01/DevopsMain'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
    }
}

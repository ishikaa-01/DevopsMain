pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'simple-microservice'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Correct syntax for git step
                git credentialsId: 'ishika', url: 'https://github.com/ishikaa-01/DevopsMain.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image from the Dockerfile in the repository
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Deploy Blue-Green') {
            steps {
                script {
                    // Example blue-green deployment switch
                    def currentEnv = sh(script: 'docker ps --filter "name=blue" -q', returnStdout: true).trim()

                    if (currentEnv) {
                        // Stop Blue Environment and deploy Green
                        sh 'docker stop blue && docker rm blue'
                        sh "docker run -d --name green -p 3000:3000 ${DOCKER_IMAGE}"
                    } else {
                        // Stop Green Environment and deploy Blue
                        sh 'docker stop green && docker rm green'
                        sh "docker run -d --name blue -p 3000:3000 ${DOCKER_IMAGE}"
                    }
                }
            }
        }
    }
}

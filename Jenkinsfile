pipeline {
    agent any
    
    environment {
        BLUE_CONTAINER_NAME = 'blue-microservice'
        GREEN_CONTAINER_NAME = 'green-microservice'
        IMAGE_NAME = 'my-microservice'
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'ishika', url: 'https://github.com/ishikaa-01/DevopsMain.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    if (isUnix()) {
                        sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .'
                    } else {
                        bat "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
                    }
                }
            }
        }

        stage('Deploy Blue Environment') {
            steps {
                script {
                    // Deploy Blue environment
                    if (isUnix()) {
                        sh '''
                        docker stop ${BLUE_CONTAINER_NAME} || true
                        docker rm ${BLUE_CONTAINER_NAME} || true
                        docker run -d --name ${BLUE_CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}:${BUILD_NUMBER}
                        '''
                    } else {
                        bat """
                        docker stop ${BLUE_CONTAINER_NAME} || true
                        docker rm ${BLUE_CONTAINER_NAME} || true
                        docker run -d --name ${BLUE_CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}:${BUILD_NUMBER}
                        """
                    }
                }
            }
        }

        stage('Deploy Green Environment') {
            steps {
                script {
                    // Deploy Green environment
                    if (isUnix()) {
                        sh '''
                        docker stop ${GREEN_CONTAINER_NAME} || true
                        docker rm ${GREEN_CONTAINER_NAME} || true
                        docker run -d --name ${GREEN_CONTAINER_NAME} -p 3001:3000 ${IMAGE_NAME}:${BUILD_NUMBER}
                        '''
                    } else {
                        bat """
                        docker stop ${GREEN_CONTAINER_NAME} || true
                        docker rm ${GREEN_CONTAINER_NAME} || true
                        docker run -d --name ${GREEN_CONTAINER_NAME} -p 3001:3000 ${IMAGE_NAME}:${BUILD_NUMBER}
                        """
                    }
                }
            }
        }

        stage('Switch Traffic') {
            steps {
                script {
                    // Switch traffic from Blue to Green (or vice versa)
                    echo 'Switch traffic to Green Environment'
                    // Here you would implement traffic switching logic using a load balancer or DNS update.
                    // You could configure a reverse proxy or load balancer to point to the Green environment
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}

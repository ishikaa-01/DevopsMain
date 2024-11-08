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
                    sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .'
                }
            }
        }

        stage('Deploy Blue Environment') {
            steps {
                script {
                    // Deploy Blue environment
                    sh '''
                    docker stop ${BLUE_CONTAINER_NAME} || true
                    docker rm ${BLUE_CONTAINER_NAME} || true
                    docker run -d --name ${BLUE_CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Deploy Green Environment') {
            steps {
                script {
                    // Deploy Green environment
                    sh '''
                    docker stop ${GREEN_CONTAINER_NAME} || true
                    docker rm ${GREEN_CONTAINER_NAME} || true
                    docker run -d --name ${GREEN_CONTAINER_NAME} -p 3001:3000 ${IMAGE_NAME}:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Switch Traffic') {
            steps {
                script {
                    // Switch traffic from Blue to Green (or vice versa)
                    echo 'Switch traffic to Green Environment'
                    // Here you would implement traffic switching logic using a load balancer
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

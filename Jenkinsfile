pipeline {
    agent any

    environment {
        DOCKER_HUB = credentials('docker-hub-credentials')
        DOCKER_IMAGE = 'tu_usuario_docker/tu_imagen:latest'
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image(DOCKER_IMAGE).push()
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    sshagent(['tu_credencial_ssh']) {
                        sh "ssh -o StrictHostKeyChecking=no usuario@tu_maquina_virtual_azure 'docker-compose -f ${DOCKER_COMPOSE_FILE} down && docker-compose -f ${DOCKER_COMPOSE_FILE} up -d'"
                    }
                }
            }
        }
    }
}


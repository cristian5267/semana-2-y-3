pipeline {
    agent any
    
    // 1. Especifica la herramienta Git (esto soluciona tu error)
    tools {
        git 'Default Git'  // Nombre debe coincidir con tu configuración en Jenkins
    }
    
    environment {
        // Configura Docker Hub
        DOCKER_IMAGE = '24cristiano/semana-2-y-3'
        DOCKER_TAG = "${BUILD_NUMBER}"
        
        // Configura VM Azure
        VM_IP = '20.3.132.206'
        VM_USER = 'kriss'
        APP_DIR = '/home/kriss/app'
    }
    
    stages {
        /* Etapa 1: Clonar repositorio (ahora usará la herramienta configurada) */
        stage('Checkout Code') {
            steps {
                git branch: 'master', 
                url: 'https://github.com/cristian5267/semana-2-y-3.git'
            }
        }

        /* Etapa 2: Construir imagen Docker */
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        /* Etapa 3: Subir a Docker Hub */
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                    }
                }
            }
        }

        /* Etapa 4: Desplegar en Azure */
        stage('Deploy to Azure VM') {
            steps {
                sshagent(['azure-vm-ssh']) {
                    sh "scp -o StrictHostKeyChecking=no docker-compose.yml ${VM_USER}@${VM_IP}:${APP_DIR}/"
                    sh """
                        ssh -o StrictHostKeyChecking=no ${VM_USER}@${VM_IP} '
                            cd ${APP_DIR} && 
                            docker-compose down && 
                            docker-compose pull && 
                            docker-compose up -d
                        '
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ ¡Despliegue exitoso!'
        }
        failure {
            echo '❌ Error en el despliegue'
        }
    }
}


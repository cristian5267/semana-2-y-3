pipeline {
    agent any
    tools {
        git 'Git predeterminado'  // Debe coincidir con el nombre que configuraste
    }
    // Resto de tu pipeline...
    environment {
        // Configuración Docker Hub
        DOCKER_IMAGE = '24cristiano/semana-2-y-3'
        DOCKER_TAG = "${BUILD_NUMBER}"
        
        // Configuración VM Azure
        VM_IP = '20.3.132.206'
        VM_USER = 'kriss'
        APP_DIR = '/home/kriss/app'
    }
    
    stages {
        // 1. Clonar repositorio
        stage('Checkout Code') {
            steps {
                git branch: 'master', 
                url: 'https://github.com/cristian5267/semana-2-y-3.git'
            }
        }
        
        // 2. Construir imagen Docker
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }
        
        // 3. Subir imagen a Docker Hub
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                        // También pushear como 'latest' si lo deseas
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push('latest')
                    }
                }
            }
        }
        
        // 4. Desplegar en Azure VM
        stage('Deploy to Azure VM') {
            steps {
                sshagent(['azure-vm-ssh']) {
                    // Copiar archivos necesarios
                    sh "scp -o StrictHostKeyChecking=no docker-compose.yml ${VM_USER}@${VM_IP}:${APP_DIR}/"
                    
                    // Ejecutar comandos remotos
                    sh """
                        ssh -o StrictHostKeyChecking=no ${VM_USER}@${VM_IP} '
                            cd ${APP_DIR} && 
                            echo "Deteniendo contenedores existentes..." &&
                            docker-compose down && 
                            echo "Descargando nueva imagen..." &&
                            docker-compose pull && 
                            echo "Iniciando contenedores..." &&
                            docker-compose up -d --force-recreate &&
                            echo "¡Despliegue completado con éxito!" 
                        '
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline ejecutado correctamente!'
            // Aquí puedes agregar notificaciones (Slack, Email, etc.)
        }
        failure {
            echo '❌ Error en el pipeline!'
            // Notificaciones de fallo
        }
        always {
            echo '🚀 Limpieza de recursos temporales'
            sh 'docker system prune -f'
        }
    }
}
        }
    }
}


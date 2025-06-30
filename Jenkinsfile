pipeline {
    agent any
    
    tools {
        git 'Git'  // Correcto si está configurado en Jenkins
        // dockerTool 'docker'  // Eliminado (no necesario si Docker ya está instalado en el nodo)
    }
    
    environment {
        // Configuración Docker Hub (corregido nombre de usuario)
        DOCKER_IMAGE = '24cristian/semana-2-y-3'  // Corregido de '24cristiano' a '24cristian'
        DOCKER_TAG = "${BUILD_NUMBER}"
        
        // Configuración Azure VM
        VM_IP = '20.3.132.206'
        VM_USER = 'kriss'
        APP_DIR = '/home/kriss/app'
    }
    
    stages {
        /* Etapa 1: Clonar repositorio */
        stage('Checkout Code') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: 'master']],
                    userRemoteConfigs: [[url: 'https://github.com/cristian5267/semana-2-y-3.git']],
                    extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'src']]  // Clona en subdirectorio
                ])
            }
        }

        /* Etapa 2: Construir imagen Docker */
        stage('Build Docker Image') {
            steps {
                script {
                    // Asegúrate de que el Dockerfile esté en el repositorio
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}", "src")  // Construye desde el directorio src
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

        /* Etapa 4: Desplegar en Azure VM - MEJORADA */
        stage('Deploy to Azure VM') {
            steps {
                sshagent(['azure-vm-ssh']) {
                    // 1. Crear directorio si no existe
                    sh """
                        ssh -o StrictHostKeyChecking=no ${VM_USER}@${VM_IP} "
                            mkdir -p ${APP_DIR} || exit 1
                        "
                    """
                    
                    // 2. Copiar docker-compose.yml con verificación
                    sh """
                        if [ -f "src/docker-compose.yml" ]; then
                            scp -o StrictHostKeyChecking=no src/docker-compose.yml ${VM_USER}@${VM_IP}:${APP_DIR}/ || exit 1
                        else
                            echo "ERROR: docker-compose.yml no encontrado en el repositorio"
                            exit 1
                        fi
                    """
                    
                    // 3. Ejecutar con manejo de errores
                    sh """
                        ssh -o StrictHostKeyChecking=no ${VM_USER}@${VM_IP} "
                            cd ${APP_DIR} || exit 1
                            echo 'Contenido de docker-compose.yml:'
                            cat docker-compose.yml || exit 1
                            docker-compose down || true
                            docker-compose pull || exit 1
                            docker-compose up -d || exit 1
                            echo 'Contenedores en ejecución:'
                            docker ps
                        "
                    """
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo '✅ ¡Despliegue exitoso!'
            // Opcional: Notificación por Slack/Email
        }
        failure {
            echo '❌ Error en el despliegue'
            // Opcional: Notificación por Slack/Email
        }
    }
}

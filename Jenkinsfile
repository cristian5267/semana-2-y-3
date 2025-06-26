pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // Comando para construir tu aplicación
                sh 'echo "Building the application"'
                // sh 'npm install' // Ejemplo para una aplicación Node.js
                // sh 'npm run build' // Ejemplo para una aplicación Node.js
            }
        }

        stage('Test') {
            steps {
                // Comando para ejecutar pruebas
                sh 'echo "Running tests"'
                // sh 'npm test' // Ejemplo para una aplicación Node.js
            }
        }

        stage('Deploy') {
            steps {
                // Comando para desplegar tu aplicación
                sh 'echo "Deploying the application"'
                // sh './deploy.sh' // Ejemplo de un script de despliegue
            }
        }
    }

    post {
        always {
            // Limpieza o notificaciones
            echo 'Pipeline completed.'
        }
    }
}

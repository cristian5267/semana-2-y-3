pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/cristian5267/semana-2-y-3.git'
            }
        }
        stage('Build') {
            steps {
                sh 'echo "Construyendo la aplicación..."'
                // Ejemplo para Node.js: sh 'npm install && npm run build'
            }
        }
    }
}

pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        bat 'npm install'
      }
    }
    stage('Lint') {
      steps {
        bat 'npm run lint'
      }
    }
    stage('Build') {
      steps {
        bat 'npm run build'
      }
    }
    stage('Test') {
      steps {
        bat 'npm run test -- --coverage'
      }
      post {
        always {
          echo 'Tests finished'
          // Puedes agregar reportes JUnit o cobertura aquí
        }
      }
    }
    stage('Deploy') {
      steps {
        bat './deploy.bat'
      }
    }
  }
  post {
    success {
      echo 'Pipeline succeeded!'
    }
    failure {
      echo 'Pipeline failed!'
    }
  }
}

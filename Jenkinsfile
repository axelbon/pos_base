pipeline {
  agent any

  environment {
    NODE_ENV = 'development'
  }

  stages {
    stage('Install') {
      steps {
        echo 'Installing dependencies...'
        bat 'npm install'
      }
    }

    stage('Lint') {
      steps {
        echo 'Running ESLint...'
        bat 'npm run lint'
      }
    }

    stage('Build') {
      steps {
        echo 'Building the project...'
        bat 'npm run build'
      }
    }

    stage('Test') {
      steps {
        echo 'Running tests...'
        bat 'npm run test:cov'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying...'
        bat 'deploy.bat' // solo el nombre, sin "./"
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
    }
    success {
      echo 'Pipeline completed successfully!'
    }
    failure {
      echo 'Pipeline failed.'
    }
  }
}

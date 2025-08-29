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
        echo 'Deploying...'
        bat """
        REM Instalar PM2 si no está instalado
        npm install -g pm2
    
        REM Ir a la carpeta del proyecto
        cd %WORKSPACE%
    
        REM Instalar solo dependencias de producción
        npm install --production
    
        REM Correr migraciones (opcional si usas TypeORM)
        npm run migration:run
    
        REM Iniciar o reiniciar la app con PM2
        pm2 start dist/main.js --name pos_base --update-env || pm2 restart pos_base
        """
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

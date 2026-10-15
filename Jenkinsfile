pipeline {
    agent any
    triggers { githubPush() }
    options { timeout(time: 20, unit: 'MINUTES') }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install') {
            steps { sh 'node -v && npm -v && npm ci' }
        }
        stage('Build') {
    steps {
        withCredentials([file(credentialsId: 'monostery-env', variable: 'ENV_FILE')]) {
            sh 'install -m 600 "$ENV_FILE" .env.production'
            sh 'npm run build'
        }
    }
}
        stage('Deploy') {
            steps {
                sh '''
                    rsync -a --delete --exclude .git ./ /opt/monostery/
                    sudo systemctl restart monostery
                '''
            }
        }
    }
}
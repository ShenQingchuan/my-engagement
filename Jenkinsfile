// Jenkinsfile (Declarative Pipeline)

pipeline {
    agent any

    environment {
        APP_NAME = 'my_engagement'
        DOCKER_IMAGE_NAME = "shenqingchuan/${APP_NAME}"
        DOCKER_CONTAINER_NAME = "shenqingchuan_${APP_NAME}"
        // VPS 主机端口 : 容器内 nginx 端口 80
        APP_PORT_MAPPING = '5201:80'
        DOCKER_BUILDKIT = '1'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        credentialsId: 'shenqingchuan-github-ssh-private-key',
                        url: 'git@github.com:ShenQingchuan/my-engagement.git'
                    ]]
                ])
            }
        }

        stage('Prepare Buildx') {
            steps {
                script {
                    sh '''
                        #!/bin/bash
                        set -e

                        BUILDX_VERSION='v0.23.0'
                        BUILDX_DIR='/usr/local/lib/docker/cli-plugins'

                        if test -f "${BUILDX_DIR}/docker-buildx" && docker buildx version > /dev/null 2>&1; then
                            echo "docker-buildx already installed."
                        else
                            echo "Installing docker-buildx..."
                            if command -v apt-get >/dev/null; then
                                apt-get update || true
                                apt-get install -y --no-install-recommends curl || true
                            elif command -v apk >/dev/null; then
                                apk update || true
                                apk add --no-cache curl || true
                            fi

                            ARCH=$(uname -m)
                            case "$ARCH" in
                                x86_64) ARCH="amd64" ;;
                                aarch64) ARCH="arm64" ;;
                                *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
                            esac

                            mkdir -p "${BUILDX_DIR}"
                            curl -sSL "https://github.com/docker/buildx/releases/download/${BUILDX_VERSION}/buildx-${BUILDX_VERSION}.linux-${ARCH}" \
                                -o "${BUILDX_DIR}/docker-buildx"
                            chmod +x "${BUILDX_DIR}/docker-buildx"
                            docker buildx version
                        fi
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image: ${env.DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}"
                    docker.build("${env.DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}", '.')
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    echo "Deploying container: ${env.DOCKER_CONTAINER_NAME}"

                    // 按名字清理（正常情况）
                    sh "docker ps -q -f name=${env.DOCKER_CONTAINER_NAME} | xargs -r docker stop || true"
                    sh "docker ps -aq -f name=${env.DOCKER_CONTAINER_NAME} | xargs -r docker rm || true"

                    // 兜底：强制释放端口，防止同端口的其他容器残留
                    sh """
                        HOST_PORT=\$(echo '${env.APP_PORT_MAPPING}' | cut -d: -f1)
                        docker ps --format '{{.ID}} {{.Ports}}' \
                            | grep "0\\.0\\.0\\.0:\${HOST_PORT}->" \
                            | awk '{print \$1}' \
                            | xargs -r docker stop || true
                        docker ps -a --format '{{.ID}} {{.Ports}}' \
                            | grep "0\\.0\\.0\\.0:\${HOST_PORT}->" \
                            | awk '{print \$1}' \
                            | xargs -r docker rm || true
                    """

                    sh """
                        docker run -d \
                        --name ${env.DOCKER_CONTAINER_NAME} \
                        -p ${env.APP_PORT_MAPPING} \
                        --restart=unless-stopped \
                        ${env.DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}
                    """

                    def currentBuildNumber = env.BUILD_NUMBER.toInteger()
                    if (currentBuildNumber > 1) {
                        def previousImageTag = "${env.DOCKER_IMAGE_NAME}:${currentBuildNumber - 1}"
                        echo "Removing previous image: ${previousImageTag}"
                        sh "docker rmi ${previousImageTag} || true"
                    }
                }
            }
        }

        stage('Post-Build Actions') {
            steps {
                echo 'Build and deployment finished.'
                cleanWs()
            }
        }
    }

    post {
        always { echo 'Pipeline finished.' }
        success { echo 'Pipeline succeeded!' }
        failure { echo 'Pipeline failed!' }
    }
}

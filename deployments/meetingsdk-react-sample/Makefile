HELM_BINARY?=helm
KUBECONFIG?=~/.kube/config

UNIT_NAME?=meetingsdk-react-sample

ENVIRONMENT?=dev-us-east-1
CANARY_VALUES_FILE=./environments/${ENVIRONMENT}/canary-values-common.yaml
COMMON_VALUES_FILE=./environments/${ENVIRONMENT}/values-common.yaml
VALUES_FILE?=values.yaml

IMAGE_TAG?=latest

deployedFrom?=local
deployTime?=null
deployServer?=null
deployJobName?=null
deployJobNumber?=null

TEMPLATE_OUTPUT=./templated-${UNIT_NAME}-helm.yaml

template:
	${HELM_BINARY} template ${UNIT_NAME} \
	--values ${COMMON_VALUES_FILE} \
	--values ${VALUES_FILE} \
	--set deploymentLabels.deployedFrom=${deployedFrom} \
	--set deploymentLabels.deployTime=${deployTime} \
	--set deploymentLabels.deployServer=${deployServer} \
	--set deploymentLabels.deployJobName=${deployJobName} \
	--set deploymentLabels.deployJobNumber=${deployJobNumber} \
	./

apply:
	${HELM_BINARY} template ${UNIT_NAME} \
	--values ${COMMON_VALUES_FILE} \
	--values ${VALUES_FILE} \
	--set deploymentLabels.deployedFrom=${deployedFrom} \
	--set deploymentLabels.deployTime=${deployTime} \
	--set deploymentLabels.deployServer=${deployServer} \
	--set deploymentLabels.deployJobName=${deployJobName} \
	--set deploymentLabels.deployJobNumber=${deployJobNumber} \
	./ > ${TEMPLATE_OUTPUT}
	kubectl apply -f ${TEMPLATE_OUTPUT} -n app

delete:
	${HELM_BINARY} template ${UNIT_NAME} \
	--values ${COMMON_VALUES_FILE} \
	--values ${VALUES_FILE} \
	--set deploymentLabels.deployedFrom=${deployedFrom} \
	--set deploymentLabels.deployTime=${deployTime} \
	--set deploymentLabels.deployServer=${deployServer} \
	--set deploymentLabels.deployJobName=${deployJobName} \
	--set deploymentLabels.deployJobNumber=${deployJobNumber} \
	./ > ${TEMPLATE_OUTPUT}
	kubectl delete -f ${TEMPLATE_OUTPUT} -n app

install:
	 ${HELM_BINARY} install meetingsdk-react-sample ../meetingsdk-react-sample -n app \
	 --values ${COMMON_VALUES_FILE}

uninstall:
	 ${HELM_BINARY} uninstall meetingsdk-react-sample -n app

upgrade:
	 ${HELM_BINARY} upgrade --install meetingsdk-react-sample ../meetingsdk-react-sample -n app \
	 --values ${COMMON_VALUES_FILE} \
	 --set image.tag=${IMAGE_TAG}

upgrade-canary:
	 ${HELM_BINARY} upgrade --install meetingsdk-react-sample-canary ../meetingsdk-react-sample -n app \
	 --values ${CANARY_VALUES_FILE} \
	 --set image.tag=${IMAGE_TAG}

install-demo:
	 ${HELM_BINARY} install meetingsdk-react-sample-demo ../meetingsdk-react-sample -n app \
	 --values ${COMMON_VALUES_FILE} \
	 --set host=-demo.intrivo.com \
	 --set image.tag=${IMAGE_TAG}

uninstall-demo:
	 ${HELM_BINARY} uninstall meetingsdk-react-sample-demo -n app

upgrade-demo:
	 ${HELM_BINARY} upgrade --install meetingsdk-react-sample-demo ../meetingsdk-react-sample -n app \
	 --values ${COMMON_VALUES_FILE} \
	 --set host=-demo.intrivo.com \
	 --set image.tag=${IMAGE_TAG}


install-staging:
	 ${HELM_BINARY} install meetingsdk-react-sample-staging ../meetingsdk-react-sample -n app \
	 --values ${COMMON_VALUES_FILE} \
	 --set host=-staging.intrivo.com \
	 --set 'ingress.hosts[0].host=-staging.intrivo.com' \
	 --set image.tag=${IMAGE_TAG}


template-staging:
	 ${HELM_BINARY} template meetingsdk-react-sample-staging ../meetingsdk-react-sample -n app \
	 --values ${COMMON_VALUES_FILE} \
	 --set host=-staging.intrivo.com \
	 --set 'ingress.hosts[0].host=-staging.intrivo.com' \
	 --set image.tag=${IMAGE_TAG}


uninstall-staging:
	 ${HELM_BINARY} uninstall meetingsdk-react-sample-staging -n app

upgrade-staging:
	 ${HELM_BINARY} upgrade --install meetingsdk-react-sample-staging ../meetingsdk-react-sample -n app \
	 --values ${COMMON_VALUES_FILE} \
	 --set host=-staging.intrivo.com \
	 --set 'ingress.hosts[0].host=-staging.intrivo.com' \
	 --set image.tag=${IMAGE_TAG}

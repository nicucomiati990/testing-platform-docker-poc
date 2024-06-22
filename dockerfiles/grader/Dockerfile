FROM node:20-alpine 

RUN apk add curl

RUN mkdir -p /grader

COPY ./runner.sh /grader

WORKDIR /grader

RUN chmod +x /grader/runner.sh

ENTRYPOINT [ "/grader/runner.sh" ]

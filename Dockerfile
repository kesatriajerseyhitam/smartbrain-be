FROM node:10.15.3

WORKDIR /usr/src/smartbrain-back-end

COPY ././

RUN npm install

CMD ["/bin/bash"]
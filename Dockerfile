FROM node:20-slim

WORKDIR /home/node/app

# Install sudo
RUN apt-get update && apt-get install -y sudo

# Allow node user to execute sudo commands without a password
RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node

# Add node user to sudo group
RUN usermod -aG sudo node

USER node

# Now sudo commands can be run without a password prompt
RUN sudo apt-get update -y && sudo apt-get install -y openssl

CMD ["tail", "-f", "/dev/null"]
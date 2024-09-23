FROM python:3.10.15-alpine

COPY requirements.txt /home/app/

RUN apk --no-cache -q add gcc build-base linux-headers \
    && pip -q install -r /home/app/requirements.txt \
    && rm /home/app/requirements.txt \
    && rm -rf /root/.cache/pip \
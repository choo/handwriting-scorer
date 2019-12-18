FROM python:3.7-buster

ADD ./backend /app
WORKDIR /app

RUN pip3 install -r requirements.txt

EXPOSE 80
#ENTRYPOINT ["python", "app.py", "--port", "80"]
CMD ["python", "app.py"]

---
name: docker run · ps · logs · exec
cat: Docker
kind: 명령어
order: 10
aliases:
  - 도커
  - 컨테이너 실행
  - 컨테이너 로그
  - 컨테이너 접속
  - docker build
  - 이미지 빌드
summary: 이미지를 빌드하고 컨테이너로 실행, 확인, 접속, 정리하는 Docker 기본 명령입니다. 앱과 실행 환경(Java 버전 등)을 묶어서 어느 서버에서나 같은 방식으로 실행합니다.
signature: 'docker run -d --name myapp -p 127.0.0.1:8080:8080 myapp:1.0'
related:
  - dockerfile
  - docker-compose
  - ufw
doc: 'https://docs.docker.com/reference/cli/docker/container/run/'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| -d | `옵션` | 백그라운드로 실행 |
| --name | `옵션` | 컨테이너 이름 |
| -p 호스트:컨테이너 | `옵션` | 포트 연결 (예: `127.0.0.1:8080:8080`) |
| -e · --env-file | `옵션` | 환경 변수 전달 |
| -v 호스트경로:컨테이너경로 | `옵션` | 파일 · 데이터를 컨테이너 밖에 보존 |
| --restart unless-stopped | `옵션` | 죽거나 재부팅되면 다시 실행 |

## 사용 예시

```bash
# 이미지 빌드 (현재 폴더의 Dockerfile 사용)
docker build -t myapp:1.0 .

# 컨테이너 실행
docker run -d \
  --name myapp \
  -p 127.0.0.1:8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  --env-file ./app.env \
  -v /opt/app/uploads:/app/uploads \
  --restart unless-stopped \
  myapp:1.0

# 상태 · 로그
docker ps                         # 실행 중인 컨테이너
docker ps -a                      # 멈춘 것까지
docker logs -f --tail 100 myapp   # 마지막 100줄부터 실시간

# 컨테이너 안으로 들어가기
docker exec -it myapp sh

# 중지 · 시작 · 삭제
docker stop myapp
docker start myapp
docker rm -f myapp

# 정리
docker images
docker image prune                # 쓰지 않는 이미지 삭제
```

## 주의할 점

- `-p 8080:8080`처럼 IP 없이 공개하면 ufw 방화벽을 우회해 외부에 열립니다. Nginx 뒤에 둘 때는 `127.0.0.1:8080:8080`으로 바인딩합니다.
- 컨테이너를 삭제하면 안에 저장된 파일도 사라집니다. 업로드 파일이나 DB 데이터는 `-v`로 밖에 보존합니다.
- 비밀번호는 이미지에 넣지 말고 실행할 때 `--env-file`로 전달하고, 그 파일은 Git에 올리지 않습니다.

---
name: docker compose
cat: Docker
kind: 설정
order: 30
aliases:
  - 도커 컴포즈
  - compose.yaml
  - 여러 컨테이너 실행
  - DB와 함께 실행
  - docker compose up
  - .env 파일
summary: 앱, DB 같은 여러 컨테이너의 설정을 `compose.yaml` 파일 하나에 적고 `docker compose up` 한 번으로 함께 실행하는 도구입니다.
signature: 'docker compose up -d'
related:
  - docker-basics
  - dockerfile
  - spring/application-yml
doc: 'https://docs.docker.com/reference/compose-file/'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| services | `키` | 실행할 컨테이너 목록 |
| build · image | `키` | Dockerfile로 빌드 · 사용할 이미지 |
| ports | `키` | 포트 연결 (`"127.0.0.1:8080:8080"`) |
| environment | `키` | 환경 변수. `${변수}`는 `.env`에서 읽음 |
| depends_on | `키` | 먼저 떠야 하는 서비스 (`condition: service_healthy`) |
| volumes | `키` | 데이터 보존 |
| restart | `키` | 재시작 정책 |

## 사용 예시

```yaml
# compose.yaml  (실행: docker compose up -d)
# 비밀번호는 같은 폴더의 .env 파일에 둠 (Git에 올리지 않음)
#   DB_PASSWORD=change-me

services:
  app:
    build: .
    image: myapp:1.0
    ports:
      - "127.0.0.1:8080:8080"     # Nginx만 접근하도록 로컬에만 공개
    environment:
      SPRING_PROFILES_ACTIVE: prod
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/app
      SPRING_DATASOURCE_USERNAME: app
      SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD}
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:17
    environment:
      POSTGRES_DB: app
      POSTGRES_USER: app
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d app"]
      interval: 5s
      retries: 10
    restart: unless-stopped

volumes:
  db-data:

# 자주 쓰는 명령
#   docker compose up -d --build   빌드 후 백그라운드 실행
#   docker compose ps              상태
#   docker compose logs -f app     로그
#   docker compose down            중지 · 삭제 (볼륨은 유지, -v를 붙이면 삭제)
```

## 주의할 점

- `docker-compose`(하이픈)는 지원이 끝난 v1 명령입니다. 지금은 `docker compose`(띄어쓰기)를 쓰고, 파일 맨 위의 `version:` 키도 넣지 않습니다.
- 컨테이너끼리는 `localhost`가 아니라 서비스 이름(`db`)으로 접속합니다.
- `.env` 파일은 `.gitignore`에 추가합니다. `docker compose down -v`는 DB 볼륨까지 지우므로 운영 서버에서는 쓰지 않습니다.

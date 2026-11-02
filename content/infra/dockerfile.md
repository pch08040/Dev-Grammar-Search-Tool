---
name: Dockerfile
cat: Docker
kind: 설정
order: 20
aliases:
  - 도커파일
  - 이미지 만들기
  - 멀티 스테이지 빌드
  - Spring Boot 이미지
  - FROM
  - ENTRYPOINT
summary: Docker 이미지를 만드는 순서를 적은 파일입니다. 어떤 기반 이미지에서 시작해 무엇을 복사하고 빌드하고 어떤 명령으로 실행할지 정합니다.
signature: 'docker build -t myapp:1.0 .'
related:
  - docker-basics
  - docker-compose
  - spring-boot-jar
doc: 'https://docs.docker.com/reference/dockerfile/'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| FROM 이미지 AS 이름 | `명령어` | 기반 이미지. 여러 번 쓰면 멀티 스테이지 |
| WORKDIR | `명령어` | 이후 명령의 작업 폴더 |
| COPY · COPY --from | `명령어` | 파일 복사 · 이전 단계 결과 복사 |
| RUN | `명령어` | 빌드할 때 실행 |
| USER | `명령어` | 실행할 계정 |
| EXPOSE | `명령어` | 앱이 쓰는 포트 표시 (문서용) |
| ENTRYPOINT · CMD | `명령어` | 컨테이너 시작 명령 |

## 사용 예시

```dockerfile
# Spring Boot 앱 이미지 (멀티 스테이지 빌드)
# 빌드: docker build -t myapp:1.0 .

# 1단계: Gradle로 jar 빌드
FROM eclipse-temurin:21-jdk AS build
WORKDIR /workspace
COPY gradlew settings.gradle build.gradle ./
COPY gradle ./gradle
COPY src ./src
RUN ./gradlew bootJar --no-daemon

# 2단계: 실행에 필요한 JRE만 담은 가벼운 이미지
FROM eclipse-temurin:21-jre
WORKDIR /app
# root가 아닌 계정으로 실행
RUN useradd --system --uid 1001 app
COPY --from=build /workspace/build/libs/*.jar app.jar
USER app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## 주의할 점

- 프로젝트 루트에 `.dockerignore`를 두고 `build/`, `.gradle/`, `.git/`, `.env`를 제외합니다. 빠지면 빌드가 느려지고 비밀값이 이미지에 들어갈 수 있습니다.
- 비밀번호를 `ENV`로 이미지에 넣으면 이미지를 받은 누구나 볼 수 있습니다. 실행할 때 환경 변수로 전달합니다.
- `EXPOSE`는 표시일 뿐 포트를 열지 않습니다. 실제 공개는 `docker run -p`나 compose의 `ports`로 합니다.

---
name: Spring Boot jar 서버 실행
cat: 서버 운영
kind: 명령어
order: 20
aliases:
  - java -jar
  - 서버 배포
  - jar 실행
  - nohup
  - 백그라운드 실행
  - bootJar
  - 운영 서버 실행
summary: Spring Boot 앱을 jar 파일 하나로 빌드해 서버로 올리고 `java -jar`로 실행하는 가장 기본적인 배포 방법입니다. 터미널을 닫아도 유지하려면 `nohup`이나 systemd 서비스로 실행합니다.
signature: 'java -jar app.jar --spring.profiles.active=prod'
related:
  - systemctl
  - scp-rsync
  - spring/profile
  - spring/application-yml
doc: 'https://docs.spring.io/spring-boot/how-to/deployment/installing.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| ./gradlew bootJar | `명령` | 실행 가능한 jar 생성 (`build/libs/`) |
| java -jar app.jar | `명령` | jar 실행. 터미널을 닫으면 같이 종료 |
| --spring.profiles.active=prod | `인자` | 프로필 지정 (환경 변수 `SPRING_PROFILES_ACTIVE`도 가능) |
| --server.port=9090 | `인자` | 포트 변경 |
| -Xms · -Xmx | `JVM 옵션` | 시작 · 최대 힙 메모리 |
| nohup … & | `명령` | 터미널을 닫아도 계속 실행 |

## 사용 예시

```bash
# [내 맥] 빌드 후 서버로 업로드
./gradlew clean bootJar
scp build/libs/app-0.0.1-SNAPSHOT.jar ubuntu@203.0.113.10:/opt/app/app.jar

# [서버] 접속 후 Java 21 설치 확인
ssh ubuntu@203.0.113.10
sudo apt update && sudo apt install -y openjdk-21-jre-headless
java -version

# 1) 테스트 실행 (Ctrl+C 또는 터미널을 닫으면 종료)
java -jar /opt/app/app.jar --spring.profiles.active=prod

# 2) 백그라운드 실행 (터미널을 닫아도 유지)
nohup java -Xmx512m -jar /opt/app/app.jar --spring.profiles.active=prod \
  > /opt/app/app.log 2>&1 &
echo $! > /opt/app/app.pid          # 프로세스 번호 저장

# 실행 확인
curl -I http://localhost:8080        # 응답 헤더가 오면 실행 중
tail -f /opt/app/app.log

# 정상 종료 (SIGTERM → graceful shutdown)
kill "$(cat /opt/app/app.pid)"
```

## 주의할 점

- `nohup`은 서버가 재부팅되거나 앱이 죽으면 다시 살아나지 않습니다. 운영 서버에서는 `systemctl` 서비스로 등록합니다.
- DB 비밀번호를 `--spring.datasource.password=...`처럼 명령줄에 쓰면 `ps`로 보입니다. 환경 변수나 `EnvironmentFile`로 분리합니다.
- 종료할 때는 `kill`(SIGTERM)을 먼저 씁니다. `kill -9`는 처리 중인 요청을 끊어 버리므로 마지막 수단입니다.

---
name: application.yml
cat: 설정 · 프로퍼티
kind: 설정
order: 10
aliases:
  - 설정 파일
  - application.properties
  - 포트 변경
  - DB 연결
  - datasource
  - 로그 레벨
  - 환경 변수
summary: 'Spring Boot의 기본 설정 파일입니다. 포트, DB 연결, JPA, 로그 레벨 같은 설정을 `src/main/resources/application.yml`에 적습니다.'
related:
  - profile
  - value
  - configuration-properties
doc: 'https://docs.spring.io/spring-boot/reference/features/external-config.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| server.port | `int` | 서버 포트 (기본 8080) |
| spring.datasource.url / username / password | `String` | DB 연결 정보 |
| spring.jpa.hibernate.ddl-auto | `String` | none · validate · update · create · create-drop |
| spring.jpa.show-sql | `boolean` | 실행되는 SQL 출력 |
| logging.level.{패키지} | `String` | 패키지별 로그 레벨 (DEBUG, INFO …) |
| spring.servlet.multipart.max-file-size | `DataSize` | 업로드 파일 최대 크기 (기본 1MB) |

## 사용 예시

```yaml
server:
  port: 8080

spring:
  application:
    name: shop-api
  datasource:
    url: jdbc:mysql://localhost:3306/shop
    username: shop
    password: ${DB_PASSWORD}          # 환경 변수에서 읽기 (비밀번호를 파일에 적지 않음)
  jpa:
    hibernate:
      ddl-auto: validate              # 운영에서는 validate 또는 none
    show-sql: false
    properties:
      hibernate:
        format_sql: true
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 20MB

logging:
  level:
    com.example.shop: debug
    org.hibernate.SQL: debug          # SQL을 로그로 출력

# 직접 정의한 설정 (@Value, @ConfigurationProperties로 읽음)
app:
  upload-dir: /var/shop/uploads
  page-size: 20
```

## 주의할 점

- YAML은 들여쓰기로 계층을 구분합니다. 탭 대신 공백을 쓰고, `key: value`의 콜론 뒤에는 반드시 공백을 넣습니다.
- `ddl-auto: create`나 `update`를 운영 DB에서 쓰면 테이블이 지워지거나 의도치 않게 바뀔 수 있습니다.
- 비밀번호, API 키는 `${환경변수}`로 넣고 Git에 올리지 않습니다.

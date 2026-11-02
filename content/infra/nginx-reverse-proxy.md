---
name: Nginx 리버스 프록시
cat: 서버 운영
kind: 설정
order: 30
aliases:
  - nginx
  - 도메인 연결
  - 80 포트 8080 연결
  - proxy_pass
  - 웹 서버
  - 정적 파일 서빙
  - X-Forwarded-For
summary: Nginx가 80·443 포트로 들어온 요청을 받아 내부의 Spring Boot(8080)로 넘겨 주는 설정입니다. 도메인 연결, HTTPS, 정적 파일 응답, 접속 로그를 Nginx가 맡고 앱은 내부 포트에서만 동작합니다.
signature: 'location / { proxy_pass http://127.0.0.1:8080; }'
related:
  - certbot-https
  - ufw
  - spring-boot-jar
  - access-log-ip
doc: 'https://nginx.org/en/docs/http/ngx_http_proxy_module.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| listen | `지시어` | 받을 포트 (80, 443) |
| server_name | `지시어` | 이 설정을 적용할 도메인 |
| location | `블록` | 경로별 처리 규칙 |
| proxy_pass | `지시어` | 요청을 넘길 내부 주소 |
| proxy_set_header | `지시어` | 앱으로 넘길 헤더 (실제 클라이언트 IP 등) |
| client_max_body_size | `지시어` | 업로드 가능한 최대 요청 크기 (기본 1m) |

## 사용 예시

```nginx
# /etc/nginx/sites-available/example.com
# 활성화: sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
# 검사 후 적용: sudo nginx -t && sudo systemctl reload nginx

upstream app {
    server 127.0.0.1:8080;          # Spring Boot
}

server {
    listen 80;
    server_name example.com www.example.com;

    client_max_body_size 20m;       # 파일 업로드 크기 제한

    location / {
        proxy_pass http://app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 정적 파일은 Nginx가 직접 응답
    location /static/ {
        alias /opt/app/static/;
        expires 7d;
    }

    access_log /var/log/nginx/example.com.access.log;
    error_log  /var/log/nginx/example.com.error.log;
}
```

## 주의할 점

- 설정을 고친 뒤에는 반드시 `sudo nginx -t`로 문법을 검사하고 `reload`합니다. 검사 없이 `restart`하면 오류 시 사이트 전체가 내려갑니다.
- Spring에서 `request.getRemoteAddr()`가 항상 `127.0.0.1`로 나오면 `application.yml`에 `server.forward-headers-strategy: native`를 설정해 `X-Forwarded-*` 헤더를 반영합니다.
- 앱 포트(8080)는 방화벽에서 열지 않습니다. 외부에는 80·443만 열고 Nginx를 거쳐서만 들어오게 합니다.

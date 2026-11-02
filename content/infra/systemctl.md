---
name: systemctl (서비스 등록 · 자동 실행)
cat: 서버 운영
kind: 명령어
order: 10
aliases:
  - 서버 자동 실행
  - 재부팅 후 자동 시작
  - systemd
  - 서비스 등록
  - 데몬
  - service 파일
summary: Linux 서버에서 프로그램을 서비스로 등록해 백그라운드로 실행하고, 죽으면 다시 살리고, 재부팅 후에도 자동으로 시작하게 하는 명령입니다. Spring Boot jar를 운영 서버에 띄울 때 표준 방법입니다.
signature: 'sudo systemctl enable --now myapp'
related:
  - spring-boot-jar
  - journalctl
  - nginx-reverse-proxy
  - spring/profile
doc: 'https://man7.org/linux/man-pages/man1/systemctl.1.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| systemctl start · stop · restart | `명령` | 서비스 시작 · 중지 · 재시작 |
| systemctl enable · disable | `명령` | 부팅 시 자동 실행 켜기 · 끄기 |
| systemctl enable --now | `명령` | 자동 실행 등록과 동시에 바로 시작 |
| systemctl status | `명령` | 실행 상태와 최근 로그 몇 줄 확인 |
| systemctl daemon-reload | `명령` | 서비스 파일을 고친 뒤 다시 읽기 |
| /etc/systemd/system/이름.service | `파일` | 서비스 정의 파일(유닛 파일) |

## 사용 예시

```bash
# 1) 서비스 파일 작성: /etc/systemd/system/myapp.service
sudo tee /etc/systemd/system/myapp.service > /dev/null <<'EOF'
[Unit]
Description=My Spring Boot App
After=network.target

[Service]
User=app
WorkingDirectory=/opt/app
# DB 비밀번호 등은 별도 파일로 분리 (권한 600)
EnvironmentFile=/opt/app/app.env
ExecStart=/usr/bin/java -Xms256m -Xmx512m -jar /opt/app/app.jar --spring.profiles.active=prod
# Spring Boot가 정상 종료할 때의 종료 코드
SuccessExitStatus=143
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# 2) 등록 · 시작 · 부팅 시 자동 실행
sudo systemctl daemon-reload
sudo systemctl enable --now myapp

# 3) 상태 확인 · 재시작 · 중지
systemctl status myapp
sudo systemctl restart myapp
sudo systemctl stop myapp

# 4) 로그 실시간 보기
journalctl -u myapp -f
```

## 주의할 점

- 서비스 파일을 고친 뒤 `sudo systemctl daemon-reload`를 하지 않으면 예전 설정으로 실행됩니다.
- `User=`를 지정하지 않으면 root 권한으로 실행됩니다. 전용 계정(`sudo useradd --system app`)을 만들어 실행합니다.
- 비밀번호를 `ExecStart` 인자에 직접 쓰면 `ps`로 누구나 볼 수 있습니다. `EnvironmentFile`로 분리하고 `chmod 600`으로 권한을 막습니다.

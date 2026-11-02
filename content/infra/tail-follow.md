---
name: tail -f (실시간 로그)
cat: 로그 · 모니터링
kind: 명령어
order: 10
aliases:
  - 실시간 로그
  - 로그 보기
  - 로그 따라가기
  - tail -F
  - 마지막 줄
  - 로그 모니터링
signature: 'tail -n 100 -f 파일'
summary: '`tail -f`는 파일 끝에 새로 쌓이는 줄을 실시간으로 보여 줍니다. 서버에 요청이 들어오는 순간이나 에러가 나는 순간을 바로 볼 때 씁니다.'
related:
  - grep-logs
  - journalctl
  - access-log-ip
  - view-files
doc: 'https://man7.org/linux/man-pages/man1/tail.1.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| -n 숫자 | `옵션` | 마지막 몇 줄을 보여 줄지 (기본 10) |
| -f | `옵션` | 새 줄을 계속 따라가며 출력 |
| -F | `옵션` | 로그 파일이 교체(로테이션)돼도 다시 열어서 계속 따라감 |
| Ctrl+C | `단축키` | 따라가기 종료 |

## 사용 예시

```bash
# Nginx 접속 로그를 실시간으로 (Ubuntu 기본 경로)
tail -f /var/log/nginx/access.log

# 마지막 200줄부터 보고 이어서 따라가기
tail -n 200 -f /var/log/nginx/error.log

# Spring Boot 로그 파일 (logging.file.name 으로 지정한 경로)
tail -F /home/ubuntu/app/logs/app.log

# 따라가면서 에러만 골라 보기
tail -F /home/ubuntu/app/logs/app.log | grep --line-buffered -E 'ERROR|Exception'

# 특정 IP의 요청만 실시간으로
tail -f /var/log/nginx/access.log | grep --line-buffered '^198.51.100.7 '

# 여러 파일을 동시에 (파일 이름이 머리글로 표시됨)
tail -f /var/log/nginx/access.log /var/log/nginx/error.log

# 내 맥에서 원격 서버 로그를 바로 보기
ssh ubuntu@203.0.113.10 'tail -f /var/log/nginx/access.log'
```

## 주의할 점

- 로그 파일은 매일 새 파일로 교체(logrotate)되는 경우가 많습니다. 오래 지켜볼 때는 `-f` 대신 `-F`를 써야 교체된 뒤에도 계속 보입니다.
- `/var/log/nginx` 파일을 읽을 권한이 없으면 `sudo tail -f ...`를 쓰거나 사용자를 `adm` 그룹에 추가합니다.
- `tail -f ... | grep`에서 출력이 늦게 보이면 `grep --line-buffered`를 붙입니다.

---
name: 인프라 · DevOps 한눈에 보기
cat: 개념
kind: 개념
order: 40
aliases:
  - 인프라란
  - DevOps
  - 데브옵스
  - 서버 운영
  - 배포
  - 운영 환경
  - 클라우드
summary: 인프라는 서비스가 돌아가는 기반(서버 컴퓨터, 네트워크, 도메인, 데이터베이스, 배포·모니터링 도구)을 말합니다. 예전에는 개발자가 서버에 SSH로 접속해 터미널 명령으로 직접 설치·실행·로그 확인을 했고, 지금도 장애 원인을 추적할 때는 같은 명령을 씁니다.
related:
  - request-flow
  - ssh
  - systemctl
  - access-log-ip
doc: 'https://aws.amazon.com/ko/devops/what-is-devops/'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| 서버(컴퓨터) | `계층` | 앱이 실행되는 컴퓨터. AWS EC2, 사내 서버. `ssh`로 접속 |
| 네트워크 | `계층` | IP, 포트, 방화벽, 도메인. `ping`, `dig`, `ufw` |
| 웹 서버 · 프록시 | `계층` | 80·443 요청을 받아 앱으로 전달, HTTPS 처리. Nginx, certbot |
| 애플리케이션 | `계층` | Spring Boot 같은 실제 서버 프로그램. `java -jar`, `systemctl` |
| 데이터베이스 | `계층` | MySQL, PostgreSQL. 백업과 접속 권한 관리 |
| 배포 | `과정` | 코드를 서버에 올려 실행. `scp`, Docker, GitHub Actions |
| 모니터링 · 로그 | `과정` | 상태 확인과 장애 원인 추적. `top`, `tail -f`, `journalctl` |

## 사용 예시

```bash
# 원격 서버(Linux)를 터미널로 운영하는 흐름 예시
ssh ubuntu@203.0.113.10                        # 1) 서버 접속

uptime                                         # 2) 서버 상태: 켜진 시간, 부하
df -h                                          #    디스크 남은 용량
free -h                                        #    메모리

sudo systemctl status myapp                    # 3) 앱 서비스가 살아 있는지
ss -tlnp | grep 8080                           #    8080 포트에서 대기 중인지

journalctl -u myapp -n 100                     # 4) 앱 로그 최근 100줄
sudo tail -f /var/log/nginx/access.log         #    실시간 접속 로그 (Ctrl+C로 종료)

# 5) 접속 로그에서 요청이 많은 IP 상위 5개 (IP 추적)
sudo awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -5

# 6) 새 버전 배포: 내 컴퓨터에서 jar 업로드 → 서버에서 재시작
scp build/libs/app.jar ubuntu@203.0.113.10:~/
sudo systemctl restart myapp
```

## 주의할 점

- 요즘은 Docker, GitHub Actions, 클라우드 콘솔로 많은 부분을 자동화하지만, 장애가 나면 결국 서버에 접속해 프로세스·포트·로그를 터미널로 확인하게 됩니다.
- 운영 서버에서 명령을 실행할 때는 지금 접속한 서버가 어디인지(프롬프트의 호스트 이름) 먼저 확인합니다. 개발 서버와 운영 서버를 착각하는 사고가 흔합니다.

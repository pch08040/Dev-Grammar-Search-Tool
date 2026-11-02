---
name: HTTPS 인증서 (certbot)
cat: 서버 운영
kind: 명령어
order: 70
aliases:
  - 무료 SSL
  - HTTPS 적용
  - Let's Encrypt
  - 인증서 발급
  - 인증서 자동 갱신
  - SSL 인증서
summary: Let's Encrypt의 무료 인증서를 발급해 Nginx에 HTTPS를 적용하는 도구입니다. 발급과 Nginx 설정 수정, 만료 전 자동 갱신까지 처리합니다.
signature: 'sudo certbot --nginx -d example.com'
related:
  - nginx-reverse-proxy
  - ufw
  - dns-lookup
doc: 'https://certbot.eff.org/instructions?ws=nginx&os=snap'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| certbot --nginx -d 도메인 | `명령` | 발급 후 Nginx 설정에 443과 리다이렉트를 자동 추가 |
| certbot certonly --nginx | `명령` | 인증서만 발급하고 설정은 직접 수정 |
| certbot renew --dry-run | `명령` | 자동 갱신이 동작하는지 미리 시험 |
| certbot certificates | `명령` | 발급된 인증서와 만료일 보기 |
| /etc/letsencrypt/live/도메인/ | `경로` | `fullchain.pem`, `privkey.pem` 위치 |

## 사용 예시

```bash
# 전제
# - 도메인(example.com)의 DNS A 레코드가 서버 IP(203.0.113.10)를 가리킴
# - Nginx 설정에 server_name example.com 이 있음
# - 방화벽에서 80, 443 포트가 열려 있음 (sudo ufw allow 'Nginx Full')

# 1) 설치 (Ubuntu: snap 방식 권장)
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# 2) 인증서 발급 + Nginx 설정 자동 수정 (443 추가, 80 → 443 리다이렉트)
sudo certbot --nginx -d example.com -d www.example.com

# 3) 자동 갱신 시험 (인증서는 만료 전에 타이머가 자동 갱신)
sudo certbot renew --dry-run
systemctl list-timers | grep certbot

# 4) 발급된 인증서와 만료일 확인
sudo certbot certificates

# 5) 적용 확인
curl -I https://example.com
```

## 주의할 점

- DNS가 아직 서버 IP를 가리키지 않으면 발급이 실패합니다. 먼저 `dig example.com`으로 IP가 맞는지 확인합니다.
- 80 포트가 막혀 있으면 도메인 소유 확인(HTTP-01)이 실패합니다. HTTPS만 쓰더라도 80 포트는 열어 둡니다.
- Let's Encrypt는 같은 도메인의 발급 횟수를 제한합니다. 설정을 시험할 때는 `--dry-run`이나 `--staging`을 씁니다.

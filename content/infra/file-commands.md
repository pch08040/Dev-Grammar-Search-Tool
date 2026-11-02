---
name: mkdir · cp · mv · rm · touch
cat: 터미널 기초
kind: 명령어
order: 20
aliases:
  - 폴더 만들기
  - 파일 복사
  - 이름 변경
  - 파일 이동
  - 파일 삭제
  - rm -rf
summary: 폴더를 만들고(`mkdir`), 파일을 복사하고(`cp`), 이동하거나 이름을 바꾸고(`mv`), 지우는(`rm`) 기본 명령입니다. `rm`으로 지운 파일은 휴지통을 거치지 않고 바로 사라집니다.
related:
  - navigation
  - permissions-sudo
  - scp-rsync
doc: 'https://man7.org/linux/man-pages/man1/cp.1.html'
---

## 사용 예시

```bash
mkdir logs                    # 폴더 만들기
mkdir -p app/config/dev       # 중간 폴더까지 한 번에

touch app/config/dev/.env     # 빈 파일 만들기 (이미 있으면 수정 시각만 갱신)

cp app.jar app.jar.bak        # 파일 복사 (백업)
cp -r config config-backup    # 폴더 복사는 -r
cp -i a.txt b.txt             # 덮어쓰기 전에 확인

mv old.txt new.txt            # 이름 바꾸기
mv new.txt logs/              # 다른 폴더로 이동

ls build/                     # 지우기 전에 대상부터 확인하는 습관
rm logs/old.log               # 파일 삭제 (복구 불가)
rm -i *.log                   # 하나씩 확인하며 삭제
rmdir empty-dir               # 빈 폴더 삭제
rm -r build/                  # 폴더째 삭제 (내용 포함)
```

## 주의할 점

- `rm -rf`는 확인 없이 폴더 전체를 지웁니다. 경로를 변수로 쓰거나(`rm -rf $DIR/`) `sudo`와 함께 쓰면 변수가 비었을 때 엉뚱한 곳이 지워질 수 있으니, 실행 전에 `ls`로 대상을 꼭 확인합니다.
- `cp`와 `mv`는 같은 이름의 파일이 있으면 묻지 않고 덮어씁니다. 중요한 파일은 `-i` 옵션을 붙입니다.

# project estimate-front

## env 설정
- `next-auth`를 위한 환경 변수 추가
- `.env` 파일 내에 `NEXTAUTH_SECRET` 변수 추가

```bash
# secret 생성
$ openssl rand -base64 32

# 또는 node 사용
$ node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

```
NEXTAUTH_SECRET={ 위에서 생성한 값 }
```

## 디자인
- antd + tailwind
- antd 컴포넌트는 react라이브러리 다음 import

## node 버전
- v21.4.0
- `.nvmrc` 파일 내 적용

```bash
$ nvm install 21
& nvm use 21
```

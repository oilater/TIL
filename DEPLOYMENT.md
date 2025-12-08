# 배포 환경 설정 가이드

## 필요한 환경 변수

### 1. GitHub OAuth
```bash
GITHUB_CLIENT_ID=your_production_client_id
GITHUB_CLIENT_SECRET=your_production_client_secret
GITHUB_REDIRECT_URI=https://your-domain.com/api/auth/callback
```

### 2. Redis
```bash
REDIS_URL=redis://your-redis-host:6379
# 또는 Redis Cloud/Upstash 사용 시
REDIS_URL=rediss://default:password@your-redis-cloud.com:6379
```

### 3. Node Environment
```bash
NODE_ENV=production
```

---

## 배포 플랫폼별 설정

### 🔷 Vercel 배포

#### 1. Redis 설정 (Upstash 권장)
1. [Upstash](https://upstash.com/) 가입
2. Redis 데이터베이스 생성
3. Connection String 복사 (예: `rediss://default:xxx@xxx.upstash.io:6379`)

#### 2. GitHub OAuth 설정
1. [GitHub Developer Settings](https://github.com/settings/developers) 접속
2. New OAuth App 생성
   - **Application name**: TIL Production
   - **Homepage URL**: `https://your-app.vercel.app`
   - **Authorization callback URL**: `https://your-app.vercel.app/api/auth/callback`
3. Client ID와 Client Secret 복사

#### 3. Vercel 환경 변수 설정
```bash
# Vercel CLI 사용
vercel env add GITHUB_CLIENT_ID
vercel env add GITHUB_CLIENT_SECRET
vercel env add GITHUB_REDIRECT_URI
vercel env add REDIS_URL
vercel env add NODE_ENV

# 또는 Vercel Dashboard에서
# Settings → Environment Variables에서 추가
```

#### 4. 배포
```bash
vercel --prod
```

---

### 🔶 Netlify 배포

#### 1. Redis 설정
- Upstash 사용 (위와 동일)

#### 2. Netlify 환경 변수 설정
```bash
# Netlify CLI
netlify env:set GITHUB_CLIENT_ID "your_client_id"
netlify env:set GITHUB_CLIENT_SECRET "your_client_secret"
netlify env:set GITHUB_REDIRECT_URI "https://your-app.netlify.app/api/auth/callback"
netlify env:set REDIS_URL "rediss://..."
netlify env:set NODE_ENV "production"

# 또는 Netlify Dashboard
# Site settings → Environment variables
```

---

### 🐳 Docker 배포

#### docker-compose.yml
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}
      - GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}
      - GITHUB_REDIRECT_URI=${GITHUB_REDIRECT_URI}
      - REDIS_URL=redis://redis:6379
      - NODE_ENV=production
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  redis_data:
```

---

## 권장 Redis 서비스

### 1. **Upstash** (권장 ⭐)
- **장점**: 서버리스, 무료 티어, Vercel 통합
- **가격**: 무료 10,000 commands/day
- **URL**: https://upstash.com/

### 2. **Redis Cloud**
- **장점**: 공식 Redis 서비스
- **가격**: 무료 30MB
- **URL**: https://redis.com/

### 3. **Railway**
- **장점**: 간단한 설정
- **가격**: $5/month
- **URL**: https://railway.app/

---

## 환경 변수 체크리스트

배포 전 확인:
- [ ] `GITHUB_CLIENT_ID` 설정됨
- [ ] `GITHUB_CLIENT_SECRET` 설정됨
- [ ] `GITHUB_REDIRECT_URI`가 프로덕션 URL로 설정됨
- [ ] `REDIS_URL` 설정됨 (프로덕션 Redis)
- [ ] `NODE_ENV=production` 설정됨
- [ ] GitHub OAuth App의 Callback URL이 프로덕션 URL과 일치함

---

## 보안 주의사항

⚠️ **절대 Git에 커밋하지 말 것**:
- `.env.local`
- `.env.production`
- 실제 환경 변수 값

✅ **Git에 커밋해도 되는 것**:
- `.env.example` (값 없이 키만)
- 이 가이드 문서

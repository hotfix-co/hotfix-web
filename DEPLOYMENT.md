# Deployment Guide

This guide will help you deploy the HOTFIX website to Vercel.

## Prerequisites

1. **SendGrid Account**: 
   - Sign up at https://sendgrid.com (free tier available)
   - Verify your sender email address
   - Create an API key with "Full Access" permissions

2. **Vercel Account**:
   - Sign up at https://vercel.com (free tier available)
   - Connect your Git provider (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your Repository

1. Initialize git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Push to your Git provider:
```bash
git remote add origin <your-repo-url>
git push -u origin main
```

## Step 2: Deploy to Vercel

### Method 1: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and log in
2. Click "Add New" → "Project"
3. Import your repository
4. Configure your project:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: ./
   - **Build Command**: `pnpm build`
   - **Install Command**: `pnpm install`
   - **Output Directory**: `.next` (default)

5. Add Environment Variables:
   ```
   SENDGRID_API_KEY=<your-sendgrid-api-key>
   SENDGRID_FROM_EMAIL=noreply@hotfix-doo.com
   CONTACT_EMAIL=ops@hotfix-doo.com
   ```

6. Click "Deploy"

### Method 2: Using Vercel CLI

1. Install Vercel CLI:
```bash
pnpm add -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts and add environment variables when asked

5. For production deployment:
```bash
vercel --prod
```

## Step 3: Configure SendGrid

1. **Verify Sender Identity**:
   - Go to SendGrid Dashboard → Settings → Sender Authentication
   - Verify your domain or single sender email
   - Use the verified email as `SENDGRID_FROM_EMAIL`

2. **Create API Key**:
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Select "Full Access"
   - Copy the key and add it to Vercel environment variables

3. **Test the Contact Form**:
   - Visit your deployed site
   - Fill out the contact form
   - Check if you receive the email

## Step 4: Configure Custom Domain (Optional)

1. In your Vercel project dashboard, go to Settings → Domains
2. Add your custom domain
3. Follow Vercel's instructions to configure DNS
4. Update `SENDGRID_FROM_EMAIL` to use your custom domain

## Step 5: Post-Deployment Checks

- [ ] Website loads correctly
- [ ] All pages are accessible (Home, About, Services, Contact)
- [ ] Contact form works and sends emails
- [ ] Images load properly
- [ ] Mobile responsive design works
- [ ] SEO meta tags are present
- [ ] SSL certificate is active (https://)

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `SENDGRID_API_KEY` | Your SendGrid API key | `SG.xxxxxxxxxxxxx` |
| `SENDGRID_FROM_EMAIL` | Verified sender email | `noreply@hotfix-doo.com` |
| `CONTACT_EMAIL` | Email to receive form submissions | `ops@hotfix-doo.com` |

## Updating the Deployment

Vercel automatically redeploys when you push to your repository:

```bash
git add .
git commit -m "Update website"
git push
```

## Monitoring

1. **Vercel Analytics**: 
   - Enable in Project Settings → Analytics
   - Monitor performance and Core Web Vitals

2. **SendGrid Analytics**:
   - Track email delivery in SendGrid Dashboard
   - Monitor email open rates and bounces

## Troubleshooting

### Contact Form Not Working

1. Check environment variables in Vercel
2. Verify SendGrid API key is active
3. Ensure sender email is verified in SendGrid
4. Check Vercel function logs for errors

### Build Failures

1. Check the build logs in Vercel
2. Ensure all dependencies are in package.json
3. Run `pnpm build` locally to test

### DNS Issues

1. Wait for DNS propagation (can take up to 48 hours)
2. Clear your browser cache
3. Use [DNS Checker](https://dnschecker.org) to verify DNS records

## Support

For deployment issues:
- Vercel Documentation: https://vercel.com/docs
- SendGrid Documentation: https://docs.sendgrid.com
- Contact: ops@hotfix-doo.com

## Security Notes

- Never commit `.env.local` or API keys to git
- Regularly rotate API keys
- Monitor SendGrid usage for suspicious activity
- Keep dependencies updated: `pnpm audit --fix`


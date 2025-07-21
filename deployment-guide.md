# Deployment Guide for Firebase and OpenAI Integration

## Prerequisites
1. Firebase CLI installed: `npm install -g firebase-tools`
2. Firebase account with the "denarii-final" project created
3. OpenAI API key

## Step 1: Set up Environment Variables

### Local Development
Make sure your `.env.local` file contains all required environment variables:
- Firebase configuration (NEXT_PUBLIC_FIREBASE_*)
- OpenAI function URL (NEXT_PUBLIC_FUNCTIONS_URL)

### Production
Set up Firebase secrets for the OpenAI API key:
```
firebase functions:secrets:set OPENAI_API_KEY
```

## Step 2: Deploy Firebase Functions

Deploy your Firebase functions first:
```
cd functions
npm install
npm run deploy
```

After deployment, note the function URL from the Firebase console or CLI output.

## Step 3: Update Function URL

If the function URL has changed, update it in your environment variables:
1. Update `.env.local` for local development
2. Set it in your hosting environment for production

## Step 4: Build and Deploy the Next.js App

Run the deploy script:
```
npm run deploy
```

This will:
1. Build your Next.js app with static export
2. Deploy to Firebase hosting

## Step 5: Verify Deployment

1. Visit your deployed site
2. Test the chat functionality to ensure OpenAI integration works
3. Check Firebase Functions logs for any errors

## Troubleshooting

### OpenAI API Not Working
- Verify the OpenAI API key is correctly set as a Firebase secret
- Check Firebase Functions logs for errors
- Ensure the function URL is correctly set in your environment variables

### Firebase Hosting Issues
- Make sure your `next.config.ts` has `output: 'export'`
- Verify the `out` directory is specified in `firebase.json`
- Check that `trailingSlash: true` is set in both Next.js config and Firebase hosting
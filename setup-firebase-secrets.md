# Setting up Firebase Secrets for OpenAI API

To set up the OpenAI API key as a secret in Firebase:

1. Install Firebase CLI if not already installed:
```
npm install -g firebase-tools
```

2. Log in to Firebase:
```
firebase login
```

3. Set the OpenAI API key as a secret:
```
firebase functions:secrets:set OPENAI_API_KEY
```
When prompted, enter your OpenAI API key.

4. Verify the secret is set:
```
firebase functions:secrets:get OPENAI_API_KEY
```
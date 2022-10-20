# Backend

<!-- Generated File tree using: -->
<!-- https://marketplace.visualstudio.com/items?itemName=Shinotatwu-DS.file-tree-generator -->

## Table of Contents
- [File Structure](#file-structure)
- [API Endpoints](#available-api-endpoints)
  - [Accounts](#accounts)
  - [Posts](#posts)
## File Structure
```
📦src
 ┣ 📂assets
 ┣ 📂modules
 ┃ ┣ 📂accounts
 ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┣ 📜account-model.js
 ┃ ┃ ┃ ┣ 📜email-verification-model.js.js
 ┃ ┃ ┃ ┗ 📜profile-model.js
 ┃ ┃ ┣ 📜login-routes.js
 ┃ ┃ ┣ 📜profile-routes.js
 ┃ ┃ ┗ 📜signup-routes.js
 ┃ ┗ 📂posts
 ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┗ 📜post-model.js
 ┃ ┃ ┗ 📜post-routes.js
 ┣ 📂utils
 ┃ ┣ 📂credentials
 ┃ ┃ ┗ 📜twadder-b2796-firebase-adminsdk-3w3mb-1dccf355e0.json
 ┃ ┣ 📂firebase
 ┃ ┃ ┗ 📜firebase-init.js
 ┃ ┣ 📂middleware
 ┃ ┃ ┗ 📜multer-upload.js
 ┃ ┣ 📜.DS_Store
 ┃ ┣ 📜config.js
 ┃ ┣ 📜debug.js
 ┃ ┣ 📜encrypt-string.js
 ┃ ┗ 📜mongoose-types.js
 ┣ 📜.DS_Store
 ┗ 📜index.js
 ```

 ## Available API Endpoints

### Accounts
```
POST /login
```
Body:
- username: String
- password: String

Response:
- sessionId

```
GET /me/profile
```
Params: 
- sessionId

```
GET /signup/verify
```
Description: get verification code send to your mailbox.

Params:
- email

```
POST /signup/verify
```
Description: verify the email.

Body:
- email
- verificationCode

Response:
- status 200 if valid code

```
POST /signup
```
Body:
- username
- password
- email
- enableNotifications
- verificationCode
- displayName
- birthday

Response:
- status 200 if account created

### Posts
```
POST /posts
```
Params: 
- sessionId

FormData:
- text
- images
- replyingTo: username

```
GET /posts
```
Params:
- type: POSTS/REPLIES/MEDIA/LIKES
- username: null (for all users) or an existing user

Response:
- posts: array of posts

```
PUT /posts/:id
```
Params:
- mode: LIKE/RETWEET/
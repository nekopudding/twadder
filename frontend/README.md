# Frontend

## File Structure
```
📦src
 ┣ 📂app - redux slices and reducers
 ┣ 📂assets
 ┃ ┗ 📂icons
 ┣ 📂pages
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂DialogForm
 ┃ ┃ ┃ ┣ 📂SignUpForm
 ┃ ┃ ┃ ┃ ┣ 📜SignUpForm.js
 ┃ ┃ ┃ ┃ ┣ 📜Step1.js
 ┃ ┃ ┃ ┃ ┣ 📜Step2.js
 ┃ ┃ ┃ ┃ ┗ 📜Step3.js
 ┃ ┃ ┃ ┣ 📜SignInForm.js
 ┃ ┃ ┃ ┗ 📜StyledInput.js
 ┃ ┃ ┣ 📂Timeline
 ┃ ┃ ┃ ┣ 📂PostSection
 ┃ ┃ ┃ ┃ ┣ 📜PostPreview.js
 ┃ ┃ ┃ ┃ ┗ 📜PostSection.js
 ┃ ┃ ┃ ┣ 📜Header.js
 ┃ ┃ ┃ ┣ 📜InputBox.js
 ┃ ┃ ┃ ┗ 📜Timeline.js
 ┃ ┃ ┣ 📜Drawer.js
 ┃ ┃ ┣ 📜HomeRight.js
 ┃ ┃ ┗ 📜Toast.js
 ┃ ┣ 📜Home.js
 ┃ ┣ 📜Messages.js
 ┃ ┣ 📜Notifications.js
 ┃ ┣ 📜Profile.js
 ┃ ┣ 📜Search.js
 ┃ ┗ 📜SignUp.js
 ┣ 📂styles - scss styling: global themes and modular styles
 ┃ ┗ 📂scss
 ┃ ┃ ┣ 📜App.module.scss
 ┃ ┃ ┣ 📜Drawer.module.scss
 ┃ ┃ ┣ 📜Home.module.scss
 ┃ ┃ ┣ 📜HomeRight.module.scss
 ┃ ┃ ┣ 📜PostPreview.module.scss
 ┃ ┃ ┣ 📜SignUp.module.scss
 ┃ ┃ ┣ 📜SignUpForm.module.scss
 ┃ ┃ ┣ 📜Timeline.module.scss
 ┃ ┃ ┣ 📜Toast.module.scss
 ┃ ┃ ┣ 📜_variables.scss
 ┃ ┃ ┗ 📜globals.scss
 ┣ 📂utils - tests, helper functions
 ┃ ┣ 📂tests
 ┃ ┃ ┣ 📜App.test.js
 ┃ ┃ ┣ 📜reportWebVitals.js
 ┃ ┃ ┗ 📜setupTests.js
 ┃ ┣ 📜cookies.js
 ┃ ┣ 📜fetch-api.js
 ┃ ┗ 📜textarea-auto-resize.js
 ┣ 📜App.js
 ┣ 📜index.js
 ```
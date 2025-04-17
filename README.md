# Authentication + Web3 Auth + Counter Dapp
This project is built using Vite, React, and TypeScript, and integrates Web3 features along with a basic authentication flow.

## Available Scripts

In the project directory, you can run:

### npm i

Installs all the dependencies required for the project as specified in the package.json file.

### use env.sample to .env file

Copy the env.sample file and rename it to .env to set up environment variables required for the project.

### npm run dev

Runs the app in the development mode.\
Open [http://localhost:5173] to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### npm run build

Builds the app for production to the build folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Features Integrated
#  Authentication Flow

# Sign Up Page

Users can sign up with Email and Password.

Includes input validation for form fields.

# Sign In Page

Only accessible after successful sign-up.

Requires the same credentials used during sign-up.

# Sign In With google Auth

implemented google singup and sign in with firebase auth.

 # Forgot Password

Sign up first to test this feature.

Enter the registered email to receive/reset password.

# OTP Verification Page

Use the test OTP code: 123456 to validate the page.

# Create Password Page

You must use the same password you signed up with.

The password is stored temporarily in localStorage for simulation.

# Web3 Integration
# Wallet Connection

After sign-in, users can connect their MetaMask wallet.
please connect to sepolia test network to test.

# Libraries Used

Integrated with Ethers.js for Ethereum blockchain interactions.

State Management

Used Redux to manage wallet connection state.

# Smart Contract Features
Counter Smart Contract Integration

ABI integrated for a sample counter contract.

Users can increment and decrement the counter.

# Network Requirement

Please ensure you're connected to the Sepolia Test Network in MetaMask.






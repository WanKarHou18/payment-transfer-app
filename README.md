# Payment Transfer App Setup Guide

Follow these steps to get the Payment Transfer App setup and running smoothly.

---

## Mobile App Demo

## Overall Architecture
<img width="551" height="340" alt="image" src="https://github.com/user-attachments/assets/829d1e94-55a2-405d-9a0e-01b6b65ff896" />


## Feature
- View and monitor current account balance
- Fingerprint authentication for secure transfer payments
- Perform money transfers with recipient details
- Top-up account balance seamlessly
- Select recipients directly from the device’s contact list
- View recent transfer history for quick repeat transactions
- In-app WebView for embedded webpage display
- etc

## Important Notes 📝

- For a smoother experience, connect your laptop to a strong Wi-Fi internet connection. 📶
- Make sure you have setup environment for React Native. May refer here if don't have. https://reactnative.dev/docs/set-up-your-environment
- Change the value of BASE_URL in Config.tsx accordingly
<img width="748" height="176" alt="image" src="https://github.com/user-attachments/assets/e898cf80-299e-4cbb-ba99-1f3d9ef4dc70" />

- Need help finding your IPv4 address? This link might help:  
  [How to find your IP address](https://www.avast.com/c-how-to-find-ip-address)  
- If you encounter any issues or need clarification, feel free to reach out via LinkedIn or WhatsApp. Thanks! 🙏

---

## Clone the Project 💻

1. Clone the project repository using git:
    ```bash
    git clone <repository-url>
    ```
2. Open the project folder in your preferred code editor, such as Visual Studio Code.
---

## Run the Server Locally 🌐

1. Open a new terminal and navigate to the diretory of server folder in the project
   
   <img width="284" height="38" alt="image" src="https://github.com/user-attachments/assets/c1e1a150-b8c7-4234-88db-6d2fb47c5944" />

3. Install the required dependencies
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    node server.js
    ```

---

## Run the Mobile App 📱

1. Open a new terminal window and ensure you're in the project's base directory.  
2. Change the value of BASE_URL in Config.tsx accordingly
<img width="748" height="176" alt="image" src="https://github.com/user-attachments/assets/e898cf80-299e-4cbb-ba99-1f3d9ef4dc70" />

3. Install dependencies
    ```bash
    npm install
    ```
4. Start the Expo development server:
    ```bash
    npx expo start
    ```
5. When the QR code appears, press the corresponding key to run on your preferred device:  
   - Press `a` to run on an Android emulator.  
   - Press `i` to run on an iOS simulator (macOS only).  
   - Press `w` to run in the web browser.
<img width="528" height="300" alt="image" src="https://github.com/user-attachments/assets/b051a3f0-11fe-4612-bd82-01a7aba29f4d" />
---

## Run on a Real Android Device 🤖

1. Enable **Developer Mode** and **USB Debugging** on your Android phone.  
2. Ensure both your laptop and phone are connected to the **same Wi-Fi network** if possible
3. Connect your laptop and phone using a USB cable.  
5. In the Expo terminal, select your physical phone device to run the app on.

May refer link here for more info  [Running on device](https://reactnative.dev/docs/running-on-device)

---

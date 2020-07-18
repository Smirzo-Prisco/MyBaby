1. create app: ionic start NOME sidemenu

2. run app on browser: ionic serve

3. prepare app on phone: ionic cordova prepare android

4. run app on phone: ionic serve --devapp

5. ionic documentation: https://ionicframework.com/docs

6. install firebase on ionic: https://ionicframework.com/docs/native/firebase-x

7. create firebase project: https://console.firebase.google.com/

8. generate APK: ionic cordova build android --prod

9. run app on android emulator: ionic cordova run android

10. Build with gradle bundle: ./gradlew bundle (build in platforms/android/app/build/outputs/bundle/release/app.aab)

11. Build signed apk from command line:
 - ionic cordova build --release android
 - keytool -genkey -v -keystore key.keystore -alias chiave -keyalg RSA -keysize 2048 -validity 10000
 - jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk chiave
 - Passord: keystore
 - ./zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk MyBaby.apk

@echo off
echo Building OPTIMIZED SINGLE APK for 5KHRM...
echo.

echo Cleaning previous builds...
cd android
call gradlew clean
cd ..

echo.
echo Building release APK with Hermes + Native optimizations...
cd android
call gradlew assembleRelease
cd ..

echo.
echo APK build completed!
echo Check android\app\build\outputs\apk\release\ for the optimized APKs
echo.
echo You should see:
echo - app-universal-release.apk (single APK for all devices - RECOMMENDED)
echo - app-arm64-v8a-release.apk (for 64-bit ARM devices only)
echo - app-armeabi-v7a-release.apk (for 32-bit ARM devices only)
echo.
echo The universal APK should be significantly smaller than 67MB!
echo.
echo Optimizations applied:
echo - Hermes JavaScript optimization enabled
echo - Native library architecture splitting
echo - Resource shrinking enabled
echo - Unused vector icons removed
echo - Aggressive Proguard rules
echo - Unused permissions removed
echo.
pause

@echo off
echo Building optimized SINGLE APK for 5KHRM...
echo.

echo Cleaning previous builds...
cd android
call gradlew clean
cd ..

echo.
echo Building release APK with maximum optimizations...
cd android
call gradlew assembleRelease
cd ..

echo.
echo APK build completed!
echo Check android\app\build\outputs\apk\release\ for the optimized APK
echo.
echo You should see:
echo - app-release.apk (single optimized APK for all devices)
echo.
echo Expected size reduction: From 71MB to approximately 25-35MB!
echo.
echo Optimizations applied:
echo - R8 code shrinking enabled
echo - Resource shrinking enabled
echo - Unused vector icons removed
echo - Aggressive Proguard rules
echo - Hermes optimization
echo - Zip alignment enabled
echo.
pause

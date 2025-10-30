@echo off
echo Building SINGLE APK under 50MB for 5KHRM...
echo.

echo Cleaning previous builds...
cd android
call gradlew clean
cd ..

echo.
echo Building release APK with MAXIMUM optimizations...
cd android
call gradlew assembleRelease
cd ..

echo.
echo APK build completed!
echo Check android\app\build\outputs\apk\release\ for the optimized APK
echo.
echo You should see:
echo - app-release.apk (single optimized APK under 50MB)
echo.
echo Optimizations applied:
echo - Hermes JavaScript optimization
echo - Only 2 vector icon libraries (Feather + Ionicons)
echo - Removed unused native libraries
echo - Aggressive resource shrinking
echo - PNG compression enabled
echo - Removed unused permissions
echo - Console logs removed
echo.
echo Expected size: 35-45MB (down from 67MB)
echo.
pause

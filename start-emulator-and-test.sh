#!/bin/bash

export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin

AVD_NAME="emulator-5554"  # Change to your AVD name

if ! adb devices | grep -w "device" | grep -q "emulator"; then
  echo "📱 Starting Android Emulator: $AVD_NAME"
  nohup emulator -avd "$AVD_NAME" -no-snapshot-load > emulator.log 2>&1 &
  echo "⌛ Waiting for emulator to boot..."
  $ANDROID_HOME/platform-tools/adb wait-for-device

  echo "⏳ Waiting for Android to finish booting..."
  boot_completed=""
  while [[ "$boot_completed" != "1" ]]; do
    boot_completed=$($ANDROID_HOME/platform-tools/adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    sleep 2
  done

  echo "✅ Emulator is fully booted."
else
  echo "✅ Emulator already running."
fi

echo "🚀 Running tests..."
npx wdio run wdio.conf.ts

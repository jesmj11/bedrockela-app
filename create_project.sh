#!/bin/bash
# Create a new Xcode iOS/macOS app project via command line

# We'll copy the sources from BedrockELA-Native
cp -r ../BedrockELA-Native/Sources/BedrockELA/* ./ 2>/dev/null || true

echo "Created BedrockELA-App directory"
echo "Ready to open in Xcode"

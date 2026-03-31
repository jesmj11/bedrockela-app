#!/bin/bash

# Script to center title pages (page 1) in all lesson files

for file in *-grade-lesson-*.html; do
  if [ -f "$file" ]; then
    # Check if the centering CSS already exists
    if ! grep -q "Title page (page 1) centered" "$file"; then
      # Find the line with "h3 { font-size" and add centering CSS after it
      sed -i.bak '/h3 { font-size.*color: #305853; }/a\
    /* Title page (page 1) centered */\
    [data-page="1"] {\
      text-align: center;\
      display: flex;\
      flex-direction: column;\
      justify-content: center;\
      align-items: center;\
      min-height: calc(100vh - 200px);\
    }\
    [data-page="1"] h1 { font-size: 2.5rem; }\
    [data-page="1"] h2 { font-size: 2rem; margin-top: 1rem; }\
    [data-page="1"] .unit-label { font-size: 1.1rem; color: #666; margin-top: 1.5rem; }\
    [data-page="1"] .chapter-info { font-size: 1rem; color: #888; margin-top: 0.5rem; }
' "$file"
      echo "Updated: $file"
    fi
  fi
done

# Clean up backup files
rm -f *.bak

echo "Done! All title pages centered."

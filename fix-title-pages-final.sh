#!/bin/bash

# Fix all 4th grade lessons with the final title page styling

for file in 4th-grade-lesson-*.html; do
  if [ -f "$file" ]; then
    # Replace the existing title page CSS with the final version
    sed -i.bak 's|/\* Title page (page 1) centered.*\*/|/* Title page (page 1) centered horizontally, pushed down 1.5 inches */|g' "$file"
    sed -i.bak '/\[data-page="1"\] {/,/}/c\
    [data-page="1"] {\
      text-align: center;\
      padding-top: 144px; /* 1.5 inches */\
    }' "$file"
    echo "Fixed: $file"
  fi
done

# Clean up backup files
rm -f *.bak

echo "Done! All 4th grade title pages fixed."

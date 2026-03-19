#!/bin/bash
count=0
for file in 6th-grade-day-*.html; do
  if grep -q "if (typeof initLessonViewer === 'function')" "$file" && ! grep -q "safeInitLesson" "$file"; then
    # Extract the lesson config variable name
    configName=$(grep -o "initLessonViewer(lesson[0-9]*Config)" "$file" | head -1 | sed 's/initLessonViewer(\(.*\))/\1/')
    
    if [ -n "$configName" ]; then
      # Replace the old pattern with new safe pattern
      sed -i '' "s|if (typeof initLessonViewer === 'function') {.*initLessonViewer($configName);.*}|// Wait for DOM and all scripts to load before initializing\n        function safeInitLesson() {\n            if (typeof initLessonViewer === 'function') {\n                initLessonViewer($configName);\n            } else {\n                console.error('initLessonViewer function not found!');\n                // Retry after a short delay\n                setTimeout(safeInitLesson, 100);\n            }\n        }\n\n        if (document.readyState === 'loading') {\n            document.addEventListener('DOMContentLoaded', safeInitLesson);\n        } else {\n            // DOM already loaded\n            safeInitLesson();\n        }|g" "$file"
      count=$((count + 1))
      echo "✅ Fixed: $file (using $configName)"
    fi
  fi
done
echo "Total fixed: $count"

#!/bin/bash

# Fix all lesson files that call initLessonViewer without DOMContentLoaded wrapper
# This prevents the "blue screen" Firebase disconnection issue

echo "🔧 Fixing initLessonViewer calls in all lesson files..."

# Find all HTML files that contain initLessonViewer
files=$(grep -rl "initLessonViewer(" *.html 2>/dev/null | grep -E "grade-day-.*\.html$")

count=0
for file in $files; do
    # Check if it already has safeInitLesson (already fixed)
    if grep -q "safeInitLesson" "$file"; then
        echo "✓ $file (already fixed)"
        continue
    fi
    
    # Check if it has the old pattern
    if grep -q "if (typeof initLessonViewer === 'function') {" "$file"; then
        echo "🔧 Fixing $file..."
        
        # Create the safe wrapper
        # Replace the old pattern with the new safe pattern
        perl -i -pe 'BEGIN{undef $/;} s/\]\s*};\s*if \(typeof initLessonViewer === .function.\) \{\s*initLessonViewer\((\w+)\);\s*\} else \{\s*console\.error\(.initLessonViewer function not found!.\);\s*\}/]
        };

        \/\/ Wait for DOM and all scripts to load before initializing
        function safeInitLesson() {
            if (typeof initLessonViewer === '"'"'function'"'"') {
                initLessonViewer($1);
            } else {
                console.error('"'"'initLessonViewer function not found!'"'"');
                \/\/ Retry after a short delay
                setTimeout(safeInitLesson, 100);
            }
        }

        if (document.readyState === '"'"'loading'"'"') {
            document.addEventListener('"'"'DOMContentLoaded'"'"', safeInitLesson);
        } else {
            \/\/ DOM already loaded
            safeInitLesson();
        }/smg' "$file"
        
        count=$((count + 1))
        echo "   ✅ Fixed!"
    fi
done

echo ""
echo "✅ Fixed $count lesson files!"
echo "🚀 Ready to deploy!"

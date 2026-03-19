#!/bin/bash

# Fix 4th Grade Assessment Days - Add safeInitLesson Wrapper
# This script adds the safety wrapper to all assessment days (every 5th lesson)

echo "🔧 Fixing 4th Grade Assessment Days..."
echo ""

# Assessment days: 005, 010, 015, 020, 025, 030, 035, 040, 045, 050, etc.
assessment_days=(005 010 015 020 025 030 035 040 045 050 055 060 065 070 075 080 085 090 095 100 105 110 115 120 125 130 135 140 145 150 155 160 165 170 175 180)

fixed_count=0
skipped_count=0

for day in "${assessment_days[@]}"; do
    file="4th-grade-day-${day}.html"
    
    if [ ! -f "$file" ]; then
        echo "⚠️  File not found: $file (skipping)"
        ((skipped_count++))
        continue
    fi
    
    # Check if it already has safeInitLesson
    if grep -q "function safeInitLesson" "$file"; then
        echo "✓ $file already has wrapper (skipping)"
        ((skipped_count++))
        continue
    fi
    
    # Check if it has an init function to wrap
    if ! grep -q "<script>" "$file"; then
        echo "⚠️  $file has no <script> tag (skipping)"
        ((skipped_count++))
        continue
    fi
    
    echo "🔧 Fixing $file..."
    
    # Create backup
    cp "$file" "${file}.backup"
    
    # Add safeInitLesson wrapper
    # Find the first <script> tag and add the wrapper function before the closing </script>
    awk '
    /<script>/ {
        print
        print "        function safeInitLesson() {"
        print "            if (typeof initLessonViewer === \"function\") {"
        print "                initLessonViewer();"
        print "            } else {"
        print "                console.error(\"initLessonViewer not loaded yet\");"
        print "                setTimeout(safeInitLesson, 100);"
        print "            }"
        print "        }"
        print ""
        next
    }
    /window\.addEventListener.*load.*initLessonViewer/ {
        print "        window.addEventListener(\"load\", safeInitLesson);"
        next
    }
    { print }
    ' "${file}.backup" > "$file"
    
    ((fixed_count++))
    echo "✅ Fixed $file"
    echo ""
done

echo ""
echo "================================"
echo "📊 Summary:"
echo "  Fixed: $fixed_count files"
echo "  Skipped: $skipped_count files"
echo "================================"
echo ""

if [ $fixed_count -gt 0 ]; then
    echo "✅ Done! Assessment days are now safe from blue screens."
    echo ""
    echo "Next steps:"
    echo "1. Test a few files locally (open in browser)"
    echo "2. Run: firebase deploy --only hosting"
    echo "3. Test in production"
fi

#!/bin/bash

BASE_URL="https://bedrockela-96dbd.web.app"
PASS=0
FAIL=0

echo "🔍 COMPREHENSIVE BUG CHECK - BedrockELA Website"
echo "================================================"
echo ""

# Test function
test_page() {
    local name="$1"
    local url="$2"
    local check="$3"
    
    echo -n "Testing $name... "
    
    response=$(curl -s "$url")
    http_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$http_code" = "200" ]; then
        if [ -n "$check" ]; then
            if echo "$response" | grep -q "$check"; then
                echo "✅ PASS"
                PASS=$((PASS + 1))
            else
                echo "❌ FAIL (missing: $check)"
                FAIL=$((FAIL + 1))
            fi
        else
            echo "✅ PASS"
            PASS=$((PASS + 1))
        fi
    else
        echo "❌ FAIL (HTTP $http_code)"
        FAIL=$((FAIL + 1))
    fi
}

# 1. Core Pages
echo "📄 CORE PAGES"
echo "-------------"
test_page "Homepage" "$BASE_URL/" "BedrockELA"
test_page "Student Login" "$BASE_URL/student-login.html" "Student Login"
test_page "Student Dashboard" "$BASE_URL/student-dashboard.html" "Dashboard"
echo ""

# 2. Test Each Grade (Day 1)
echo "📚 GRADE LEVEL LESSONS (Day 1)"
echo "------------------------------"
test_page "1st Grade Day 1" "$BASE_URL/1st-grade-day-1.html" "1st Grade"
test_page "2nd Grade Day 1" "$BASE_URL/2nd-grade-day-1.html" "lesson1Config"
test_page "3rd Grade Day 1" "$BASE_URL/3rd-grade-day-1.html" "lesson1Config"
test_page "4th Grade Day 1" "$BASE_URL/4th-grade-day-001.html" "safeInitLesson"
test_page "5th Grade Day 1" "$BASE_URL/5th-grade-day-1.html" "lesson1Config"
test_page "6th Grade Day 1" "$BASE_URL/6th-grade-day-001.html" "safeInitLesson"
test_page "7th Grade Day 1" "$BASE_URL/7th-grade-day-1.html" "lesson1Config"
test_page "8th Grade Day 1" "$BASE_URL/8th-grade-day-001.html" "safeInitLesson"
echo ""

# 3. Test Mid-Range Lessons
echo "📖 MID-RANGE LESSONS (Day 50)"
echo "-----------------------------"
test_page "4th Grade Day 50" "$BASE_URL/4th-grade-day-050.html" "safeInitLesson"
test_page "5th Grade Day 50" "$BASE_URL/5th-grade-day-50.html" "lesson50Config"
test_page "6th Grade Day 50" "$BASE_URL/6th-grade-day-050.html" "safeInitLesson"
test_page "8th Grade Day 50" "$BASE_URL/8th-grade-day-050.html" "safeInitLesson"
echo ""

# 4. Test End Lessons (Day 180)
echo "🏁 FINAL LESSONS (Day 180)"
echo "-------------------------"
test_page "4th Grade Day 180" "$BASE_URL/4th-grade-day-180.html" "safeInitLesson"
test_page "5th Grade Day 180" "$BASE_URL/5th-grade-day-180.html" "lesson180Config"
test_page "6th Grade Day 180" "$BASE_URL/6th-grade-day-180.html" "safeInitLesson"
test_page "8th Grade Day 180" "$BASE_URL/8th-grade-day-180.html" "safeInitLesson"
echo ""

# 5. Check for JavaScript Errors
echo "🐛 JAVASCRIPT ERROR CHECK"
echo "------------------------"
echo -n "Checking for 'skill is not defined' error... "
if curl -s "$BASE_URL/4th-grade-day-004.html" | grep -q "\"content\":.*skill.*?"; then
    echo "❌ FOUND (still cached!)"
    FAIL=$((FAIL + 1))
else
    echo "✅ CLEAN"
    PASS=$((PASS + 1))
fi

echo -n "Checking 4th Grade Day 4 FIXED version... "
if curl -s "$BASE_URL/4th-grade-day-004-FIXED-2026-03-18.html" | grep -q "safeInitLesson"; then
    echo "✅ WORKING"
    PASS=$((PASS + 1))
else
    echo "❌ FAIL"
    FAIL=$((FAIL + 1))
fi
echo ""

# 6. Check CSS/JS Resources
echo "📦 RESOURCE FILES"
echo "----------------"
test_page "Lesson Viewer CSS" "$BASE_URL/css/lesson-viewer.css" "lesson-viewer"
test_page "Lesson Viewer JS" "$BASE_URL/js/lesson-viewer.js" "initLessonViewer"
test_page "Firebase Config" "$BASE_URL/firebase-config.js" "bedrockela-96dbd"
test_page "Offline Sync JS" "$BASE_URL/js/offline-sync.js" "OfflineSync"
echo ""

# Summary
echo "================================================"
echo "📊 TEST SUMMARY"
echo "================================================"
echo "✅ Passed: $PASS"
echo "❌ Failed: $FAIL"
echo "Total Tests: $((PASS + FAIL))"
echo ""

if [ $FAIL -eq 0 ]; then
    echo "🎉 ALL TESTS PASSED! Website is healthy!"
    exit 0
else
    echo "⚠️  Some tests failed. Review above for details."
    exit 1
fi

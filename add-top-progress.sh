#!/bin/bash

# Add top progress bar to all 6th and 8th grade lessons

for grade in grade6 grade8; do
  for file in curriculum/$grade/*.html; do
    if [ -f "$file" ]; then
      # Add CSS for top progress bar before </style>
      if ! grep -q "top-progress-bar" "$file"; then
        sed -i '' 's|</style>|    .top-progress-bar { position: sticky; top: 0; width: 100%; height: 8px; background: #e0e0e0; z-index: 1000; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }\n    .top-progress-fill { height: 100%; background: linear-gradient(90deg, #305853, #B06821); transition: width 0.3s ease; }\n  </style>|' "$file"
        
        # Add top progress bar HTML after <body>
        sed -i '' 's|<body>|<body>\n  <div class="top-progress-bar">\n    <div class="top-progress-fill" id="topProgressBar"></div>\n  </div>|' "$file"
        
        # Add progress update to JavaScript
        sed -i '' "s|currentPage = n;|const progress = (n / totalPages) * 100;\n      if (document.getElementById('topProgressBar')) document.getElementById('topProgressBar').style.width = progress + '%';\n      currentPage = n;|" "$file"
      fi
    fi
  done
  echo "✅ Updated $grade"
done

echo "🎉 Done! All lessons now have top progress bar."

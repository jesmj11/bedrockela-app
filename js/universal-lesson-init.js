// Universal Lesson Initialization
// Works for ALL lesson types: regular lessons, assessments, vocab-only pages
// GUARANTEED to initialize properly or show error instead of blue screen

(function() {
  'use strict';
  
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLesson);
  } else {
    initLesson();
  }
  
  function initLesson() {
    // Detect lesson type and initialize appropriately
    const lessonType = detectLessonType();
    
    console.log('🎓 BedrockELA Lesson Initializing:', lessonType);
    
    try {
      switch(lessonType) {
        case 'standard':
          initStandardLesson();
          break;
        case 'assessment-vocab':
          initVocabAssessment();
          break;
        case 'assessment-standard':
          initStandardAssessment();
          break;
        default:
          initFallback();
      }
    } catch (error) {
      console.error('❌ Lesson initialization failed:', error);
      showErrorScreen(error);
    }
  }
  
  function detectLessonType() {
    // Check for lesson-page class (standard lessons)
    if (document.querySelector('.lesson-page')) {
      return 'standard';
    }
    
    // Check for word-page class (vocab assessments)
    if (document.querySelector('.word-page')) {
      return 'assessment-vocab';
    }
    
    // Check for assessment-page class
    if (document.querySelector('.assessment-page')) {
      return 'assessment-standard';
    }
    
    // Unknown type
    return 'unknown';
  }
  
  function initStandardLesson() {
    // Standard lesson with .lesson-page divs
    const pages = document.querySelectorAll('.lesson-page');
    if (pages.length === 0) {
      throw new Error('No .lesson-page elements found');
    }
    
    let currentPage = 1;
    const totalPages = pages.length;
    
    function showPage(pageNum) {
      // Hide all pages
      pages.forEach(p => p.classList.remove('active'));
      
      // Show target page
      const targetPage = pages[pageNum - 1];
      if (targetPage) {
        targetPage.classList.add('active');
      }
      
      // Update navigation
      updateNavigation(pageNum, totalPages);
      currentPage = pageNum;
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Expose navigation functions globally
    window.nextPage = () => { if (currentPage < totalPages) showPage(currentPage + 1); };
    window.previousPage = () => { if (currentPage > 1) showPage(currentPage - 1); };
    window.showPage = showPage;
    
    // Initialize first page
    showPage(1);
    
    console.log(`✅ Standard lesson initialized: ${totalPages} pages`);
  }
  
  function initVocabAssessment() {
    // Vocab assessment with .word-page divs (one word per page)
    const wordPages = document.querySelectorAll('.word-page');
    if (wordPages.length === 0) {
      throw new Error('No .word-page elements found');
    }
    
    // Show first word, hide rest
    wordPages.forEach((page, idx) => {
      if (idx === 0) {
        page.style.display = 'block';
      } else {
        page.style.display = 'none';
      }
    });
    
    // Show completion page if it exists
    const completion = document.querySelector('.completion-page');
    if (completion) {
      completion.style.display = 'none';
    }
    
    console.log(`✅ Vocab assessment initialized: ${wordPages.length} words`);
  }
  
  function initStandardAssessment() {
    // Standard assessment with numbered pages
    const pages = document.querySelectorAll('.assessment-page');
    if (pages.length === 0) {
      throw new Error('No .assessment-page elements found');
    }
    
    let currentPage = 1;
    const totalPages = pages.length;
    
    function showPage(pageNum) {
      pages.forEach(p => p.classList.remove('active'));
      const targetPage = pages[pageNum - 1];
      if (targetPage) {
        targetPage.classList.add('active');
      }
      updateNavigation(pageNum, totalPages);
      currentPage = pageNum;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    window.nextPage = () => { if (currentPage < totalPages) showPage(currentPage + 1); };
    window.previousPage = () => { if (currentPage > 1) showPage(currentPage - 1); };
    window.showPage = showPage;
    
    showPage(1);
    console.log(`✅ Standard assessment initialized: ${totalPages} pages`);
  }
  
  function initFallback() {
    // Fallback for unknown lesson types
    console.warn('⚠️ Unknown lesson type, using fallback initialization');
    
    // Try to show ANY content div
    const contentDivs = document.querySelectorAll('div[class*="page"]');
    if (contentDivs.length > 0) {
      contentDivs[0].style.display = 'block';
      console.log('✅ Fallback: showing first content div');
    } else {
      // Last resort: show the body
      document.body.style.display = 'block';
      document.body.style.backgroundColor = '#fff';
      console.log('✅ Fallback: body visible');
    }
  }
  
  function updateNavigation(currentPage, totalPages) {
    // Update prev/next buttons if they exist
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const pageIndicator = document.getElementById('pageIndicator');
    
    if (prevBtn) prevBtn.disabled = (currentPage === 1);
    if (nextBtn) nextBtn.disabled = (currentPage === totalPages);
    
    if (progressBar) {
      const progress = (currentPage / totalPages) * 100;
      progressBar.style.width = progress + '%';
    }
    
    if (pageIndicator) {
      pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    }
  }
  
  function showErrorScreen(error) {
    // Instead of blue screen, show helpful error message
    document.body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #fff; font-family: sans-serif; padding: 20px;">
        <div style="max-width: 600px; text-align: center;">
          <div style="font-size: 4rem; margin-bottom: 20px;">⚠️</div>
          <h1 style="color: #9E2C21; margin-bottom: 15px;">Lesson Loading Error</h1>
          <p style="color: #666; margin-bottom: 20px;">This lesson failed to initialize properly.</p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 0.9em; color: #333; text-align: left;">
            ${error.message || 'Unknown error'}
          </p>
          <button onclick="location.reload()" style="margin-top: 20px; padding: 12px 24px; background: #305853; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">
            🔄 Reload Page
          </button>
          <a href="student-dashboard.html" style="display: inline-block; margin-top: 15px; margin-left: 15px; padding: 12px 24px; background: #B06821; color: white; border-radius: 8px; text-decoration: none; font-size: 16px;">
            ← Back to Dashboard
          </a>
        </div>
      </div>
    `;
  }
  
})();

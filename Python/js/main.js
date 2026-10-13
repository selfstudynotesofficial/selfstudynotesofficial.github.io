/**
 * Main JavaScript & jQuery interactivity for Python Mastery Static Website
 */

// Global state variables accessible immediately from inline HTML attributes
window.activeSampleTab = 0;
window.activeModalIndex = 0;
window.activeTestimonialIndex = 0;

// Early definitions so buttons work even if clicked before window load
window.openSqlModal = function (initialIndex) {
  if (typeof initialIndex === 'undefined' || initialIndex === null || isNaN(initialIndex)) {
    initialIndex = window.activeSampleTab || 0;
  }
  window.activeModalIndex = parseInt(initialIndex, 10) || 0;
  if (window.renderModalContent) {
    window.renderModalContent();
  }
  $('#sql-preview-modal').removeClass('hidden').addClass('flex show');
  $('body').addClass('overflow-hidden');
  if (window.mainViewer && window.mainViewer.showHint) {
    window.mainViewer.showHint();
  }
};
window.openPythonModal = window.openSqlModal;

window.closeSqlModal = function () {
  $('#sql-preview-modal').addClass('hidden').removeClass('flex show');
  $('body').removeClass('overflow-hidden');
  $('#modal-notes-drawer').addClass('translate-y-full').removeClass('translate-y-0');
  if (window.mainViewer && window.mainViewer.reset) {
    window.mainViewer.reset(false);
  }
};
window.closePythonModal = window.closeSqlModal;

window.setModalIndex = function (index) {
  window.activeModalIndex = parseInt(index, 10) || 0;
  if (window.renderModalContent) {
    window.renderModalContent();
  }
};


$(document).ready(function () {
  // ==========================================
  // 1. Sticky Header on Scroll
  // ==========================================
  $(window).on('scroll', function () {
    const scrollY = $(this).scrollTop();
    if (scrollY > 40) {
      $('#site-header')
        .addClass('bg-[#EBAF87]/95 backdrop-blur-md shadow-md py-2.5 border-b border-[#D49F7B]')
        .removeClass('bg-[#EBAF87] py-3');
    } else {
      $('#site-header')
        .removeClass('bg-[#EBAF87]/95 backdrop-blur-md shadow-md py-2.5 border-b border-[#D49F7B]')
        .addClass('bg-[#EBAF87] py-3');
    }

    // Mobile sticky bottom bar visibility (> 400px)
    if (scrollY > 400) {
      $('#mobile-sticky-bar').removeClass('hidden').addClass('flex');
    } else {
      $('#mobile-sticky-bar').addClass('hidden').removeClass('flex');
    }
  });

  // ==========================================
  // 2. Mobile Drawer Navigation Toggle
  // ==========================================
  $('#mobile-menu-btn').on('click', function (e) {
    e.stopPropagation();
    const drawer = $('#mobile-drawer');
    const isHidden = drawer.hasClass('hidden');
    if (isHidden) {
      drawer.removeClass('hidden').addClass('animate-fadeIn');
      $(this).html('<i class="bi bi-x-lg text-lg"></i>');
    } else {
      drawer.addClass('hidden').removeClass('animate-fadeIn');
      $(this).html('<i class="bi bi-list text-lg"></i>');
    }
  });

  // Close mobile drawer when clicking any link
  $('#mobile-drawer a, #mobile-drawer button').on('click', function () {
    $('#mobile-drawer').addClass('hidden').removeClass('animate-fadeIn');
    $('#mobile-menu-btn').html('<i class="bi bi-list text-lg"></i>');
  });

  // Close mobile drawer when clicking outside
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#mobile-drawer, #mobile-menu-btn').length) {
      if (!$('#mobile-drawer').hasClass('hidden')) {
        $('#mobile-drawer').addClass('hidden').removeClass('animate-fadeIn');
        $('#mobile-menu-btn').html('<i class="bi bi-list text-lg"></i>');
      }
    }
  });

  // ==========================================
  // 3. Sample Showcase Tab Switcher
  // ==========================================
  function updateSampleShowcase(index) {
    window.activeSampleTab = index;
    if (typeof PRODUCT_CONFIG === 'undefined' || !PRODUCT_CONFIG.sqlSamples) return;
    const sample = PRODUCT_CONFIG.sqlSamples[index];
    if (!sample) return;

    // Update Tab buttons active state
    $('.sample-tab-btn').each(function () {
      const idx = parseInt($(this).data('index'), 10);
      if (idx === index) {
        $(this)
          .addClass('bg-[#7C2928] text-white shadow-md scale-105 ring-2 ring-white/50')
          .removeClass('bg-white/90 text-[#1F1714]');
        $(this).find('.tab-icon').addClass('text-amber-300').removeClass('text-[#7C2928]');
        $(this).find('.tab-tag').addClass('bg-white/20 text-white').removeClass('bg-[#7C2928]/10 text-[#7C2928]');
      } else {
        $(this)
          .removeClass('bg-[#7C2928] text-white shadow-md scale-105 ring-2 ring-white/50')
          .addClass('bg-white/90 text-[#1F1714]');
        $(this).find('.tab-icon').removeClass('text-amber-300').addClass('text-[#7C2928]');
        $(this).find('.tab-tag').removeClass('bg-white/20 text-white').addClass('bg-[#7C2928]/10 text-[#7C2928]');
      }
    });

    // Update Thumbnails active state
    $('.sample-thumb-btn').each(function () {
      const idx = parseInt($(this).data('index'), 10);
      if (idx === index) {
        $(this)
          .addClass('border-[#7C2928] ring-2 ring-[#7C2928] scale-105 opacity-100')
          .removeClass('border-white/80 opacity-80');
      } else {
        $(this)
          .removeClass('border-[#7C2928] ring-2 ring-[#7C2928] scale-105 opacity-100')
          .addClass('border-white/80 opacity-80');
      }
    });

    // Update Note Sheet Card Elements
    $('#sample-sheet-badge').text(sample.badge);
    $('#sample-sheet-page-indicator').text(`PAGE ${index + 1} OF ${PRODUCT_CONFIG.sqlSamples.length}`);
    $('#sample-sheet-img').attr('src', sample.image).attr('alt', sample.sub);

    // Update Right Details
    $('#sample-details-badge').text(sample.badge);
    $('#sample-details-title').text(sample.sub);

    // Update bullets list
    const bulletsHtml = sample.bullets
      .map(
        (b) => `
      <div class="flex items-start gap-3 bg-white/70 p-3 rounded-xl border border-[#E2BEA2]/60 shadow-sm">
        <i class="bi bi-check-circle-fill text-[#7C2928] text-lg shrink-0 mt-0.5"></i>
        <span class="text-xs sm:text-sm font-bold text-[#2D201A] leading-relaxed">
          ${b}
        </span>
      </div>
    `
      )
      .join('');
    $('#sample-details-bullets').html(bulletsHtml);
  }

  // Tab click updates showcase
  $(document).on('click', '.sample-tab-btn', function () {
    const idx = parseInt($(this).data('index'), 10);
    updateSampleShowcase(idx);
  });

  // Thumbnail click updates showcase AND immediately opens complete high-resolution sheet
  $(document).on('click', '.sample-thumb-btn', function () {
    const idx = parseInt($(this).data('index'), 10);
    updateSampleShowcase(idx);
    window.openSqlModal(idx);
    hideHoverPreview();
  });

  // Thumbnail horizontal scroll buttons
  $('#thumb-scroll-left').on('click', function () {
    const container = document.getElementById('sample-thumbs-container');
    if (container) {
      container.scrollBy({ left: -220, behavior: 'smooth' });
    }
  });

  $('#thumb-scroll-right').on('click', function () {
    const container = document.getElementById('sample-thumbs-container');
    if (container) {
      container.scrollBy({ left: 220, behavior: 'smooth' });
    }
  });

  // Desktop Hover Zoom Preview
  function showHoverPreview(element, idx) {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (typeof PRODUCT_CONFIG === 'undefined' || !PRODUCT_CONFIG.sqlSamples) return;
    const sample = PRODUCT_CONFIG.sqlSamples[idx];
    if (!sample) return;

    $('#hover-preview-badge').text(`Sheet ${idx + 1}  -  ${sample.tag || ''}`);
    $('#hover-preview-title').text(sample.sub || sample.title);
    $('#hover-preview-img').attr('src', sample.image).attr('alt', sample.title);

    const preview = $('#thumb-hover-preview');
    preview.removeClass('hidden');

    const rect = element.getBoundingClientRect();
    const previewHeight = preview.outerHeight() || 320;
    const previewWidth = preview.outerWidth() || 260;

    let left = rect.left + rect.width / 2;
    left = Math.max(previewWidth / 2 + 12, Math.min(window.innerWidth - previewWidth / 2 - 12, left));

    let top = rect.top - previewHeight - 12;
    if (top < 10) {
      top = rect.bottom + 12;
    }

    preview.css({
      top: `${top}px`,
      left: `${left}px`
    });

    updateSampleShowcase(idx);
  }

  function hideHoverPreview() {
    $('#thumb-hover-preview').addClass('hidden');
  }

  $(document).on('mouseenter', '.sample-thumb-btn', function () {
    const idx = parseInt($(this).data('index'), 10);
    showHoverPreview(this, idx);
  });

  $(document).on('mouseleave', '.sample-thumb-btn', function () {
    hideHoverPreview();
  });

  // Initial tab setup
  updateSampleShowcase(0);

  // ==========================================
  // 4. Interactive Zoom & Pan Engine & Modal Viewer
  // ==========================================
  function createZoomPanViewer(cfg) {
    const viewport = document.getElementById(cfg.viewportId);
    const target = document.getElementById(cfg.targetId);
    const img = document.getElementById(cfg.imgId);
    const badge = document.getElementById(cfg.badgeId);
    const hint = cfg.hintId ? document.getElementById(cfg.hintId) : null;

    if (!viewport || !target || !img) return null;

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    const minScale = 1;
    const maxScale = 4;
    let isReadMode = false;

    // Touch tracking
    let isDragging = false;
    let isPinching = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let dragStartX = 0;
    let dragStartY = 0;

    let pinchStartDist = 0;
    let pinchStartScale = 1;

    // Double-tap tracking
    let lastTapTime = 0;
    let lastTapX = 0;
    let lastTapY = 0;

    // Mouse drag tracking
    let isMouseDown = false;
    let mouseStartX = 0;
    let mouseStartY = 0;
    let mouseDragStartX = 0;
    let mouseDragStartY = 0;

    let hintTimeout = null;

    function showHint() {
      if (!hint) return;
      hint.classList.remove('opacity-0', 'pointer-events-none');
      hint.classList.add('opacity-95');
      if (hintTimeout) clearTimeout(hintTimeout);
      hintTimeout = setTimeout(() => {
        hideHint();
      }, 3400);
    }

    function hideHint() {
      if (!hint) return;
      hint.classList.add('opacity-0', 'pointer-events-none');
      hint.classList.remove('opacity-95');
      if (hintTimeout) clearTimeout(hintTimeout);
    }

    function clampOffsets() {
      const vpW = viewport.clientWidth;
      const vpH = viewport.clientHeight;
      const naturalW = img.offsetWidth || 320;
      const naturalH = img.offsetHeight || 420;

      const scaledW = naturalW * scale;
      const scaledH = naturalH * scale;

      if (scaledW <= vpW) {
        translateX = 0;
      } else {
        const maxTx = (scaledW - vpW) / 2 + 25;
        translateX = Math.max(-maxTx, Math.min(maxTx, translateX));
      }

      if (scaledH <= vpH) {
        translateY = 0;
      } else {
        const maxTy = (scaledH - vpH) / 2 + 25;
        translateY = Math.max(-maxTy, Math.min(maxTy, translateY));
      }
    }

    function applyTransform(animate) {
      if (animate) {
        target.classList.add('animating');
      } else {
        target.classList.remove('animating');
      }
      target.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;

      if (badge) {
        if (isReadMode) {
          badge.textContent = 'Fit Screen';
        } else if (scale > 1.05) {
          badge.textContent = `${Math.round(scale * 100)}%`;
        } else {
          badge.textContent = 'Read Mode';
        }
      }

      // Auto-dim nav arrows when zoomed in to maximize screen readability
      if (cfg.arrowSelector) {
        const arrows = $(cfg.arrowSelector);
        if (scale > 1.1) {
          arrows.addClass('opacity-25 hover:opacity-100');
        } else {
          arrows.removeClass('opacity-25 hover:opacity-100');
        }
      }
    }

    function zoomTo(targetScale, focalX, focalY, animate) {
      targetScale = Math.max(minScale, Math.min(maxScale, targetScale));
      hideHint();

      if (targetScale === 1) {
        scale = 1;
        translateX = 0;
        translateY = 0;
        isReadMode = false;
      } else {
        const vpRect = viewport.getBoundingClientRect();
        if (typeof focalX === 'undefined') focalX = vpRect.width / 2;
        if (typeof focalY === 'undefined') focalY = vpRect.height / 2;

        const relX = focalX - vpRect.width / 2;
        const relY = focalY - vpRect.height / 2;
        const factor = targetScale / scale;

        translateX = relX - (relX - translateX) * factor;
        translateY = relY - (relY - translateY) * factor;
        scale = targetScale;
      }

      clampOffsets();
      applyTransform(animate !== false);
    }

    function toggleReadMode() {
      hideHint();
      if (scale > 1.2 || isReadMode) {
        reset(true);
      } else {
        const vpW = viewport.clientWidth;
        const imgW = img.offsetWidth || 300;
        // Optimal scale to fill mobile width crisp & clear
        const fitWidthScale = Math.max(1.85, Math.min(3.0, (vpW / imgW) * 0.98));
        scale = fitWidthScale;
        isReadMode = true;

        const vpH = viewport.clientHeight;
        const naturalH = img.offsetHeight || 420;
        const scaledH = naturalH * scale;
        translateX = 0;
        if (scaledH > vpH) {
          // Align near the top of the sheet so user can read down from the header
          translateY = (scaledH - vpH) / 2 - 15;
        } else {
          translateY = 0;
        }

        clampOffsets();
        applyTransform(true);
      }
    }

    function zoomIn() {
      zoomTo(scale + 0.5, undefined, undefined, true);
    }

    function zoomOut() {
      zoomTo(scale - 0.5, undefined, undefined, true);
    }

    function reset(animate) {
      scale = 1;
      translateX = 0;
      translateY = 0;
      isReadMode = false;
      clampOffsets();
      applyTransform(animate !== false);
    }

    // Double-tap handler
    function handleTap(clientX, clientY) {
      const now = Date.now();
      const vpRect = viewport.getBoundingClientRect();
      const tapX = clientX - vpRect.left;
      const tapY = clientY - vpRect.top;

      if (now - lastTapTime < 340 && Math.hypot(tapX - lastTapX, tapY - lastTapY) < 40) {
        hideHint();
        if (scale > 1.2) {
          reset(true);
        } else {
          zoomTo(2.4, tapX, tapY, true);
        }
        lastTapTime = 0;
        return true;
      }
      lastTapTime = now;
      lastTapX = tapX;
      lastTapY = tapY;
      return false;
    }

    // Touch event listeners
    viewport.addEventListener('touchstart', function (e) {
      hideHint();
      if (e.touches.length === 2) {
        isPinching = true;
        isDragging = false;
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        pinchStartDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        pinchStartScale = scale;
      } else if (e.touches.length === 1) {
        isDragging = true;
        isPinching = false;
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        dragStartX = translateX;
        dragStartY = translateY;
        handleTap(t.clientX, t.clientY);
      }
    }, { passive: true });

    viewport.addEventListener('touchmove', function (e) {
      if (isPinching && e.touches.length === 2) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        if (pinchStartDist > 0) {
          const ratio = dist / pinchStartDist;
          scale = Math.max(minScale, Math.min(maxScale, pinchStartScale * ratio));
          isReadMode = false;
          clampOffsets();
          applyTransform(false);
        }
      } else if (isDragging && e.touches.length === 1) {
        const t = e.touches[0];
        const dx = t.clientX - touchStartX;
        const dy = t.clientY - touchStartY;

        if (scale > 1.05) {
          // Pan image smoothly when zoomed in
          translateX = dragStartX + dx;
          translateY = dragStartY + dy;
          clampOffsets();
          applyTransform(false);
        }
      }
    }, { passive: true });

    viewport.addEventListener('touchend', function (e) {
      if (isDragging && e.changedTouches && e.changedTouches.length === 1) {
        const t = e.changedTouches[0];
        const diffX = t.clientX - touchStartX;
        const diffY = t.clientY - touchStartY;

        if (scale <= 1.05) {
          // Swipe to change sheets when at normal 1x scale
          if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.2) {
            if (diffX < 0 && cfg.onNext) {
              cfg.onNext();
            } else if (diffX > 0 && cfg.onPrev) {
              cfg.onPrev();
            }
          }
        } else {
          clampOffsets();
          applyTransform(true);
        }
      }
      isDragging = false;
      isPinching = false;
    }, { passive: true });

    // Mouse wheel zoom
    viewport.addEventListener('wheel', function (e) {
      e.preventDefault();
      hideHint();
      const vpRect = viewport.getBoundingClientRect();
      const delta = e.deltaY < 0 ? 0.35 : -0.35;
      zoomTo(scale + delta, e.clientX - vpRect.left, e.clientY - vpRect.top, true);
    }, { passive: false });

    // Mouse drag pan
    viewport.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      hideHint();
      if (handleTap(e.clientX, e.clientY)) return;

      if (scale > 1.05) {
        isMouseDown = true;
        mouseStartX = e.clientX;
        mouseStartY = e.clientY;
        mouseDragStartX = translateX;
        mouseDragStartY = translateY;
      }
    });

    window.addEventListener('mousemove', function (e) {
      if (!isMouseDown) return;
      const dx = e.clientX - mouseStartX;
      const dy = e.clientY - mouseStartY;
      translateX = mouseDragStartX + dx;
      translateY = mouseDragStartY + dy;
      clampOffsets();
      applyTransform(false);
    });

    window.addEventListener('mouseup', function () {
      if (isMouseDown) {
        isMouseDown = false;
        clampOffsets();
        applyTransform(true);
      }
    });

    return {
      zoomIn,
      zoomOut,
      toggleReadMode,
      reset,
      showHint,
      hideHint,
      getScale: () => scale
    };
  }

  // Initialize main sample viewer
  window.mainViewer = createZoomPanViewer({
    viewportId: 'modal-viewport',
    targetId: 'modal-img-container',
    imgId: 'modal-img',
    badgeId: 'modal-zoom-badge',
    hintId: 'modal-gesture-hint',
    arrowSelector: '#modal-prev-btn, #modal-next-btn',
    onPrev: () => $('#modal-prev-btn').trigger('click'),
    onNext: () => $('#modal-next-btn').trigger('click')
  });

  // Global triggers for modal toolbar buttons
  window.modalZoomIn = () => window.mainViewer && window.mainViewer.zoomIn();
  window.modalZoomOut = () => window.mainViewer && window.mainViewer.zoomOut();
  window.toggleModalReadMode = () => window.mainViewer && window.mainViewer.toggleReadMode();
  window.modalResetZoom = () => window.mainViewer && window.mainViewer.reset(true);

  // Interactive Slide-Up Notes Drawer Toggle
  window.toggleModalNotes = function () {
    const drawer = $('#modal-notes-drawer');
    const isHidden = drawer.hasClass('translate-y-full');
    if (isHidden) {
      if (typeof PRODUCT_CONFIG !== 'undefined' && PRODUCT_CONFIG.sqlSamples) {
        const sample = PRODUCT_CONFIG.sqlSamples[window.activeModalIndex];
        if (sample) {
          $('#drawer-title').text(sample.sub || sample.title);
          $('#drawer-tag-badge').text(sample.tag || 'KEY CONCEPTS');
          const bulletsHtml = (sample.bullets || []).map((b) => `
            <div class="flex items-start gap-2.5 bg-white/10 p-2.5 rounded-xl border border-white/10 shadow-sm">
              <i class="bi bi-check-circle-fill text-amber-300 text-sm shrink-0 mt-0.5"></i>
              <span class="text-xs font-semibold text-neutral-100 leading-snug">${b}</span>
            </div>
          `).join('');
          $('#drawer-bullets-list').html(bulletsHtml);
        }
      }
      drawer.removeClass('translate-y-full').addClass('translate-y-0');
    } else {
      drawer.addClass('translate-y-full').removeClass('translate-y-0');
    }
  };

  // Render Modal Content
  window.renderModalContent = function () {
    if (typeof PRODUCT_CONFIG === 'undefined' || !PRODUCT_CONFIG.sqlSamples) return;
    const totalSamples = PRODUCT_CONFIG.sqlSamples.length;
    if (window.activeModalIndex < 0) window.activeModalIndex = totalSamples - 1;
    if (window.activeModalIndex >= totalSamples) window.activeModalIndex = 0;

    const sample = PRODUCT_CONFIG.sqlSamples[window.activeModalIndex];
    if (!sample) return;

    $('#modal-title').text(sample.title);
    $('#modal-subtitle').text(`Sample ${window.activeModalIndex + 1} of ${totalSamples}  -  Practical Visual Notes`);
    $('#modal-counter-badge').text(`${window.activeModalIndex + 1} / ${totalSamples}`);
    $('#modal-img').attr('src', sample.image).attr('alt', sample.title);

    // Update Progress Indicator Bar
    const progressPercent = Math.round(((window.activeModalIndex + 1) / totalSamples) * 100);
    $('#modal-progress-bar').css('width', `${progressPercent}%`);

    // Reset zoom viewer for new page
    if (window.mainViewer) {
      window.mainViewer.reset(false);
      window.mainViewer.showHint();
    }

    // Refresh notes drawer content if currently open
    if ($('#modal-notes-drawer').hasClass('translate-y-0')) {
      $('#drawer-title').text(sample.sub || sample.title);
      $('#drawer-tag-badge').text(sample.tag || 'KEY CONCEPTS');
      const bulletsHtml = (sample.bullets || []).map((b) => `
        <div class="flex items-start gap-2.5 bg-white/10 p-2.5 rounded-xl border border-white/10 shadow-sm">
          <i class="bi bi-check-circle-fill text-amber-300 text-sm shrink-0 mt-0.5"></i>
          <span class="text-xs font-semibold text-neutral-100 leading-snug">${b}</span>
        </div>
      `).join('');
      $('#drawer-bullets-list').html(bulletsHtml);
    }

    // Render Page Pill buttons in modal footer
    let pillsHtml = '';
    PRODUCT_CONFIG.sqlSamples.forEach((s, idx) => {
      const isActive = idx === window.activeModalIndex;
      pillsHtml += `
        <button
          type="button"
          data-page-index="${idx}"
          class="modal-pill-btn px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer min-h-[32px] flex items-center ${
            isActive
              ? 'bg-[#7C2928] text-white shadow-md ring-2 ring-[#7C2928]/30 scale-105'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }">
          Page ${idx + 1}
        </button>
      `;
    });
    $('#modal-page-pills').html(pillsHtml);

    // Scroll active pill into view smoothly
    const $activePill = $('#modal-page-pills').find('[data-page-index="' + window.activeModalIndex + '"]');
    if ($activePill.length && $activePill[0].scrollIntoView) {
      $activePill[0].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  // Delegated click for modal page pills
  $(document).on('click', '.modal-pill-btn', function () {
    const idx = parseInt($(this).data('page-index'), 10);
    window.setModalIndex(idx);
  });

  $('#modal-prev-btn').on('click', function (e) {
    e.stopPropagation();
    const total = (PRODUCT_CONFIG && PRODUCT_CONFIG.sqlSamples) ? PRODUCT_CONFIG.sqlSamples.length : 8;
    window.activeModalIndex = window.activeModalIndex === 0 ? total - 1 : window.activeModalIndex - 1;
    window.renderModalContent();
  });

  $('#modal-next-btn').on('click', function (e) {
    e.stopPropagation();
    const total = (PRODUCT_CONFIG && PRODUCT_CONFIG.sqlSamples) ? PRODUCT_CONFIG.sqlSamples.length : 8;
    window.activeModalIndex = window.activeModalIndex === total - 1 ? 0 : window.activeModalIndex + 1;
    window.renderModalContent();
  });

  // Keyboard navigation for modal
  $(document).on('keydown', function (e) {
    if (!$('#sql-preview-modal').hasClass('hidden')) {
      if (e.key === 'Escape') {
        window.closeSqlModal();
      } else if (e.key === 'ArrowLeft') {
        $('#modal-prev-btn').trigger('click');
      } else if (e.key === 'ArrowRight') {
        $('#modal-next-btn').trigger('click');
      }
    }
  });

  // Backdrop click to close
  $('#sql-preview-modal').on('click', function (e) {
    if (e.target === this) {
      window.closeSqlModal();
    }
  });

  // Initialize offer modal viewer as well
  window.offerViewer = createZoomPanViewer({
    viewportId: 'offer-modal-viewport',
    targetId: 'offer-modal-img-container',
    imgId: 'offer-modal-img',
    badgeId: 'offer-zoom-badge',
    onPrev: () => window.changeOfferSheetModal && window.changeOfferSheetModal(-1),
    onNext: () => window.changeOfferSheetModal && window.changeOfferSheetModal(1)
  });

  window.offerModalZoomIn = () => window.offerViewer && window.offerViewer.zoomIn();
  window.offerModalZoomOut = () => window.offerViewer && window.offerViewer.zoomOut();
  window.toggleOfferReadMode = () => window.offerViewer && window.offerViewer.toggleReadMode();
  window.offerModalResetZoom = () => window.offerViewer && window.offerViewer.reset(true);


  // ==========================================
  // 5. Testimonials Handling
  // ==========================================
  function updateTestimonial(index) {
    window.activeTestimonialIndex = index;
    if (typeof PRODUCT_CONFIG === 'undefined' || !PRODUCT_CONFIG.testimonials) return;
    const item = PRODUCT_CONFIG.testimonials[index];
    if (!item) return;

    if ($('#testimonial-avatar').length) {
      if (item.avatar) {
        $('#testimonial-avatar').attr('src', item.avatar).attr('alt', item.name).removeClass('hidden');
        $('#testimonial-initials').addClass('hidden');
      } else {
        $('#testimonial-avatar').addClass('hidden');
        $('#testimonial-initials').text(item.initials || 'ST').removeClass('hidden');
      }
    }
    if ($('#testimonial-name').length) $('#testimonial-name').text(item.name);
    if ($('#testimonial-role').length) $('#testimonial-role').text(item.role || '');
    if ($('#testimonial-quote').length) $('#testimonial-quote').html(`&ldquo;${item.quote}&rdquo;`);

    // Dots indicator
    $('.testimonial-dot').each(function () {
      const idx = parseInt($(this).data('index'), 10);
      if (idx === index) {
        $(this).addClass('bg-[#7C2928] w-6').removeClass('bg-[#1F1714]/30 w-2.5');
      } else {
        $(this).removeClass('bg-[#7C2928] w-6').addClass('bg-[#1F1714]/30 w-2.5');
      }
    });
  }

  $('#testimonial-prev').on('click', function () {
    if (typeof PRODUCT_CONFIG === 'undefined' || !PRODUCT_CONFIG.testimonials) return;
    const total = PRODUCT_CONFIG.testimonials.length;
    window.activeTestimonialIndex = window.activeTestimonialIndex === 0 ? total - 1 : window.activeTestimonialIndex - 1;
    updateTestimonial(window.activeTestimonialIndex);
  });

  $('#testimonial-next').on('click', function () {
    if (typeof PRODUCT_CONFIG === 'undefined' || !PRODUCT_CONFIG.testimonials) return;
    const total = PRODUCT_CONFIG.testimonials.length;
    window.activeTestimonialIndex = window.activeTestimonialIndex === total - 1 ? 0 : window.activeTestimonialIndex + 1;
    updateTestimonial(window.activeTestimonialIndex);
  });

  $(document).on('click', '.testimonial-dot', function () {
    const idx = parseInt($(this).data('index'), 10);
    updateTestimonial(idx);
  });

  // ==========================================
  // 6. FAQ Accordion Toggle
  // ==========================================
  $('.faq-trigger').on('click', function () {
    const item = $(this).closest('.faq-item');
    const body = item.find('.faq-body');
    const icon = $(this).find('.faq-arrow');

    // Toggle current
    if (body.is(':visible')) {
      body.slideUp(200);
      icon.removeClass('bi-arrow-down text-[#7C2928]').addClass('bi-arrow-right text-[#1F1714]');
    } else {
      // Close other accordions
      $('.faq-body').slideUp(200);
      $('.faq-arrow').removeClass('bi-arrow-down text-[#7C2928]').addClass('bi-arrow-right text-[#1F1714]');

      body.slideDown(200);
      icon.removeClass('bi-arrow-right text-[#1F1714]').addClass('bi-arrow-down text-[#7C2928]');
    }
  });

  // ==========================================
  // 7. Contact Form Handling
  // ==========================================
  $('#contact-form').on('submit', function (e) {
    e.preventDefault();
    $('#contact-form-container').addClass('hidden');
    $('#contact-success-msg').removeClass('hidden');
  });
});

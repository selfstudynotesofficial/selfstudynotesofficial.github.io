/**
 * Main JavaScript & jQuery interactivity for SQL Mastery Static Website
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
};

window.closeSqlModal = function () {
  $('#sql-preview-modal').addClass('hidden').removeClass('flex show');
  $('body').removeClass('overflow-hidden');
};

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

    $('#hover-preview-badge').text(`Sheet ${idx + 1} • ${sample.tag || ''}`);
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
  // 4. SQL Preview Modal Viewer
  // ==========================================
  window.renderModalContent = function () {
    if (typeof PRODUCT_CONFIG === 'undefined' || !PRODUCT_CONFIG.sqlSamples) return;
    const totalSamples = PRODUCT_CONFIG.sqlSamples.length;
    if (window.activeModalIndex < 0) window.activeModalIndex = totalSamples - 1;
    if (window.activeModalIndex >= totalSamples) window.activeModalIndex = 0;

    const sample = PRODUCT_CONFIG.sqlSamples[window.activeModalIndex];
    if (!sample) return;

    $('#modal-title').text(sample.title);
    $('#modal-subtitle').text(`Sample ${window.activeModalIndex + 1} of ${totalSamples} — Practical Visual Notes`);
    $('#modal-counter-badge').text(`${window.activeModalIndex + 1} / ${totalSamples}`);
    $('#modal-img').attr('src', sample.image).attr('alt', sample.title);

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
              ? 'bg-[#7C2928] text-white shadow-md ring-2 ring-[#7C2928]/30'
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
    const total = (PRODUCT_CONFIG && PRODUCT_CONFIG.sqlSamples) ? PRODUCT_CONFIG.sqlSamples.length : 7;
    window.activeModalIndex = window.activeModalIndex === 0 ? total - 1 : window.activeModalIndex - 1;
    window.renderModalContent();
  });

  $('#modal-next-btn').on('click', function (e) {
    e.stopPropagation();
    const total = (PRODUCT_CONFIG && PRODUCT_CONFIG.sqlSamples) ? PRODUCT_CONFIG.sqlSamples.length : 7;
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

  // Mobile touch swipe gestures for preview modal
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const modalElement = document.getElementById('sql-preview-modal');
  if (modalElement) {
    modalElement.addEventListener('touchstart', function (e) {
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    modalElement.addEventListener('touchend', function (e) {
      if (e.changedTouches && e.changedTouches.length === 1) {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        // Trigger only if horizontal swipe is significant and dominant
        if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.2) {
          if (diffX < 0) {
            // Swiped left -> Next sample
            $('#modal-next-btn').trigger('click');
          } else {
            // Swiped right -> Previous sample
            $('#modal-prev-btn').trigger('click');
          }
        }
      }
    }, { passive: true });
  }

  // ==========================================
  // 5. Testimonials Handling
  // ==========================================
  function updateTestimonial(index) {
    window.activeTestimonialIndex = index;
    if (typeof PRODUCT_CONFIG === 'undefined' || !PRODUCT_CONFIG.testimonials) return;
    const item = PRODUCT_CONFIG.testimonials[index];
    if (!item) return;

    if ($('#testimonial-avatar').length) $('#testimonial-avatar').attr('src', item.avatar).attr('alt', item.name);
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

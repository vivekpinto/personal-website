/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Vanilla JS implementation for the portfolio
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const dialogCloseButtons = document.querySelectorAll('[data-dialog-close]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const chatbot = document.querySelector('.chatbot');
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotPanel = document.getElementById('chatbot-panel');
  const chatbotLauncherMove = document.getElementById('chatbot-launcher-move');
  const chatbotMove = document.getElementById('chatbot-move');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotForm = document.getElementById('chatbot-form');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotChips = document.querySelectorAll('[data-chat-question]');
  const chatbotDragHandles = document.querySelectorAll('[data-chatbot-drag-handle]');
  const chatbotPositionCycleButtons = document.querySelectorAll('[data-chatbot-position-cycle]');
  const chatbotTooltipTriggers = document.querySelectorAll('[data-tooltip]');
  const chatbotPositionStatus = document.getElementById('chatbot-position-status');
  const chatbotTooltip = document.createElement('div');
  let previouslyFocusedElement = null;
  let previouslyFocusedChatbotElement = null;
  let chatbotPosition = { x: 0, y: 0 };
  let chatbotDragState = null;
  let chatbotDockIndex = 0;
  let suppressChatbotPositionCycleClick = false;
  let activeTooltipTrigger = null;
  let tooltipHideTimeout = null;
  let chatbotLayoutSyncFrame = null;
  const chatbotDockPositions = ['bottom-right', 'bottom-left', 'top-left', 'top-right'];

  chatbotTooltip.id = 'chatbot-move-tooltip';
  chatbotTooltip.className = 'chatbot-tooltip';
  chatbotTooltip.setAttribute('role', 'tooltip');
  chatbotTooltip.hidden = true;
  document.body.append(chatbotTooltip);

  const personalAnswers = {
    noticePeriod:
      'Currently, I am working with Zeus Learning as a QA Engineer and Accessibility Specialist. I am open to new opportunities and can join within 60 days of receiving an offer.',
    origin:
      'I am currently based in Mumbai, Maharashtra. My current work experience has also been centered around Mumbai and remote accessibility evaluation work. My permanent hometown is Nashik, where I grew up and completed my early education.',
    hobbies:
      'Outside work, I enjoy exploring reading about global and local politics. Also I follow various supports commentaries for cricket and Formula 1 races. I also like to experiment with new accessibility tools, learning different testing techniques, and working on small personal tech projects.',
    contact:
      'You can reach me at vivekpinto5@gmail.com, connect on LinkedIn at linkedin.com/in/vivekpinto2001, or view my GitHub at github.com/vivekpinto.',
    experience:
      'I am a QA Engineer and Accessibility Specialist with 2.5+ years of experience, focused on WCAG 2.2, assistive technology testing, Playwright automation, and accessible EdTech products.'
  };

  const chatbotResponses = [
    {
      keywords: ['notice', 'joining', 'join', 'available', 'availability'],
      answer: personalAnswers.noticePeriod
    },
    {
      keywords: ['from', 'come', 'hometown', 'native', 'based', 'location', 'where'],
      answer: personalAnswers.origin
    },
    {
      keywords: ['hobby', 'hobbies', 'interest', 'interests', 'free time', 'outside work'],
      answer: personalAnswers.hobbies
    },
    {
      keywords: ['email', 'contact', 'phone', 'linkedin', 'github', 'reach'],
      answer: personalAnswers.contact
    },
    {
      keywords: ['experience', 'skills', 'accessibility', 'qa', 'testing', 'automation', 'wcag'],
      answer: personalAnswers.experience
    },
    {
      keywords: ['hello', 'hi', 'hey'],
      answer: 'Hi! Ask me about Vivek\'s notice period, where he is from, hobbies, contact details, or QA/accessibility experience.'
    }
  ];

  const getFocusableElements = () => {
    if (!mobileMenu) {
      return [];
    }

    return Array.from(
      mobileMenu.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  };

  const openMobileMenu = () => {
    if (!menuToggle || !mobileMenu) {
      return;
    }

    previouslyFocusedElement = document.activeElement;
    mobileMenu.classList.remove('is-hidden');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('dialog-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');

    const focusableElements = getFocusableElements();
    focusableElements[0]?.focus();
  };

  const closeMobileMenu = () => {
    if (!menuToggle || !mobileMenu) {
      return;
    }

    mobileMenu.classList.add('is-hidden');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('dialog-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');

    if (previouslyFocusedElement instanceof HTMLElement) {
      previouslyFocusedElement.focus();
    }
  };

  const getChatbotFocusableElements = () => {
    if (!chatbotPanel || chatbotPanel.classList.contains('is-hidden')) {
      return [];
    }

    return Array.from(
      chatbotPanel.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  };

  const getClampedChatbotPosition = (nextX, nextY) => {
    if (!chatbot) {
      return { x: nextX, y: nextY };
    }

    const viewportMargin = 8;
    const chatbotRect = chatbot.getBoundingClientRect();
    const baseLeft = chatbotRect.left - chatbotPosition.x;
    const baseTop = chatbotRect.top - chatbotPosition.y;
    const minX = viewportMargin - baseLeft;
    const maxX = window.innerWidth - viewportMargin - chatbotRect.width - baseLeft;
    const minY = viewportMargin - baseTop;
    const maxY = window.innerHeight - viewportMargin - chatbotRect.height - baseTop;

    return {
      x: Math.min(Math.max(nextX, minX), maxX),
      y: Math.min(Math.max(nextY, minY), maxY)
    };
  };

  const updateChatbotPositionStatus = (message = 'Chatbot position updated.') => {
    if (!chatbotPositionStatus) {
      return;
    }

    chatbotPositionStatus.textContent = message;
  };

  const setChatbotPosition = (nextX, nextY, shouldAnnounce = false) => {
    if (!chatbot) {
      return;
    }

    chatbotPosition = getClampedChatbotPosition(nextX, nextY);
    chatbot.style.setProperty('--chatbot-x', `${chatbotPosition.x}px`);
    chatbot.style.setProperty('--chatbot-y', `${chatbotPosition.y}px`);

    if (shouldAnnounce) {
      updateChatbotPositionStatus();
    }

    repositionVisibleChatbotTooltip();
  };

  const resetChatbotPosition = (shouldAnnounce = false) => {
    setChatbotPosition(0, 0, shouldAnnounce);
  };

  const clampCurrentChatbotPosition = () => {
    setChatbotPosition(chatbotPosition.x, chatbotPosition.y);
  };

  const syncChatbotLayout = () => {
    chatbotLayoutSyncFrame = null;
    clampCurrentChatbotPosition();

    if (chatbotMessages) {
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    repositionVisibleChatbotTooltip();
  };

  const scheduleChatbotLayoutSync = () => {
    if (chatbotLayoutSyncFrame) {
      return;
    }

    chatbotLayoutSyncFrame = window.requestAnimationFrame(syncChatbotLayout);
  };

  const getChatbotDockPosition = (dockPosition) => {
    if (!chatbot) {
      return { x: 0, y: 0 };
    }

    const viewportMargin = 16;
    const chatbotRect = chatbot.getBoundingClientRect();
    const baseLeft = chatbotRect.left - chatbotPosition.x;
    const baseTop = chatbotRect.top - chatbotPosition.y;
    const dockCoordinates = {
      'bottom-right': {
        left: window.innerWidth - viewportMargin - chatbotRect.width,
        top: window.innerHeight - viewportMargin - chatbotRect.height
      },
      'bottom-left': {
        left: viewportMargin,
        top: window.innerHeight - viewportMargin - chatbotRect.height
      },
      'top-left': {
        left: viewportMargin,
        top: viewportMargin
      },
      'top-right': {
        left: window.innerWidth - viewportMargin - chatbotRect.width,
        top: viewportMargin
      }
    };
    const coordinates = dockCoordinates[dockPosition] || dockCoordinates['bottom-right'];

    return getClampedChatbotPosition(coordinates.left - baseLeft, coordinates.top - baseTop);
  };

  const moveChatbotToNextDockPosition = () => {
    chatbotDockIndex = (chatbotDockIndex + 1) % chatbotDockPositions.length;
    const dockPosition = chatbotDockPositions[chatbotDockIndex];
    const nextPosition = getChatbotDockPosition(dockPosition);
    const readablePosition = dockPosition.replace('-', ' ');

    setChatbotPosition(nextPosition.x, nextPosition.y);
    updateChatbotPositionStatus(`Chatbot moved to ${readablePosition}.`);
  };

  const clearTooltipHideTimeout = () => {
    if (tooltipHideTimeout) {
      window.clearTimeout(tooltipHideTimeout);
      tooltipHideTimeout = null;
    }
  };

  const setTooltipDescription = (trigger) => {
    const currentDescription = trigger.getAttribute('aria-describedby') || '';
    const descriptionIds = new Set(currentDescription.split(/\s+/).filter(Boolean));

    if (!Object.prototype.hasOwnProperty.call(trigger.dataset, 'originalDescribedby')) {
      trigger.dataset.originalDescribedby = currentDescription;
    }

    descriptionIds.add(chatbotTooltip.id);
    trigger.setAttribute('aria-describedby', Array.from(descriptionIds).join(' '));
  };

  const restoreTooltipDescription = (trigger) => {
    const originalDescription = trigger.dataset.originalDescribedby || '';

    if (originalDescription) {
      trigger.setAttribute('aria-describedby', originalDescription);
    } else {
      trigger.removeAttribute('aria-describedby');
    }

    delete trigger.dataset.originalDescribedby;
  };

  const positionChatbotTooltip = (trigger) => {
    const viewportMargin = 12;
    const tooltipGap = 12;
    const triggerRect = trigger.getBoundingClientRect();

    chatbotTooltip.hidden = false;
    chatbotTooltip.style.maxWidth = `${Math.min(272, window.innerWidth - viewportMargin * 2)}px`;
    chatbotTooltip.style.visibility = 'hidden';
    chatbotTooltip.classList.remove('chatbot-tooltip--top', 'chatbot-tooltip--bottom');

    const tooltipRect = chatbotTooltip.getBoundingClientRect();
    const hasRoomBelow = triggerRect.bottom + tooltipGap + tooltipRect.height <= window.innerHeight - viewportMargin;
    const hasRoomAbove = triggerRect.top - tooltipGap - tooltipRect.height >= viewportMargin;
    const placement = hasRoomBelow || !hasRoomAbove ? 'bottom' : 'top';
    const unclampedTop =
      placement === 'bottom'
        ? triggerRect.bottom + tooltipGap
        : triggerRect.top - tooltipGap - tooltipRect.height;
    const top = Math.min(
      Math.max(unclampedTop, viewportMargin),
      window.innerHeight - viewportMargin - tooltipRect.height
    );
    const unclampedLeft = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
    const left = Math.min(
      Math.max(unclampedLeft, viewportMargin),
      window.innerWidth - viewportMargin - tooltipRect.width
    );
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    const arrowLeft = Math.min(Math.max(triggerCenter - left, 16), tooltipRect.width - 16);

    chatbotTooltip.style.top = `${top}px`;
    chatbotTooltip.style.left = `${left}px`;
    chatbotTooltip.style.setProperty('--tooltip-arrow-left', `${arrowLeft}px`);
    chatbotTooltip.classList.add(`chatbot-tooltip--${placement}`);
    chatbotTooltip.style.visibility = '';
  };

  const showChatbotTooltip = (trigger) => {
    const tooltipText = trigger.getAttribute('data-tooltip');

    if (!tooltipText) {
      return;
    }

    clearTooltipHideTimeout();

    if (activeTooltipTrigger && activeTooltipTrigger !== trigger) {
      restoreTooltipDescription(activeTooltipTrigger);
    }

    activeTooltipTrigger = trigger;
    chatbotTooltip.textContent = tooltipText;
    setTooltipDescription(trigger);
    positionChatbotTooltip(trigger);

    window.requestAnimationFrame(() => {
      chatbotTooltip.classList.add('is-visible');
    });
  };

  const hideChatbotTooltip = () => {
    clearTooltipHideTimeout();
    chatbotTooltip.classList.remove('is-visible');
    chatbotTooltip.hidden = true;

    if (activeTooltipTrigger) {
      restoreTooltipDescription(activeTooltipTrigger);
      activeTooltipTrigger = null;
    }
  };

  const scheduleChatbotTooltipHide = () => {
    clearTooltipHideTimeout();
    tooltipHideTimeout = window.setTimeout(() => {
      const isTriggerHovered = activeTooltipTrigger?.matches(':hover');
      const isTriggerFocused = activeTooltipTrigger === document.activeElement;
      const isTooltipHovered = chatbotTooltip.matches(':hover');

      if (!isTriggerHovered && !isTriggerFocused && !isTooltipHovered) {
        hideChatbotTooltip();
      }
    }, 300);
  };

  const repositionVisibleChatbotTooltip = () => {
    if (activeTooltipTrigger && !chatbotTooltip.hidden) {
      positionChatbotTooltip(activeTooltipTrigger);
      chatbotTooltip.classList.add('is-visible');
    }
  };

  const openChatbot = () => {
    if (!chatbotToggle || !chatbotPanel) {
      return;
    }

    previouslyFocusedChatbotElement = document.activeElement;
    chatbot?.classList.add('is-open');
    chatbotPanel.classList.remove('is-hidden');
    chatbotPanel.setAttribute('aria-hidden', 'false');
    chatbotToggle.setAttribute('aria-expanded', 'true');

    window.setTimeout(() => {
      scheduleChatbotLayoutSync();
      chatbotInput?.focus();
    }, 0);
  };

  const focusAfterChatbotClose = () => {
    if (previouslyFocusedChatbotElement instanceof HTMLElement) {
      previouslyFocusedChatbotElement.focus();
      return;
    }

    chatbotToggle?.focus();
  };

  const closeChatbot = () => {
    if (!chatbotToggle || !chatbotPanel) {
      return;
    }

    hideChatbotTooltip();
    chatbot?.classList.remove('is-open');
    chatbotPanel.classList.add('is-hidden');
    chatbotPanel.setAttribute('aria-hidden', 'true');
    chatbotToggle.setAttribute('aria-expanded', 'false');
    window.setTimeout(clampCurrentChatbotPosition, 0);
    focusAfterChatbotClose();
  };

  const appendChatMessage = (message, type) => {
    if (!chatbotMessages) {
      return;
    }

    const messageElement = document.createElement('div');
    const paragraph = document.createElement('p');
    messageElement.className = `chatbot-message chatbot-message--${type}`;
    paragraph.textContent = message;
    messageElement.append(paragraph);
    chatbotMessages.append(messageElement);
    scheduleChatbotLayoutSync();
  };

  const getChatbotResponse = (question) => {
    const normalizedQuestion = question.toLowerCase().trim();
    const matchedResponse = chatbotResponses.find((response) =>
      response.keywords.some((keyword) => normalizedQuestion.includes(keyword))
    );

    if (matchedResponse) {
      return matchedResponse.answer;
    }

    return 'I can help with quick questions about Vivek\'s notice period, background, hobbies, contact details, and QA/accessibility experience. For anything specific, email Vivek at vivekpinto5@gmail.com.';
  };

  const submitChatQuestion = (question) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    appendChatMessage(trimmedQuestion, 'user');
    appendChatMessage(getChatbotResponse(trimmedQuestion), 'bot');
  };

  const trapDialogFocus = (event) => {
    if (!mobileMenu || mobileMenu.classList.contains('is-hidden') || event.key !== 'Tab') {
      return;
    }

    const focusableElements = getFocusableElements();
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (!firstFocusableElement || !lastFocusableElement) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey && document.activeElement === firstFocusableElement) {
      event.preventDefault();
      lastFocusableElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  };

  const trapChatbotFocus = (event) => {
    if (
      !chatbotPanel ||
      chatbotPanel.classList.contains('is-hidden') ||
      event.key !== 'Tab' ||
      !chatbotPanel.contains(document.activeElement)
    ) {
      return;
    }

    const focusableElements = getChatbotFocusableElements();
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (!firstFocusableElement || !lastFocusableElement) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey && document.activeElement === firstFocusableElement) {
      event.preventDefault();
      lastFocusableElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  };

  const startChatbotPointerDrag = (event) => {
    if (!chatbot || event.button !== 0) {
      return;
    }

    chatbotDragState = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: chatbotPosition.x,
      startY: chatbotPosition.y,
      hasMoved: false
    };

    chatbot.classList.add('is-dragging');
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const moveChatbotWithPointer = (event) => {
    if (!chatbotDragState || event.pointerId !== chatbotDragState.pointerId) {
      return;
    }

    const deltaX = event.clientX - chatbotDragState.startClientX;
    const deltaY = event.clientY - chatbotDragState.startClientY;

    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      chatbotDragState.hasMoved = true;
    }

    if (chatbotDragState.hasMoved) {
      event.preventDefault();
      setChatbotPosition(chatbotDragState.startX + deltaX, chatbotDragState.startY + deltaY);
    }
  };

  const endChatbotPointerDrag = (event) => {
    if (!chatbotDragState || event.pointerId !== chatbotDragState.pointerId) {
      return;
    }

    if (chatbotDragState.hasMoved) {
      suppressChatbotPositionCycleClick = true;
      window.setTimeout(() => {
        suppressChatbotPositionCycleClick = false;
      }, 300);
    }

    event.currentTarget.releasePointerCapture?.(event.pointerId);
    chatbot?.classList.remove('is-dragging');
    chatbotDragState = null;
  };

  const moveChatbotWithKeyboard = (event) => {
    const movementKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Home'];

    if (!movementKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();

    if (event.key === 'Home') {
      resetChatbotPosition(true);
      return;
    }

    const movementAmount = event.shiftKey ? 48 : 16;
    const movementByKey = {
      ArrowUp: { x: 0, y: -movementAmount },
      ArrowRight: { x: movementAmount, y: 0 },
      ArrowDown: { x: 0, y: movementAmount },
      ArrowLeft: { x: -movementAmount, y: 0 }
    };
    const movement = movementByKey[event.key];

    setChatbotPosition(chatbotPosition.x + movement.x, chatbotPosition.y + movement.y, true);
  };

  // Toggle mobile menu
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  dialogCloseButtons.forEach((button) => {
    button.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && activeTooltipTrigger) {
      event.preventDefault();
      hideChatbotTooltip();
      return;
    }

    if (event.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('is-hidden')) {
      closeMobileMenu();
    }

    if (event.key === 'Escape' && chatbotPanel && !chatbotPanel.classList.contains('is-hidden')) {
      closeChatbot();
    }

    trapDialogFocus(event);
    trapChatbotFocus(event);
  });

  // Close menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu && !mobileMenu.classList.contains('is-hidden')) {
        closeMobileMenu();
      }
    });
  });

  if (chatbotToggle && chatbotPanel) {
    chatbotToggle.addEventListener('click', () => {
      const isExpanded = chatbotToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeChatbot();
      } else {
        openChatbot();
      }
    });
  }

  chatbotDragHandles.forEach((handle) => {
    handle.addEventListener('pointerdown', startChatbotPointerDrag);
    handle.addEventListener('pointermove', moveChatbotWithPointer);
    handle.addEventListener('pointerup', endChatbotPointerDrag);
    handle.addEventListener('pointercancel', endChatbotPointerDrag);
  });

  chatbotTooltipTriggers.forEach((trigger) => {
    trigger.addEventListener('pointerenter', () => showChatbotTooltip(trigger));
    trigger.addEventListener('pointerleave', scheduleChatbotTooltipHide);
    trigger.addEventListener('focus', () => showChatbotTooltip(trigger));
    trigger.addEventListener('blur', scheduleChatbotTooltipHide);
  });

  chatbotTooltip.addEventListener('pointerenter', clearTooltipHideTimeout);
  chatbotTooltip.addEventListener('pointerleave', scheduleChatbotTooltipHide);

  chatbotLauncherMove?.addEventListener('keydown', moveChatbotWithKeyboard);
  chatbotMove?.addEventListener('keydown', moveChatbotWithKeyboard);

  chatbotPositionCycleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (suppressChatbotPositionCycleClick) {
        suppressChatbotPositionCycleClick = false;
        return;
      }

      moveChatbotToNextDockPosition();
    });
  });

  window.addEventListener('resize', () => {
    clampCurrentChatbotPosition();
    repositionVisibleChatbotTooltip();
  });

  if ('ResizeObserver' in window && chatbotPanel) {
    const chatbotResizeObserver = new ResizeObserver(scheduleChatbotLayoutSync);
    chatbotResizeObserver.observe(chatbotPanel);

    if (chatbotMessages) {
      chatbotResizeObserver.observe(chatbotMessages);
    }
  }

  window.addEventListener('scroll', repositionVisibleChatbotTooltip, true);

  chatbotClose?.addEventListener('click', closeChatbot);

  chatbotChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const question = chip.getAttribute('data-chat-question') || '';
      submitChatQuestion(question);
    });
  });

  chatbotForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!(chatbotInput instanceof HTMLInputElement)) {
      return;
    }

    submitChatQuestion(chatbotInput.value);
    chatbotInput.value = '';
  });

  // Simple Scroll Spy & Active State
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id') || '';
      }
    });

    navItems.forEach((item) => {
      item.classList.remove('is-active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('is-active');
      }
    });
  });

  console.log('Vivek Pinto - Accessibility Portfolio initialized.');
});

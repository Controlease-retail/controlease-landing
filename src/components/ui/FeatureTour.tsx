import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';

export interface TourHint {
  id?: string; // Unique identifier for tracking dismissal (required for dismissible hints)
  targetSelector: string;
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  dismissible?: boolean; // If true, shows a "Got it!" button
}

export interface TourStep {
  targetSelector: string;
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  requireClick?: boolean; // If true, user must click the target (or clickSelector element) to proceed
  clickSelector?: string; // Optional: specific element to click (defaults to targetSelector if requireClick is true)
  hint?: TourHint; // Optional: small helper tooltip that appears near another element
  hints?: TourHint[]; // Optional: multiple hints with dismiss buttons (use instead of hint for multiple)
  showHintAfterNext?: boolean; // If true, hint only shows after clicking Next (not immediately)
  requireAllHintsDismissed?: boolean; // If true, Next button disabled until all dismissible hints are dismissed
  autoDismissHintsOnNext?: boolean; // If true, clicking Next auto-dismisses all hints (alternative to requireAllHintsDismissed)
  tooltipOffset?: number; // Optional: extra distance from target element (default is 16)
  disableBack?: boolean; // If true, user cannot go back from this step
  completionMessage?: { // Optional: show an inspiring message after this step completes (typically on last step)
    title: string;
    description: string;
  };
}

interface TourNavTranslations {
  back: string;
  next: string;
  gotIt: string;
  clickToContinue: string;
  awesome: string;
}

interface FeatureTourProps {
  steps: TourStep[];
  containerRef: React.RefObject<HTMLElement>;
  onComplete?: () => void;
  autoStart?: boolean;
  startDelay?: number;
  allowClose?: boolean;
  waitForElement?: boolean;
  elementTimeout?: number;
  navTranslations?: TourNavTranslations;
}

const defaultNavTranslations: TourNavTranslations = {
  back: 'Back',
  next: 'Next',
  gotIt: 'Got it!',
  clickToContinue: 'Click to continue',
  awesome: 'Awesome!',
};

export const FeatureTour = ({
  steps,
  containerRef,
  onComplete,
  autoStart = true,
  startDelay = 800,
  allowClose = true,
  waitForElement = true,
  elementTimeout = 5000,
  navTranslations = defaultNavTranslations,
}: FeatureTourProps) => {
  const nav = navTranslations;
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);
  const [hintPosition, setHintPosition] = useState<{ top: number; left: number } | null>(null);
  const [hintsPositions, setHintsPositions] = useState<Record<string, { top: number; left: number }>>({});
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [hintsVisible, setHintsVisible] = useState<Record<string, boolean>>({});
  const [dismissedHints, setDismissedHints] = useState<Set<string>>(new Set());
  const [hintActivated, setHintActivated] = useState(false); // For showHintAfterNext
  const [isTransitioningToCompletion, setIsTransitioningToCompletion] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hintsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const hasStarted = useRef(false);
  const isHintVisibleRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    isHintVisibleRef.current = isHintVisible;
  }, [isHintVisible]);

  const currentTourStep = steps[currentStep];

  // Get all hints for current step (either single hint or multiple hints array)
  const currentHints = currentTourStep?.hints || (currentTourStep?.hint ? [currentTourStep.hint] : []);

  // Check if all dismissible hints have been dismissed
  const allDismissibleHintsDismissed = currentHints
    .filter(h => h.dismissible)
    .every(h => dismissedHints.has(h.id || h.targetSelector));

  // Check if Next should be disabled due to undismissed hints
  const nextDisabledByHints = currentTourStep?.requireAllHintsDismissed && !allDismissibleHintsDismissed;

  // Wait for element to exist
  const waitForElementToExist = useCallback(
    (selector: string): Promise<Element | null> => {
      return new Promise((resolve) => {
        if (!containerRef.current) {
          resolve(null);
          return;
        }

        const element = containerRef.current.querySelector(selector);
        if (element) {
          resolve(element);
          return;
        }

        if (!waitForElement) {
          resolve(null);
          return;
        }

        const startTime = Date.now();
        const observer = new MutationObserver(() => {
          const el = containerRef.current?.querySelector(selector);
          if (el) {
            observer.disconnect();
            resolve(el);
          } else if (Date.now() - startTime > elementTimeout) {
            observer.disconnect();
            resolve(null);
          }
        });

        observer.observe(containerRef.current, {
          childList: true,
          subtree: true,
        });

        // Also set a hard timeout
        setTimeout(() => {
          observer.disconnect();
          resolve(containerRef.current?.querySelector(selector) || null);
        }, elementTimeout);
      });
    },
    [containerRef, waitForElement, elementTimeout]
  );

  const calculatePosition = useCallback(() => {
    if (!containerRef.current || !currentTourStep) return;

    const target = containerRef.current.querySelector(currentTourStep.targetSelector);
    if (!target) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const tooltipWidth = 320;
    const tooltipHeight = 250;
    const offset = currentTourStep.tooltipOffset ?? 16;

    // Calculate position relative to container
    const targetCenterX = targetRect.left - containerRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top - containerRect.top + targetRect.height / 2;
    const targetLeft = targetRect.left - containerRect.left;
    const targetRight = targetRect.right - containerRect.left;
    const targetTop = targetRect.top - containerRect.top;
    const targetBottom = targetRect.bottom - containerRect.top;

    // Calculate available space in each direction
    const spaceRight = containerRect.width - targetRight;
    const spaceLeft = targetLeft;
    const spaceTop = targetTop;
    const spaceBottom = containerRect.height - targetBottom;

    // Determine best position (prefer requested, but fall back if no space)
    let position = currentTourStep.position || 'right';

    const canFit = {
      right: spaceRight >= tooltipWidth + offset,
      left: spaceLeft >= tooltipWidth + offset,
      bottom: spaceBottom >= tooltipHeight + offset,
      top: spaceTop >= tooltipHeight + offset,
    };

    // If requested position doesn't fit, find one that does
    if (!canFit[position]) {
      if (canFit.right) position = 'right';
      else if (canFit.left) position = 'left';
      else if (canFit.bottom) position = 'bottom';
      else if (canFit.top) position = 'top';
      // If nothing fits, use the one with most space
      else {
        const spaces = { right: spaceRight, left: spaceLeft, bottom: spaceBottom, top: spaceTop };
        position = Object.entries(spaces).sort((a, b) => b[1] - a[1])[0][0] as typeof position;
      }
    }

    const padding = 16;

    // The ONLY rule: tooltip must NOT overlap the target element
    // Calculate all possible non-overlapping positions and pick the best one

    type Position = { top: number; left: number; fits: boolean };

    // Position ABOVE the target (tooltip bottom edge above target top edge)
    const abovePos: Position = {
      top: targetTop - tooltipHeight - offset,
      left: Math.max(padding, Math.min(targetCenterX - tooltipWidth / 2, containerRect.width - tooltipWidth - padding)),
      fits: targetTop - tooltipHeight - offset >= padding
    };

    // Position BELOW the target (tooltip top edge below target bottom edge)
    const belowPos: Position = {
      top: targetBottom + offset,
      left: Math.max(padding, Math.min(targetCenterX - tooltipWidth / 2, containerRect.width - tooltipWidth - padding)),
      fits: targetBottom + offset + tooltipHeight <= containerRect.height - padding
    };

    // Position to the LEFT of target (tooltip right edge to the left of target left edge)
    // Vertically: ensure tooltip stays within container bounds
    const leftTopValue = Math.max(padding, Math.min(targetCenterY - tooltipHeight / 2, containerRect.height - tooltipHeight - padding));
    const leftPos: Position = {
      top: leftTopValue,
      left: targetLeft - tooltipWidth - offset,
      fits: targetLeft - tooltipWidth - offset >= padding && leftTopValue + tooltipHeight <= containerRect.height - padding
    };

    // Position to the RIGHT of target (tooltip left edge to the right of target right edge)
    const rightPos: Position = {
      top: Math.max(padding, Math.min(targetCenterY - tooltipHeight / 2, containerRect.height - tooltipHeight - padding)),
      left: targetRight + offset,
      fits: targetRight + offset + tooltipWidth <= containerRect.width - padding
    };

    // Pick the best position based on preference and what fits
    let top = 0;
    let left = 0;

    const preferredOrder = currentTourStep.position
      ? [currentTourStep.position, 'left', 'top', 'right', 'bottom']
      : ['left', 'top', 'right', 'bottom'];

    const positionMap = {
      left: leftPos,
      right: rightPos,
      top: abovePos,
      bottom: belowPos
    };

    let found = false;
    for (const pos of preferredOrder) {
      const p = positionMap[pos as keyof typeof positionMap];
      if (p && p.fits) {
        top = p.top;
        left = p.left;
        found = true;
        break;
      }
    }

    // If nothing fits perfectly, use above position but clamped
    if (!found) {
      // Default to above, clamped to container
      top = Math.max(padding, targetTop - tooltipHeight - offset);
      left = Math.max(padding, Math.min(targetCenterX - tooltipWidth / 2, containerRect.width - tooltipWidth - padding));
    }

    // Only update if position actually changed to avoid unnecessary re-renders
    setTooltipPosition(prev => {
      if (prev && prev.top === top && prev.left === left) return prev;
      return { top, left };
    });
  }, [containerRef, currentTourStep]);

  // Calculate hint position
  const calculateHintPosition = useCallback(() => {
    // Don't show hint if: no hint defined, or showHintAfterNext is true but not activated yet
    if (!containerRef.current || !currentTourStep?.hint ||
        (currentTourStep.showHintAfterNext && !hintActivated)) {
      return;
    }

    const hintTarget = containerRef.current.querySelector(currentTourStep.hint.targetSelector);
    if (!hintTarget) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = hintTarget.getBoundingClientRect();
    const hintWidth = 180;
    const hintHeight = 50;
    const offset = 12;

    const targetCenterX = targetRect.left - containerRect.left + targetRect.width / 2;
    const targetTop = targetRect.top - containerRect.top;
    const targetBottom = targetRect.bottom - containerRect.top;
    const targetLeft = targetRect.left - containerRect.left;

    let top = 0;
    let left = 0;
    const position = currentTourStep.hint.position || 'left';

    switch (position) {
      case 'top':
        top = targetTop - hintHeight - offset;
        left = targetCenterX - hintWidth / 2;
        break;
      case 'bottom':
        top = targetBottom + offset;
        left = targetCenterX - hintWidth / 2;
        break;
      case 'left':
        top = targetTop + (targetRect.height / 2) - (hintHeight / 2);
        left = targetLeft - hintWidth - offset;
        break;
      case 'right':
        top = targetTop + (targetRect.height / 2) - (hintHeight / 2);
        left = targetRect.right - containerRect.left + offset;
        break;
    }

    // Clamp to container bounds
    const padding = 8;
    top = Math.max(padding, Math.min(top, containerRect.height - hintHeight - padding));
    left = Math.max(padding, Math.min(left, containerRect.width - hintWidth - padding));

    // Only update if position actually changed to avoid unnecessary re-renders
    setHintPosition(prev => {
      if (prev && prev.top === top && prev.left === left) return prev;
      return { top, left };
    });
    if (!isHintVisibleRef.current) {
      setIsHintVisible(true);
    }
  }, [containerRef, currentTourStep, hintActivated]);

  // Calculate positions for multiple hints
  const calculateHintsPositions = useCallback(() => {
    if (!containerRef.current || currentHints.length === 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newPositions: Record<string, { top: number; left: number }> = {};
    const newVisible: Record<string, boolean> = {};

    for (const hint of currentHints) {
      const hintId = hint.id || hint.targetSelector;
      // Skip dismissed hints
      if (dismissedHints.has(hintId)) continue;

      const hintTarget = containerRef.current.querySelector(hint.targetSelector);
      if (!hintTarget) continue;

      const targetRect = hintTarget.getBoundingClientRect();
      const hintWidth = hint.dismissible ? 200 : 180;
      const hintHeight = hint.dismissible ? 40 : 36;
      const offset = 4;

      const targetCenterX = targetRect.left - containerRect.left + targetRect.width / 2;
      const targetTop = targetRect.top - containerRect.top;
      const targetBottom = targetRect.bottom - containerRect.top;
      const targetLeft = targetRect.left - containerRect.left;

      let top = 0;
      let left = 0;
      const position = hint.position || 'right';

      switch (position) {
        case 'top':
          top = targetTop - hintHeight - offset;
          left = targetCenterX - hintWidth / 2;
          break;
        case 'bottom':
          top = targetBottom + offset;
          left = targetCenterX - hintWidth / 2;
          break;
        case 'left':
          top = targetTop + (targetRect.height / 2) - (hintHeight / 2);
          left = targetLeft - hintWidth - offset;
          break;
        case 'right':
          top = targetTop + (targetRect.height / 2) - (hintHeight / 2);
          left = targetRect.right - containerRect.left + offset;
          break;
      }

      // Clamp to container bounds
      const padding = 8;
      top = Math.max(padding, Math.min(top, containerRect.height - hintHeight - padding));
      left = Math.max(padding, Math.min(left, containerRect.width - hintWidth - padding));

      newPositions[hintId] = { top, left };
      newVisible[hintId] = true;
    }

    setHintsPositions(newPositions);
    setHintsVisible(newVisible);
  }, [containerRef, currentHints, dismissedHints]);

  const handleDismissHint = useCallback((hintId: string) => {
    setDismissedHints(prev => new Set([...prev, hintId]));
    setHintsVisible(prev => ({ ...prev, [hintId]: false }));
  }, []);

  const handleClose = useCallback(() => {
    setIsActive(false);
    onComplete?.();
  }, [onComplete]);

  const handleNext = useCallback(() => {
    // If this step has showHintAfterNext and hint not yet activated, activate it
    if (currentTourStep?.showHintAfterNext && !hintActivated) {
      setHintActivated(true);
      return;
    }

    // Auto-dismiss all hints if enabled
    if (currentTourStep?.autoDismissHintsOnNext && currentHints.length > 0) {
      const allHintIds = currentHints.map(h => h.id || h.targetSelector);
      setDismissedHints(new Set(allHintIds));
      setHintsVisible({});
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setHintActivated(false);
      setIsHintVisible(false);
      setHintPosition(null);
      setDismissedHints(new Set());
      setHintsPositions({});
      setHintsVisible({});
    } else {
      // Last step - show completion modal if defined, otherwise close
      if (currentTourStep?.completionMessage) {
        // Start transition: fade out tour elements first
        setIsTransitioningToCompletion(true);
        setIsHintVisible(false);
        // After tour fades out, show completion modal
        setTimeout(() => {
          setShowCompletionModal(true);
        }, 400);
      } else {
        handleClose();
      }
    }
  }, [currentStep, steps.length, handleClose, currentTourStep, hintActivated, currentHints]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setHintActivated(false);
      setIsHintVisible(false);
      setHintPosition(null);
    }
  }, [currentStep]);

  // Start tour when in view
  useEffect(() => {
    if (isInView && autoStart && !hasStarted.current) {
      hasStarted.current = true;
      const timer = setTimeout(() => {
        setIsActive(true);
      }, startDelay);
      return () => clearTimeout(timer);
    }
  }, [isInView, autoStart, startDelay]);

  // Update position when step changes or on resize
  useEffect(() => {
    if (!isActive || !currentTourStep) return;

    let isMounted = true;
    let positionInterval: ReturnType<typeof setInterval> | null = null;

    const updatePosition = async () => {
      const element = await waitForElementToExist(currentTourStep.targetSelector);

      if (!isMounted) return;

      if (element) {
        calculatePosition();
        calculateHintPosition();
        calculateHintsPositions();

        // Recalculate position every 50ms to catch animations
        positionInterval = setInterval(() => {
          if (isMounted) {
            calculatePosition();
            calculateHintPosition();
            calculateHintsPositions();
          }
        }, 50);

        // Stop recalculating after 500ms (animation should be done)
        setTimeout(() => {
          if (positionInterval) {
            clearInterval(positionInterval);
            positionInterval = null;
          }
        }, 500);
      } else {
        // Element not found, skip to next step or close
        if (currentStep < steps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          handleClose();
        }
      }
    };

    updatePosition();

    const handleResize = () => {
      calculatePosition();
      calculateHintPosition();
      calculateHintsPositions();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      if (positionInterval) {
        clearInterval(positionInterval);
      }
      setIsHintVisible(false);
    };
  }, [isActive, currentStep, currentTourStep, calculatePosition, calculateHintPosition, calculateHintsPositions, waitForElementToExist, steps.length, handleClose]);

  // Recalculate hint when hintActivated changes
  useEffect(() => {
    if (hintActivated) {
      calculateHintPosition();
    }
  }, [hintActivated, calculateHintPosition]);

  // Highlight current target and handle click requirement
  useEffect(() => {
    if (!isActive || !containerRef.current || !currentTourStep) return;

    let target: HTMLElement | null = null;
    let clickTarget: HTMLElement | null = null;
    let elementsWithBoostedZIndex: { element: HTMLElement; originalZIndex: string }[] = [];
    let isMounted = true;

    const handleTargetClick = () => {
      if (currentTourStep.requireClick) {
        handleNext();
      }
    };

    // Boost z-index of the target element and ensure it can escape parent stacking contexts
    const boostZIndexHierarchy = (element: HTMLElement) => {
      // First, boost the target element itself
      elementsWithBoostedZIndex.push({ element, originalZIndex: element.style.zIndex });
      element.style.zIndex = '52';

      // Walk up and set ancestors to z-index: auto to break stacking contexts
      // (except those that are positioned and need to maintain layout)
      let current: HTMLElement | null = element.parentElement;
      while (current && current !== containerRef.current) {
        const computedStyle = window.getComputedStyle(current);
        const zIndex = computedStyle.zIndex;
        const position = computedStyle.position;

        // If element creates a stacking context via z-index, we need to handle it
        if (zIndex !== 'auto' && position !== 'static') {
          // Store original and set to auto so child can escape
          elementsWithBoostedZIndex.push({ element: current, originalZIndex: current.style.zIndex });
          current.style.zIndex = 'auto';
        }
        current = current.parentElement;
      }
    };

    const applyHighlight = async () => {
      // Wait for the target element to exist
      const element = await waitForElementToExist(currentTourStep.targetSelector);
      if (!isMounted || !element) return;

      target = element as HTMLElement;
      clickTarget = currentTourStep.clickSelector
        ? containerRef.current?.querySelector(currentTourStep.clickSelector) as HTMLElement
        : target;

      if (target) {
        target.classList.add('tour-highlight');
        // Boost z-index of target and its ancestors
        boostZIndexHierarchy(target);
      }

      // Only apply click handling if requireClick AND (no showHintAfterNext OR hint activated)
      const shouldEnableClick = currentTourStep.requireClick &&
        (!currentTourStep.showHintAfterNext || hintActivated);

      if (clickTarget && shouldEnableClick) {
        // Add pulse animation to the clickable element
        clickTarget.classList.add('tour-highlight-pulse-click');
        clickTarget.addEventListener('click', handleTargetClick);
        clickTarget.style.cursor = 'pointer';
        clickTarget.style.pointerEvents = 'auto';
        // If clickTarget is different from target, boost its z-index too
        if (clickTarget !== target) {
          boostZIndexHierarchy(clickTarget);
        }
      }
    };

    applyHighlight();

    return () => {
      isMounted = false;
      if (target) {
        target.classList.remove('tour-highlight');
      }
      // Restore original z-index values
      for (const { element, originalZIndex } of elementsWithBoostedZIndex) {
        element.style.zIndex = originalZIndex;
      }
      elementsWithBoostedZIndex = [];
      if (clickTarget) {
        clickTarget.classList.remove('tour-highlight-pulse-click');
        clickTarget.removeEventListener('click', handleTargetClick);
        clickTarget.style.cursor = '';
        clickTarget.style.pointerEvents = '';
      }
    };
  }, [isActive, currentStep, containerRef, currentTourStep, handleNext, waitForElementToExist, hintActivated]);

  // Block all clicks except on allowed elements
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const handleClickCapture = (e: MouseEvent) => {
      // Don't block clicks when completion modal is showing
      if (showCompletionModal) {
        return;
      }

      const target = e.target as HTMLElement;

      // Always allow clicks on the tooltip itself
      if (tooltipRef.current?.contains(target)) {
        return;
      }

      // Always allow clicks on the hints container (for dismiss buttons)
      if (hintsRef.current?.contains(target)) {
        return;
      }

      // Determine if clicking is currently allowed and on what element
      // For showHintAfterNext steps, only allow clicks after hint is activated
      const shouldAllowClick = currentTourStep?.requireClick &&
        (!currentTourStep.showHintAfterNext || hintActivated);

      if (!shouldAllowClick) {
        // No clicks allowed outside tooltip on this step
        e.stopPropagation();
        e.preventDefault();
        return;
      }

      // Get the allowed click target for this step
      const allowedSelector = currentTourStep?.clickSelector || currentTourStep?.targetSelector;
      if (!allowedSelector) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }

      const allowedElement = containerRef.current?.querySelector(allowedSelector);

      // If click is on or inside the allowed element, let it through
      if (allowedElement?.contains(target)) {
        return;
      }

      // Block the click
      e.stopPropagation();
      e.preventDefault();
    };

    // Use capture phase to intercept before any other handlers
    containerRef.current.addEventListener('click', handleClickCapture, true);

    return () => {
      containerRef.current?.removeEventListener('click', handleClickCapture, true);
    };
  }, [isActive, containerRef, currentTourStep, hintActivated, showCompletionModal]);

  if (!isActive || !currentTourStep || !tooltipPosition) return null;

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioningToCompletion ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-[51] pointer-events-none"
      />

      {/* Tooltip */}
      <motion.div
        ref={tooltipRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: isTransitioningToCompletion ? 0 : 1,
          scale: isTransitioningToCompletion ? 0.9 : 1,
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { type: 'spring', stiffness: 400, damping: 25 },
        }}
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
        className="absolute z-[55] w-80 transition-[top,left] duration-300 ease-out"
      >
        <div className="relative bg-[color:var(--color-surface)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[color:var(--color-border)]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent-dark text-white text-xs font-bold shadow-md">
                {currentStep + 1}
              </span>
              <div className="flex items-center gap-1.5">
                {steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      idx === currentStep
                        ? 'w-6 bg-accent'
                        : idx < currentStep
                          ? 'w-1.5 bg-accent/50'
                          : 'w-1.5 bg-[color:var(--color-border)]'
                    )}
                  />
                ))}
              </div>
            </div>
            {allowClose && (
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full hover:bg-[color:var(--color-bg-alt)] text-[color:var(--color-text-muted)] transition-colors"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="px-5 pb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <h4 className="text-lg font-bold text-[color:var(--color-text)] mb-2">
                  {currentTourStep.title}
                </h4>
                <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed">
                  {currentTourStep.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-alt)]/50 rounded-b-2xl">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0 || currentTourStep.disableBack}
              className={cn(
                'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                currentStep === 0 || currentTourStep.disableBack
                  ? 'text-[color:var(--color-text-muted)] opacity-40 cursor-not-allowed'
                  : 'text-[color:var(--color-text)] hover:bg-[color:var(--color-surface)] hover:shadow-sm'
              )}
            >
              <ChevronLeftIcon className="w-4 h-4" />
              {nav.back}
            </button>
            {/* Show "Click to continue" only if requireClick AND (no showHintAfterNext OR hint already activated) */}
            {currentTourStep.requireClick && (!currentTourStep.showHintAfterNext || hintActivated) ? (
              <div className="flex items-center gap-2 text-sm text-accent font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                {nav.clickToContinue}
              </div>
            ) : (
              <button
                onClick={handleNext}
                disabled={nextDisabledByHints}
                className={cn(
                  "flex items-center gap-1 px-5 py-2 rounded-lg text-sm font-semibold shadow-md transition-all",
                  nextDisabledByHints
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-accent to-accent-dark text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                {currentStep === steps.length - 1 && !currentTourStep.showHintAfterNext ? nav.gotIt : nav.next}
                {(currentStep < steps.length - 1 || currentTourStep.showHintAfterNext) && <ChevronRightIcon className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Hint - small helper tooltip */}
      <AnimatePresence>
        {isHintVisible && currentTourStep.hint && hintPosition && !isTransitioningToCompletion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              opacity: { duration: 0.15 },
              scale: { type: 'spring', stiffness: 400, damping: 25 },
            }}
            style={{
              top: hintPosition.top,
              left: hintPosition.left,
            }}
            className="absolute z-[56] pointer-events-none transition-[top,left] duration-300 ease-out"
          >
            <div className="flex items-center gap-2 px-3 py-2 bg-[color:var(--color-surface)] text-[color:var(--color-text)] text-sm rounded-lg shadow-lg border border-[color:var(--color-border)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              {currentTourStep.hint.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multiple dismissible hints */}
      <div ref={hintsRef}>
        <AnimatePresence>
          {currentTourStep?.hints && !isTransitioningToCompletion && currentTourStep.hints.map((hint) => {
            const hintId = hint.id || hint.targetSelector;
            const pos = hintsPositions[hintId];
            const isVisible = hintsVisible[hintId] && !dismissedHints.has(hintId);

            if (!pos || !isVisible) return null;

            return (
              <motion.div
                key={hintId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  opacity: { duration: 0.2 },
                  scale: { type: 'spring', stiffness: 400, damping: 25 },
                }}
                style={{
                  top: pos.top,
                  left: pos.left,
                }}
                className="absolute z-[56] transition-[top,left] duration-300 ease-out"
              >
                <div className="flex items-center gap-2 px-2.5 py-2 bg-[color:var(--color-surface)] text-[color:var(--color-text)] text-xs rounded-lg shadow-lg border border-[color:var(--color-border)] max-w-[200px]">
                  <span className="leading-snug flex-1">{hint.text}</span>
                  {hint.dismissible && (
                    <button
                      onClick={() => handleDismissHint(hintId)}
                      className="flex-shrink-0 px-2 py-0.5 text-[10px] font-semibold text-white bg-accent hover:bg-accent-dark rounded transition-colors"
                    >
                      OK
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && currentTourStep?.completionMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] flex items-center justify-center"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative max-w-md mx-4 bg-[color:var(--color-surface)] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-[color:var(--color-border)] overflow-hidden"
            >
              {/* Gradient accent bar */}
              <div className="h-1 bg-gradient-to-r from-accent via-primary to-accent" />

              <div className="p-6 text-center">
                {/* Icon */}
                <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4">
                  <SparklesIcon className="w-7 h-7 text-accent" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[color:var(--color-text)] mb-3">
                  {currentTourStep.completionMessage.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed mb-6">
                  {currentTourStep.completionMessage.description}
                </p>

                {/* Button */}
                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-dark text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {nav.awesome}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

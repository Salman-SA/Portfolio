'use client';

import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import './TextType.css';

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  // ✅ ADDED: Function to extract only visible text (without HTML tags)
  const getVisibleText = (htmlString) => {
    return htmlString.replace(/<[^>]*>/g, '');
  };

  // ✅ ADDED: Function to get the full HTML at a given character position
  const getHtmlAtPosition = (htmlString, charPosition) => {
    let visibleChars = 0;
    let result = '';
    let inTag = false;
    let currentTag = '';

    for (let i = 0; i < htmlString.length; i++) {
      const char = htmlString[i];
      
      if (char === '<') {
        inTag = true;
        currentTag = char;
      } else if (char === '>') {
        inTag = false;
        currentTag += char;
        result += currentTag;
        currentTag = '';
      } else if (inTag) {
        currentTag += char;
      } else {
        // This is a visible character
        if (visibleChars < charPosition) {
          result += char;
          visibleChars++;
        } else {
          break;
        }
      }
    }

    // Add remaining HTML tags if we reached the character limit
    if (inTag && currentTag) {
      result += currentTag + '>';
    }

    return result;
  };

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return '#ffffff';
    return textColors[currentTextIndex % textColors.length];
  };

  const renderHtmlContent = (htmlString) => {
    return { __html: htmlString };
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout;
    const currentText = textArray[currentTextIndex];
    const visibleText = getVisibleText(currentText);
    const processedText = reverseMode ? visibleText.split('').reverse().join('') : visibleText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            // ✅ FIXED: Delete based on visible characters
            const newVisibleLength = getVisibleText(displayedText).length - 1;
            const newHtml = getHtmlAtPosition(currentText, newVisibleLength);
            setDisplayedText(newHtml);
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              // ✅ FIXED: Get HTML up to current character position
              const newHtml = getHtmlAtPosition(currentText, currentCharIndex + 1);
              setDisplayedText(newHtml);
              setCurrentCharIndex(prev => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else if (textArray.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < getVisibleText(textArray[currentTextIndex]).length || isDeleting);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `text-type ${className}`,
      ...props
    },
    <span 
      className="text-type__content" 
      style={{ color: getCurrentTextColor() }}
      dangerouslySetInnerHTML={renderHtmlContent(displayedText)}
    />,
    showCursor && (
      <span
        ref={cursorRef}
        className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;
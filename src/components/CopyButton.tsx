import React, { useState } from 'react';

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  variant?: 'solid' | 'outline' | 'subtle';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  label = 'Copy Email',
  copiedLabel = '✓ Copied!',
  className = '',
  variant = 'outline',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getVariantStyles = () => {
    if (copied) {
      return 'bg-blue-600 text-white border-blue-600 shadow-xs ring-2 ring-blue-400/50';
    }
    switch (variant) {
      case 'solid':
        return 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600 shadow-xs';
      case 'subtle':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white border border-blue-200 dark:border-blue-800';
      case 'outline':
      default:
        return 'bg-white dark:bg-slate-900 text-stone-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/60 dark:hover:text-blue-400 border border-stone-200 dark:border-slate-800';
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${getVariantStyles()} ${className}`}
      title={`Copy "${textToCopy}" to clipboard`}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 20 20">
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
          </svg>
          <span>{copiedLabel}</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5 fill-current shrink-0 opacity-70" viewBox="0 0 20 20">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

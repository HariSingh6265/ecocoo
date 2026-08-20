'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X, AlertCircle, CheckCircle2, FileCode } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

interface FileUploaderProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  error?: string | null;
}

export function FileUploader({ file, onFileSelect, error }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateAndSetFile = (selectedFile: File) => {
    const validExtensions = ['pdf', 'docx', 'doc'];
    const ext = selectedFile.name.split('.').pop()?.toLowerCase() || '';

    if (!validExtensions.includes(ext)) {
      onFileSelect(null);
      alert('Unsupported file format. Please upload a PDF (.pdf) or Word document (.docx).');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      onFileSelect(null);
      alert('File size exceeds the 5MB limit. Please upload a smaller file.');
      return;
    }

    onFileSelect(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-indigo-600" />
          1. Upload Your Resume
          <span className="text-rose-500">*</span>
        </label>
        <span className="text-xs text-slate-500 font-medium">PDF, DOCX (Max 5MB)</span>
      </div>

      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 scale-[1.01]'
              : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-slate-50/50 dark:hover:bg-slate-800/40'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-inner">
              <UploadCloud className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                <span className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-300 underline-offset-4">
                  Click to upload
                </span>{' '}
                or drag and drop
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Supports PDF and Microsoft Word (.docx) files
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              100% Secure & Ephemeral Parsing
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
              <FileCode className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {file.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{formatBytes(file.size)}</span>
                <span>•</span>
                <span className="uppercase">{file.name.split('.').pop()}</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Ready to analyze</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onFileSelect(null)}
            className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 transition flex-shrink-0"
            title="Remove file"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

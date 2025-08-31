"use client";

import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export default function MarkdownEditor({
  value,
  onChange,
  name = "content",
  minRows = 16,
  errors = {},
  className = "",
}) {
  const textareaRef = useRef(null);

  const applyWrap = (before, after = before) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const selected = value.slice(start, end);
    const next =
      value.slice(0, start) + before + selected + after + value.slice(end);
    onChange({ target: { name, value: next } });

    // place caret after insertion
    const pos = start + before.length + selected.length + after.length;
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(pos, pos);
    });
  };

  const onKeyDown = (e) => {
    const el = e.currentTarget;
    if (e.key === "Tab") {
      e.preventDefault();
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const next = value.slice(0, start) + "\t" + value.slice(end);
      onChange({ target: { name, value: next } });
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 1;
      });
    }
    // Bold shortcut: Ctrl/Cmd + B
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      applyWrap("**");
    }
    // Italic shortcut: Ctrl/Cmd + I
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") {
      e.preventDefault();
      applyWrap("_");
    }
  };

  return (
    <div
      className={
        errors.content
          ? "border border-red-500 rounded p-2  "
          : ""
      }
    >
      {/* {Toolbar} */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-100 overflow-auto">
        {/* Editor */}
        <textarea
          ref={textareaRef}
          name={name}
          value={value}
          onChange={(e) =>
            onChange({ target: { name, value: e.target.value } })
          }
          onKeyDown={onKeyDown}
          rows={minRows}
          className="w-full border rounded p-3 font-mono text-sm leading-6"
          placeholder={`Write Markdown here...\n\n### Subjudul\nParagraf pertama...\n- [ ] Checklist\n\`\`\`js\nconsole.log("code");\n\`\`\``}
        />
        {/* Live Preview */}
        <div className="border rounded p-4 overflow-auto prose prose-neutral max-w-none whitespace-pre-line">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
          >
            {value || "_(preview will appear here)_"}
          </ReactMarkdown>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Supports headings, bold/italic, lists, tables, task lists, links,
        images, and fenced code. Shortcuts: <kbd>Ctrl/Cmd</kbd>+<kbd>B</kbd> for
        **bold**, <kbd>Ctrl/Cmd</kbd>+<kbd>I</kbd> for _italic_, <kbd>Tab</kbd>{" "}
        inserts a tab.
      </p>
    </div>
  );
}

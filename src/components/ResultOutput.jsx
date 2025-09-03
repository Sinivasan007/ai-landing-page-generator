import React from "react";

function ResultOutput({ html }) {
  const copyCode = () => {
    if (html) {
      navigator.clipboard.writeText(html);
      alert("Copied to clipboard!");
    }
  };

  return html ? (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-3">Live Preview</h2>
      <div
        className="border rounded-xl p-8 mb-8 min-h-[200px]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <h3 className="text-lg font-semibold mb-2">HTML Code</h3>
      <button
        className="bg-gray-700 px-4 py-2 text-white rounded mb-2"
        onClick={copyCode}
      >
        Copy Code
      </button>
      <pre className="bg-black text-white p-6 rounded-lg overflow-x-auto text-sm">
        {html}
      </pre>
    </div>
  ) : null;
}

export default ResultOutput;

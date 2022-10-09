import React from "react";

import { readSingleFile } from "../../utils/file-io.js";

export default function EmptyState({ onReplaceBarillet }) {
  return (
    <div className="import-from-json">
      {"Charger depuis un JSON"}
      <input
        accept=".json,application/json"
        onChange={(e) =>
          readSingleFile(
            e,
            (err, content) => content && onReplaceBarillet(JSON.parse(content))
          )
        }
        type="file"
      />
    </div>
  );
}

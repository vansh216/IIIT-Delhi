import { useId, useState } from "react";
import { inputCls } from "./ui";

// A list of short text items the person can remove or add to.
export default function ChipEditor({ label, hint, items, onChange, placeholder, max = 15 }) {
  const id = useId();
  const [value, setValue] = useState("");

  function add() {
    const v = value.trim().slice(0, 200);
    if (!v || items.length >= max || items.some((i) => i.toLowerCase() === v.toLowerCase())) {
      setValue("");
      return;
    }
    onChange([...items, v]);
    setValue("");
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[15px] font-medium">
        {label}
      </label>
      {hint && <p className="mb-2 text-sm text-ink-soft">{hint}</p>}

      {items.length > 0 && (
        <ul className="mb-3 flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-1 rounded-full bg-teal/10 py-1 pl-3.5 pr-1.5 text-[16px] text-teal-deep">
              {item}
              <button
                type="button"
                onClick={() => onChange(items.filter((i) => i !== item))}
                aria-label={`Remove ${item}`}
                className="grid h-6 w-6 place-items-center rounded-full hover:bg-teal/15"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2">
        <input
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className={inputCls}
        />
        <button
          type="button"
          onClick={add}
          disabled={!value.trim()}
          className="rounded-full border border-line px-5 font-medium hover:border-ink disabled:cursor-not-allowed disabled:text-ink-soft disabled:hover:border-line"
        >
          Add
        </button>
      </div>
    </div>
  );
}
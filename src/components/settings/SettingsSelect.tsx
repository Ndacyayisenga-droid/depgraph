"use client";

import { useState } from "react";

import { SelectField, type SelectOption } from "@/components/common/SelectField";

interface SettingsSelectProps {
  id: string;
  defaultValue: string;
  options: SelectOption<string>[];
}

/** Locally editable select; changes are only applied through the protected API. */
export function SettingsSelect({ id, defaultValue, options }: SettingsSelectProps) {
  const [value, setValue] = useState(defaultValue);
  return <SelectField id={id} value={value} options={options} onValueChange={setValue} className="h-10! w-full" />;
}

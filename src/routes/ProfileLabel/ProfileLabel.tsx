import type { ChangeEvent } from "react";

type Label = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function ProfileLabel({ label, name, type = "text", value, onChange }: Label) {
  return (
    <label>
      <p>{label}</p>
      <input name={name} value={value} type={type} onChange={onChange} />
    </label>
  );
}

export default ProfileLabel;

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export const PhoneInput = ({
  value,
  onChange,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  [key: string]: any;
}) => {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    // Format the display value when the raw value changes
    if (value) {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length >= 6) {
        setDisplayValue(
          `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
            6,
            10,
          )}`,
        );
      } else if (cleaned.length >= 3) {
        setDisplayValue(`(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`);
      } else if (cleaned.length > 0) {
        setDisplayValue(`(${cleaned}`);
      } else {
        setDisplayValue("");
      }
    } else {
      setDisplayValue("");
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const cleaned = input.replace(/\D/g, "");

    // Limit to 10 digits
    if (cleaned.length <= 10) {
      onChange(cleaned); // Store raw digits only
    }
  };

  return (
    <Input
      type="tel"
      placeholder="(123) 456-7890"
      value={displayValue}
      onChange={handleChange}
      maxLength={14} // (123) 456-7890 = 14 characters
      {...props}
    />
  );
};

import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ProfileTextInputProps {
  id: string;
  title: string;
  disabled: boolean;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileTextInput = ({
  id,
  title,
  disabled,
  placeholder,
  value,
  onChange,
}: ProfileTextInputProps) => {
  return (
    <>
      <Label htmlFor={id} className="text-slate-500">
        {title}
      </Label>
      <Input
        disabled={disabled}
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

interface ProfileImageInputProps {
  id: string;
  title: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileImageInput = ({
  id,
  title,
  disabled,
  onChange,
}: ProfileImageInputProps) => {
  return (
    <>
      <Label htmlFor={id} className="text-slate-500">
        {title}
      </Label>
      <Input
        disabled={disabled}
        type="file"
        id={id}
        onChange={onChange}
        accept="image/*"
      />
    </>
  );
};

interface LongTextInputProps {
  id: string;
  title: string;
  disabled: boolean;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const LongTextInput = ({
  id,
  title,
  disabled,
  placeholder,
  value,
  onChange,
}: LongTextInputProps) => {
  return (
    <>
      <Label htmlFor={id} className="text-slate-500">
        {title}
      </Label>
      <textarea
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-textarea p-2 border-2 border-slate-200 rounded-md focus:outline-none focus:border-black" // Add your styling classes here
        rows={4} // You can set the default number of rows
      />
    </>
  );
};

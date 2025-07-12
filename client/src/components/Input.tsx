/* eslint-disable @typescript-eslint/no-empty-object-type */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300 ${className}`}
      {...props}
    />
  );
};

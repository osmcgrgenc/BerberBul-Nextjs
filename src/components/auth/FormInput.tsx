import { UseFormRegister } from 'react-hook-form'

interface FormInputProps {
  id: string
  label: string
  type: string
  register: UseFormRegister<any>
  error?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
}

export default function FormInput({
  id,
  label,
  type,
  register,
  error,
  placeholder,
  autoComplete,
  required = true,
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          {...register(id, { required: required && 'Bu alan zorunludur' })}
          className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  )
} 
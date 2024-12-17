import {Input} from '@nextui-org/input'

interface UserFormFieldProps {
    label: string
    name: string
    type: string
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function UserFormField({label, name, type, value, onChange}: UserFormFieldProps) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <Input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className="text-gray-800"
                variant="flat"
                radius="lg"
            />
        </div>
    )
}

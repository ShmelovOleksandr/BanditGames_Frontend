import {SearchIcon} from '@/components/icons.tsx'
import {Input} from '@nextui-org/input'

interface SearchInputProps {
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({value, onChange}) => {
    return (
        <Input
            aria-label="Search"
            value={value}
            onChange={onChange}
            classNames={{
                inputWrapper: 'bg-default-100',
                input: 'text-sm',
            }}
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0"/>
            }
            type="search"
        />
    )
}
export default SearchInput

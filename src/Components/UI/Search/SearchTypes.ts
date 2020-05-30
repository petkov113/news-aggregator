import { ChangeEvent, FormEvent } from 'react';
export type PropsTypes = {
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}
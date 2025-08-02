import React from 'react'
import { clsx } from 'clsx'

export interface ButtonParams {
    onClick?: () => void
    disabled?: boolean
    expand?: boolean
    size?: 'sm' | 'md' | 'lg'
}

export function Button(params: React.PropsWithChildren<ButtonParams>) {
    const size = params.size || 'md'
    return (
        <button
            disabled={params.disabled}
            onClick={params.onClick}
            className={clsx('btn', {
                'btn-expanded': params.expand,
                'btn-sm': size === 'sm',
                'btn-md': size === 'md',
                'btn-lg': size === 'lg'
            })}>
            {params.children}
        </button>
    )
}

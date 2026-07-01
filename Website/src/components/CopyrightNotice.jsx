import './CopyrightNotice.css'

const COPYRIGHT_TEXT = 'Copyright (c) 2026 Roy Umaña, Jonny Gómez, and Josue Delcid'

export default function CopyrightNotice({ className = '' })
{
    const classNames = ['copyright-notice', className].filter(Boolean).join(' ')

    return (
        <p className={classNames}>
            {COPYRIGHT_TEXT}
        </p>
    )
}

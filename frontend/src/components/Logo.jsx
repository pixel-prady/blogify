import React from 'react';

const Logo = () => (
    <svg
        width="150"
        height="50"
        viewBox="0 0 200 50"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fill: 'var(--color-primary)' }}
    >
        <g>
            <text
                x="55"
                y="37"
                fontFamily="Arial, sans-serif"
                fontSize="38"
                fontWeight="bold"
            >
                Blogify
            </text>
            <path
                d="M28.6,11.4c-3.2-3.2-8.3-3.2-11.5,0L7.1,21.5c-1.1,1.1-1.1,2.9,0,4l3.2,3.2l-2.3,7.7c-0.2,0.8,0.5,1.5,1.3,1.3l7.7-2.3l3.2,3.2
            c1.1,1.1,2.9,1.1,4,0l10.1-10.1c3.2-3.2,3.2-8.3,0-11.5L28.6,11.4z M11.8,32.1l1.1-3.7l2.6,2.6L11.8,32.1z M26.7,30.1l-10.1,10.1
            c-0.4,0.4-1,0.4-1.4,0l-10-10c-0.4-0.4-0.4-1,0-1.4l10.1-10.1c1.9-1.9,5-1.9,6.9,0l4.5,4.5C28.6,25.1,28.6,28.2,26.7,30.1z"
            />
        </g>
    </svg>
);

export default Logo;

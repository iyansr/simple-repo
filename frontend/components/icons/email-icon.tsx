import React from 'react';
import type { SVGProps } from 'react';

const EmailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#344054"
      fillRule="evenodd"
      d="M15.833 15H4.167a.834.834 0 0 1-.834-.833V6.042L9.5 10.667a.829.829 0 0 0 1 0l6.166-4.625v8.125c0 .46-.374.833-.833.833Zm-.556-10L10 8.958 4.722 5h10.555Zm.556-1.667H4.167a2.503 2.503 0 0 0-2.5 2.5v8.334c0 1.378 1.121 2.5 2.5 2.5h11.666c1.379 0 2.5-1.122 2.5-2.5V5.833c0-1.378-1.121-2.5-2.5-2.5Z"
      clipRule="evenodd"
    />
    <mask
      id="a"
      width={18}
      height={14}
      x={1}
      y={3}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M15.833 15H4.167a.834.834 0 0 1-.834-.833V6.042L9.5 10.667a.829.829 0 0 0 1 0l6.166-4.625v8.125c0 .46-.374.833-.833.833Zm-.556-10L10 8.958 4.722 5h10.555Zm.556-1.667H4.167a2.503 2.503 0 0 0-2.5 2.5v8.334c0 1.378 1.121 2.5 2.5 2.5h11.666c1.379 0 2.5-1.122 2.5-2.5V5.833c0-1.378-1.121-2.5-2.5-2.5Z"
        clipRule="evenodd"
      />
    </mask>
  </svg>
);
export default EmailIcon;

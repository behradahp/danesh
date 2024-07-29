export default function AddProductIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
    >
      <g id='plus-square' transform='translate(-2 -2)'>
        <rect
          id='Rectangle_2939'
          data-name='Rectangle 2939'
          width='18'
          height='18'
          rx='2'
          transform='translate(3 3)'
          fill='none'
          stroke={color}
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
        />
        <line
          id='Line_2'
          data-name='Line 2'
          y2='8'
          transform='translate(12 8)'
          fill='none'
          stroke={color}
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
        />
        <line
          id='Line_3'
          data-name='Line 3'
          x2='8'
          transform='translate(8 12)'
          fill='none'
          stroke={color}
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
        />
      </g>
    </svg>
  );
}

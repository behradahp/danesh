export default function AboutIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='22'
      height='20'
      viewBox='0 0 22 20'
    >
      <g id='map' transform='translate(0 -1)'>
        <path
          id='Path_6555'
          data-name='Path 6555'
          d='M1,5.6V20l6.364-3.6L14.636,20,21,16.4V2L14.636,5.6,7.364,2Z'
          fill='none'
          stroke={color}
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
        />
        <line
          id='Line_4'
          data-name='Line 4'
          y2='16'
          transform='translate(7.364 2)'
          fill='none'
          stroke={color}
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
        />
        <line
          id='Line_5'
          data-name='Line 5'
          y2='16'
          transform='translate(14.636 4)'
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

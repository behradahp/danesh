export default function LogoutIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
    >
      <g id='log-out' transform='translate(-2 -2)'>
        <path
          id='Path_6551'
          data-name='Path 6551'
          d='M9,21H5a2,2,0,0,1-2-2V5A2,2,0,0,1,5,3H9'
          transform='translate(0 0)'
          fill='none'
          stroke={color}
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
        />
        <path
          id='Path_6552'
          data-name='Path 6552'
          d='M16,15l5-4L16,7'
          transform='translate(0 1)'
          fill='none'
          stroke={color}
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
        />
        <line
          id='Line_1'
          data-name='Line 1'
          x1='12'
          transform='translate(9 12)'
          fill='none'
          stroke='#000'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
        />
      </g>
    </svg>
  );
}

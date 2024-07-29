export default function DashboardIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
    >
      <g id='layout' transform='translate(-2 -2)'>
        <path
          id='Path_6559'
          data-name='Path 6559'
          d='M2,0H16a2,2,0,0,1,2,2V16a2,2,0,0,1-2,2H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0Z'
          transform='translate(3 3)'
          fill='rgba(0,0,0,0)'
          stroke={color}
          stroke-linecap='round'
          stroke-width='2'
        />
        <line
          id='Line_6'
          data-name='Line 6'
          x2='18'
          transform='translate(3 9)'
          fill='none'
          stroke={color}
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
        />
        <line
          id='Line_7'
          data-name='Line 7'
          y1='12'
          transform='translate(9 9)'
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

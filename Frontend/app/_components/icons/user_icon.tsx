export default function UserIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='22'
      viewBox='0 0 20 22'
    >
      <g id='user' transform='translate(-3 -2)'>
        <path
          id='Path_6556'
          data-name='Path 6556'
          d='M22,21V19a4.272,4.272,0,0,0-4.5-4h-9A4.272,4.272,0,0,0,4,19v2'
          transform='translate(0 2)'
          fill='none'
          stroke={color}
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
        />
        <circle
          id='Ellipse_1'
          data-name='Ellipse 1'
          cx='4'
          cy='4'
          r='4'
          transform='translate(9 3)'
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

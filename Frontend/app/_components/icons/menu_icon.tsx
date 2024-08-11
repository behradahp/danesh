export default function MenuIcon({color} : {color?:string}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='26'
      height='18'
      viewBox='0 0 26 18'
    >
      <g id='menu_1_' data-name='menu (1)' transform='translate(-2 -5)'>
        <line
          id='Line_3'
          data-name='Line 3'
          x2='24'
          transform='translate(3 14)'
          fill='none'
          stroke={color ?? '#a08caf'}
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
        />
        <line
          id='Line_4'
          data-name='Line 4'
          x2='24'
          transform='translate(3 6)'
          fill='none'
          stroke={color ?? '#a08caf'}
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
        />
        <line
          id='Line_5'
          data-name='Line 5'
          x2='24'
          transform='translate(3 22)'
          fill='none'
          stroke={color ?? '#a08caf'}
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
        />
      </g>
    </svg>
  );
}

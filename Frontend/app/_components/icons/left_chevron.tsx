export default function LeftChevron({ color }: { color: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='9.41'
      height='14.82'
      viewBox='0 0 9.41 14.82'
    >
      <g id='arrow-left' transform='translate(-4 -3.59)'>
        <path
          id='Path_6560'
          data-name='Path 6560'
          d='M0,0'
          transform='translate(5 11)'
          fill='none'
          stroke={color}
          stroke-linecap='round'
          stroke-width='2'
        />
        <path
          id='Path_6559'
          data-name='Path 6559'
          d='M12,17,5,11l7-6'
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

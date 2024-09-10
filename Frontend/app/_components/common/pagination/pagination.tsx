interface PaginationProps {
  count: number
  currentPage: number
  onChange: Function
}

export default function Pagination({
  count,
  currentPage,
  onChange,
}: PaginationProps) {
  const pages = Array.from({ length: count }, (_, i) => i + 1)

  return (
    <div className="flex gap-[10px] py-[10px]">
      {/* Right Arrow */}
      <div
        className={`${
          currentPage == 1 ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'
        } flex justify-center items-center w-[30px] h-[30px] bg-white dark:bg-[#222c32] rounded-[5px]`}
        onClick={currentPage == 1 ? () => {} : () => onChange(currentPage - 1)}
      >
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L5 5L1 9"
            stroke="#D3D5E0"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      {currentPage <= 2 ? (
        <>
          {pages.map((item, i) => {
            if (item <= 3) {
              return (
                <div
                  key={item + i}
                  className={`${
                    item == currentPage
                      ? 'bg-[#79D52E] text-white'
                      : 'bg-transparent border border-[#EAEBF0]'
                  } flex justify-center items-center w-[30px] h-[30px] cursor-pointer rounded-[5px]`}
                  onClick={() => onChange(item)}
                >
                  {item}
                </div>
              )
            }
          })}

          <div
            className={`${
              count <= 3 ? 'hidden' : ''
            } w-[30px] h-[30px] flex justify-center items-center font-YekanBakhMedium`}
          >
            ...
          </div>

          <div
            className={`${
              count <= 3 ? 'hidden' : ''
            } bg-transparent rounded-[5px] border border-[#EAEBF0] flex justify-center items-center w-[30px] h-[30px] cursor-pointer`}
            onClick={() => onChange(count)}
          >
            {count}
          </div>
        </>
      ) : currentPage >= count - 1 ? (
        <>
          <div
            className={`bg-transparent rounded-[5px] border border-[#EAEBF0] flex justify-center items-center w-[30px] h-[30px] cursor-pointer`}
            onClick={() => onChange(1)}
          >
            {1}
          </div>

          <div className="w-[30px] h-[30px] flex justify-center items-center font-YekanBakhMedium">
            ...
          </div>

          {pages.map((item) => {
            if (item >= count - 2) {
              return (
                <div
                  key={item}
                  className={`${
                    item == currentPage
                      ? 'bg-[#79D52E] text-white'
                      : 'bg-transparent border border-[#EAEBF0]'
                  } flex justify-center items-center w-[30px] h-[30px] cursor-pointer rounded-[5px]`}
                  onClick={() => onChange(item)}
                >
                  {item}
                </div>
              )
            }
          })}
        </>
      ) : (
        <>
          <div
            className={`bg-transparent rounded-[5px] border border-[#EAEBF0] flex justify-center items-center w-[30px] h-[30px] cursor-pointer`}
            onClick={() => onChange(1)}
          >
            {1}
          </div>

          <div className="w-[30px] h-[30px] flex justify-center items-center font-YekanBakhMedium">
            ...
          </div>

          {pages.map((item) => {
            if (item >= currentPage - 1 && item <= currentPage + 1) {
              return (
                <div
                  key={item}
                  className={`${
                    item == currentPage
                      ? 'bg-[#79D52E] text-white'
                      : 'bg-transparent border border-[#EAEBF0]'
                  } flex justify-center items-center w-[30px] h-[30px] cursor-pointer rounded-[5px]`}
                  onClick={() => onChange(item)}
                >
                  {item}
                </div>
              )
            }
          })}

          <div className="w-[30px] h-[30px] flex justify-center items-center font-YekanBakhMedium">
            ...
          </div>

          <div
            className={`bg-transparent rounded-[5px] border border-[#EAEBF0] flex justify-center items-center w-[30px] h-[30px] cursor-pointer`}
            onClick={() => onChange(count)}
          >
            {count}
          </div>
        </>
      )}

      <div
        className={`${
          currentPage == count
            ? 'opacity-80 cursor-not-allowed'
            : 'cursor-pointer'
        } flex justify-center items-center w-[30px] h-[30px] bg-white dark:bg-[#222c32] rounded-[5px]`}
        onClick={
          currentPage == count ? () => {} : () => onChange(currentPage + 1)
        }
      >
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 1L1 5L5 9"
            stroke="#AFB1BA"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

export const SkeletonProdutsInCart = () =>
  Array.from({ length: 3 }).map((x, index) => {
    return (
      <div className="flex flex-row gap-2 animate-pulse" key={index}>
        <div className="w-1/3 max-w-[100px] bg-gray-200 rounded-md overflow-hidden"></div>
        <div className="w-2/3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mt-1"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
        </div>
      </div>
    );
  });

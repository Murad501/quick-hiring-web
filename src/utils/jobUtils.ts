export const getTagStyles = (id: number, _tag: string) => {
  const styleIndex = id % 5;
  switch (styleIndex) {
    case 0:
      return "bg-gray-100 text-gray-500 border border-gray-200";
    case 1:
      return "bg-[#FDF3EB] text-[#F3A052] border border-[#F3A052]/20";
    case 2:
      return "bg-[#EEFDF3] text-[#52D396] border border-[#52D396]/20";
    case 3:
      return "bg-[#F4F4FF] text-[#6961F1] border border-[#6961F1]/20";
    case 4:
      return "bg-[#FEF4F4] text-[#F97070] border border-[#F97070]/20";
    default:
      return "bg-gray-100 text-gray-500 border border-gray-200";
  }
};

import { useMemo } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem, PaginationLink
} from "@/components/ui/pagination"; // Adjust this if needed based on ShadCN's actual imports
import { ArrowLeft, ArrowRight } from "lucide-react";

const Paginate = ({ totalCount, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const paginationRange = useMemo(() => {
    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  }, [totalCount, pageSize]);

  const handlePageChange = (page) => {
    if (page === currentPage) {
      return;
    }
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Pagination>
      <PaginationContent className="flex items-center justify-center space-x-2">
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full cursor-pointer bg-[#E7F0FA] text-black`}
          >
            <ArrowLeft />
          </PaginationLink>
        </PaginationItem>

        {paginationRange.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageChange(page)}
              isActive={page === currentPage}
              className={`px-4 py-2 rounded-full cursor-pointer ${
                page === currentPage
                  ? "bg-secondary text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full cursor-pointer bg-[#E7F0FA] text-black`}
          >
            <ArrowRight />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginate;

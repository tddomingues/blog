"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  numberOfPages: number;
  page: number;
  perPage: number;
}

const PaginationControls = ({
  hasNextPage,
  hasPrevPage,
  numberOfPages,
  page,
  perPage,
}: PaginationControlsProps) => {
  return (
    <Pagination className="mt-4 flex justify-start">
      <PaginationContent>
        <PaginationItem>
          <Badge
            variant="secondary"
            className="text-sm font-normal text-primary/80 mr-4"
          >
            Página {page} de {numberOfPages}
          </Badge>
        </PaginationItem>
        <PaginationItem>
          <Button disabled={!hasPrevPage} variant="ghost" className="p-0">
            <PaginationPrevious
              href={`/?page=${Number(page) - 1}&per_page=${perPage}`}
            />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button disabled={!hasNextPage} variant="ghost" className="p-0">
            <PaginationNext
              href={`/?page=${Number(page) + 1}&per_page=${perPage}`}
            />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;

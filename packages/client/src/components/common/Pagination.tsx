import type React from 'react';

import { useMemo } from 'react';
import { range } from 'lodash';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Field, FieldLabel } from '../ui/field';
import { cn } from '@/lib/utils';

interface Props {
   onNextPage: () => void;
   onPrevPage: () => void;
   onChangePageSize: (pageSize: number) => void;
   pageSize: number;
   currentPage: number;
   totalPages: number;
   hasNextPage: boolean;
   hasPreviousPage: boolean;
}

const AppPagination: React.FC<Props> = ({
   onNextPage,
   onPrevPage,
   onChangePageSize,
   pageSize,
   hasNextPage,
   hasPreviousPage,
}) => {
   const pageSizeRange = useMemo(() => {
      return range(1, 101);
   }, []);

   return (
      <div className="flex items-center justify-between gap-4">
         <Field orientation="horizontal" className="w-fit">
            <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>

            <Select value={pageSize.toString()} onValueChange={(pageSize) => onChangePageSize(Number(pageSize))}>
               <SelectTrigger className="w-20" id="select-rows-per-page">
                  <SelectValue />
               </SelectTrigger>

               <SelectContent align="start">
                  <SelectGroup>
                     {pageSizeRange.map((pageSize) => (
                        <SelectItem key={pageSize} value={pageSize.toString()}>
                           {pageSize}
                        </SelectItem>
                     ))}
                  </SelectGroup>
               </SelectContent>
            </Select>
         </Field>

         <Pagination className="mx-0 w-auto">
            <PaginationContent>
               <PaginationItem>
                  <PaginationPrevious
                     aria-disabled={!hasPreviousPage}
                     isActive={hasPreviousPage}
                     className={cn([hasPreviousPage ? '' : 'opacity-50'])}
                     onClick={() => (hasPreviousPage ? onPrevPage() : null)}
                  />
               </PaginationItem>

               <PaginationItem>
                  <PaginationNext
                     aria-disabled={!hasNextPage}
                     isActive={hasNextPage}
                     className={cn([hasNextPage ? '' : 'opacity-50'])}
                     onClick={() => (hasNextPage ? onNextPage() : null)}
                  />
               </PaginationItem>
            </PaginationContent>
         </Pagination>
      </div>
   );
};

export default AppPagination;

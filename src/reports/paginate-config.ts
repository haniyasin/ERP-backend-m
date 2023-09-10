import { FilterOperator, FilterSuffix, PaginateConfig } from 'nestjs-paginate';
import { Reports } from './entities/report.entity';

export const paginateConfig: PaginateConfig<Reports> = {
  sortableColumns: ['id', 'dateOfUpload'],
  nullSort: 'last',
  defaultSortBy: [['dateOfUpload', 'DESC']],
  searchableColumns: ['name'],
  select: ['id', 'name', 'dateOfUpload', 'documentType', 'document'],
  filterableColumns: {
    name: [FilterOperator.EQ, FilterSuffix.NOT],
  },
};

import {
  AccessTimeFilled,
  ArrowRightAlt,
  CalendarMonthOutlined,
  Leaderboard
} from '@mui/icons-material';
import type { ProductionReport } from 'domain/models';
import { apiPaths } from 'main/config';
import { formatCompactNumber, formatDate } from 'main/utils';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation/delete';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

interface ProductionReportCardProps {
  productionReport: ProductionReport;
  link: string;
}

export const ProductionReportCard: FC<ProductionReportCardProps> = ({ productionReport, link }) => {
  return (
    <div
      style={{ boxShadow: '0px 4px 20px rgba(144, 144, 144, 0.05)' }}
      className={'flex flex-col w-full tablet:min-w-[390 px] gap-6 rounded p-4 bg-white'}
    >
      <div className={'flex justify-between items-start'}>
        <div className={'flex flex-col gap-2'}>
          <Link to={link} className={'w-fit'}>
            <h3 className={'text-lg font-semibold text-primary cursor-pointer'}>
              {productionReport.code}
            </h3>
          </Link>
          <div className={'flex gap-2 items-center'}>
            <span className={'flex flex-wrap text-sm font-semibold gap-1 text-gray-400'}>
              <AccessTimeFilled sx={{ fontSize: '18px' }} />
              <p>
                {formatDate(productionReport.startDate, 'HH:mm')} -{' '}
                {formatDate(productionReport.endDate, 'HH:mm')}
              </p>
            </span>
            <p className={'text-gray-400 text-base font-medium'}>•</p>
            <span className={'flex flex-wrap text-sm font-semibold gap-1 text-gray-400'}>
              <Leaderboard sx={{ fontSize: '18px' }} />
              <p>
                {formatCompactNumber(productionReport.production)}{' '}
                {productionReport.production > 1 ? 'produzidos' : 'produzido'}
              </p>
            </span>
          </div>
        </div>
        <div className={'flex gap-2'}>
          <DeleteConfirmationModal
            id={productionReport.id}
            title={'Remover apontamento'}
            text={'Deseja realmente remover o apontamento? Todos os dados serão perdidos.'}
            route={apiPaths.productionReport}
            queryName={'productionReport'}
            color={'error'}
            successMessage={'Apontamento removido com sucesso!'}
          />
        </div>
      </div>
      <div className={'flex justify-between items-center'}>
        <div className={'flex gap-1'}>
          <CalendarMonthOutlined fontSize={'small'} />
          <p className={'font-semibold text-sm text-gray-600'}>
            {formatDate(productionReport.createdAt, "dd 'de' MMMM HH:mm", false)}
          </p>
        </div>
        <Link to={link} className={'w-fit'}>
          <div
            className={
              'text-primary font-medium flex items-center justify-center gap-1 cursor-pointer'
            }
          >
            <p>Ver Detalhes</p>
            <ArrowRightAlt className={'text-primary'} />
          </div>
        </Link>
      </div>
    </div>
  );
};

import { Add, Edit } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { type useModalProps } from 'data/hooks';
import { Role } from 'domain/enums/role';
import type { Company } from 'domain/models';
import { QueryName, apiPaths } from 'main/config';
import { Modal } from 'presentation/atomic-component/atom/modal';
import type { FC } from 'react';
import { getUser } from 'store/persist/selector';
import { RegisterCompanyForm } from '../../form/company';
import { SearchInput } from '../../search-input';

interface RegisterCompanyModalProps {
  modal: useModalProps;
  company?: Company;
}

export const RegisterCompanyModal: FC<RegisterCompanyModalProps> = ({ modal, company }) => {
  const { closeModal, isOpen, openModal } = modal;
  const user = getUser();

  return (
    <Modal
      openModalElement={
        user.role === Role.ADMIN ? (
          <SearchInput path={'/companies'} route={apiPaths.company} queryName={QueryName.company} />
        ) : company ? (
          <IconButton href={''} onClick={openModal} className={'gap-4'}>
            <Edit className={'hover:cursor-pointer text-primary'} />
          </IconButton>
        ) : (
          <Button onClick={openModal} variant={'contained'} className={'gap-4'}>
            <Add className={'hover:cursor-pointer text-gray-500'} />
            <span>Nova empresa</span>
          </Button>
        )
      }
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      size={'small'}
      subtitle={'Preencha o formulário abaixo.'}
      title={'Nova empresa'}
    >
      <RegisterCompanyForm closeModal={closeModal} company={company} />
    </Modal>
  );
};

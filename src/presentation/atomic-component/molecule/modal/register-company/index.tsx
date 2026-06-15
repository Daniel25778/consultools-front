import { Add, Edit } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useSearch, type useModalProps } from 'data/hooks';
import { Role } from 'domain/enums/role';
import type { Company } from 'domain/models';
import { setFilter } from 'main/utils/filter';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { useEffect, type FC } from 'react';
import { useUserLogged } from 'store/persist/selector';
import { RegisterCompanyForm } from '../../form/company';
import { SearchInputBase } from '../../search-input-base';

interface RegisterCompanyModalProps {
  modal: useModalProps;
  company?: Company;
}

export const RegisterCompanyModal: FC<RegisterCompanyModalProps> = ({ modal, company }) => {
  const { closeModal, isOpen, openModal } = modal;
  const { search, setSearchDebounce, searchDebounce } = useSearch();
  const user = useUserLogged();

  useEffect(() => {
    if (user.role === Role.ADMIN) {
      setFilter('company', {
        search
      });
    }
  }, [search, user.role]);

  return (
    <Modal
      openModalElement={
        user.role === Role.ADMIN ? (
          <SearchInputBase
            value={searchDebounce}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) =>
              setSearchDebounce(event.target.value)
            }
            placeholder={'Buscar empresas'}
          />
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

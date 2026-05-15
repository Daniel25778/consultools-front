import type { SvgIconTypeMap } from '@mui/material';
import { Button, CircularProgress } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { useModalProps } from 'data/hooks';
import { useModal } from 'data/hooks';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { colors } from 'presentation/style';
import { type FC, type ReactNode, cloneElement, isValidElement } from 'react';

interface ActionModalProps {
  button?: {
    title?: string;
    StartIcon?: OverridableComponent<SvgIconTypeMap>;
    EndIcon?: OverridableComponent<SvgIconTypeMap>;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
  };
  type: 'error' | 'success';
  openElement?: ReactNode;
  confirmAction?: () => Promise<void> | void;
  title: ReactNode | string;
  subtitle?: ReactNode | string;
  confirmText?: string;
  disableBackdrop?: boolean;
  isLoading?: boolean;
  modal?: useModalProps;
}

export const ActionModal: FC<ActionModalProps> = ({
  button,
  title,
  subtitle,
  confirmAction,
  disableBackdrop,
  modal,
  isLoading,
  type,
  confirmText,
  openElement,
}) => {
  const { closeModal, isOpen, openModal } = useModal();
  const getButtonType = (): 'error' | 'primary' => {
    if (type === 'success') return 'primary';
    return 'error';
  };

  const trigger = isValidElement(openElement)
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cloneElement(openElement, { onClick: openModal } as any)
    : null;

  return (
    <Modal
      button={button}
      closeModal={modal?.closeModal ?? closeModal}
      disableBackdrop={disableBackdrop}
      isOpen={modal?.isOpen ?? isOpen}
      openModal={modal?.openModal ?? openModal}
      openModalElement={trigger}
      size={'small'}
    >
      <div className={'flex flex-col gap-6'}>
        <div className={'flex flex-col gap-4'}>
          <h2 className={'text-2xl font-bold'}>{title}</h2>
          {subtitle ? <p className={'text-base'}>{subtitle}</p> : null}
        </div>

        <div
          className={
            'flex flex-col tablet:flex-row gap-4 w-full justify-center tablet:items-center mt-2'
          }
        >
          <Button
            className={'flex-grow'}
            color={'info'}
            onClick={modal?.closeModal ?? closeModal}
          >
            Cancelar
          </Button>

          <Button
            autoFocus
            className={'flex-grow'}
            color={getButtonType()}
            onClick={async (): Promise<void> => {
              if (confirmAction) await confirmAction();

              if (modal?.closeModal) modal?.closeModal();
              else closeModal();
            }}
            sx={{
              padding: type === 'error' ? '8px' : undefined,
            }}
            type={'button'}
          >
            {isLoading ? (
              <span className={'h-[28px] flex items-center'}>
                <CircularProgress
                  size={24}
                  sx={{
                    svg: {
                      color: `${colors.white} !important`,
                    },
                  }}
                  thickness={5}
                />
              </span>
            ) : null}

            {confirmText ?? 'Tentar novamente'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

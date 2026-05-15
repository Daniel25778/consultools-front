/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, IconButton } from '@mui/material';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { cloneElement, isValidElement } from 'react';
import { useModal } from 'data/hooks';
import type { FC, ReactElement, ReactNode } from 'react';

interface ConfirmationModalProps {
  text: ReactNode | string;
  title: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => Promise<void> | void;
  onConfirm?: () => Promise<void> | void;
  openElement?: ReactElement;
  hideCancelButton?: boolean;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  text,
  title,
  cancelText,
  onCancel,
  onConfirm,
  confirmText,
  hideCancelButton,
  openElement
}) => {
  const { closeModal, openModal, isOpen } = useModal();

  const trigger = isValidElement(openElement)
    ? cloneElement(openElement as any, {
        onClick: openModal
      })
    : null;

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        trigger || (
          <IconButton onClick={openModal}>
            <DeleteOutlineOutlined color={'error'} />
          </IconButton>
        )
      }
      size={'small'}
    >
      <div className={'w-full h-full flex flex-col gap-3'}>
        <h3 className={'text-xl font-bold'}>{title}</h3>
        <p>{text}</p>

        <div className={'flex mt-8 flex-row gap-4 ml-auto w-full'}>
          {hideCancelButton ? null : (
            <Button
              className={'w-full'}
              color={'info'}
              onClick={async (): Promise<void> => {
                if (onCancel) await onCancel();
                closeModal();
              }}
            >
              {cancelText ?? 'Não, voltar'}
            </Button>
          )}

          <Button
            autoFocus
            className={'w-full'}
            onClick={async (): Promise<void> => {
              if (onConfirm) await onConfirm();
              closeModal();
            }}
          >
            {confirmText || 'Sim, Confirmar'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

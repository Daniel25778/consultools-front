import { type useModalProps } from 'data/hooks';
import type { Yolo } from 'domain/models';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { useState, type FC } from 'react';
import { ImageModal } from '../image';

interface YoloModalProps {
  yolo: Yolo;
  type: 'HOME' | 'DETECTION';
  modal: useModalProps;
}

export const YoloModal: FC<YoloModalProps> = ({ type, yolo, modal }) => {
  const { closeModal, isOpen, openModal } = modal;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      title={yolo.name}
      openModalElement={type === 'HOME' ? null : null}
      size={'large'}
    >
      <div onClick={(event) => event.stopPropagation()}>
        <div className={'flex justify-between'}>
          <div className={'w-full'} />
          <div className={'flex w-[500px] overflow-auto gap-4 items-end bg-primary'}>
            {yolo.images?.map((item, index) => (
              <div key={item.name} className={'w-[400px]'}>
                <h3 className={'text-center'}>{item.name}</h3>
                <img
                  className={'w-[400px] h-[280px] object-contain'}
                  src={item.url}
                  width={400}
                  onClick={() => setSelectedIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <ImageModal
          imageList={yolo?.images?.map((item) => item.url) ?? []}
          index={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          updateIndex={(newIndex) => setSelectedIndex(newIndex)}
          openModalElement={null}
        />
      </div>
    </Modal>
  );
};

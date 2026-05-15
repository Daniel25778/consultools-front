import { Delete } from '@mui/icons-material';
import { callToast } from 'main/utils';
import { FileDrop, FormButton, Title } from 'presentation/atomic-component/atom';
import { ImageModal } from 'presentation/atomic-component/molecule/modal';
import { colors } from 'presentation/style';
import { useState, type FC } from 'react';
import type {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormSetValue
} from 'react-hook-form';
import type { DetectionRequest } from 'validation/schema';

interface HomeImagesPreviewProps {
  handleSubmit: UseFormHandleSubmit<DetectionRequest>;
  onSubmit: SubmitHandler<DetectionRequest>;
  setValue: UseFormSetValue<DetectionRequest>;
  isSubmitting: boolean;
  images: File[];
  hasError: boolean;
}

export const HomeImagesPreview: FC<HomeImagesPreviewProps> = ({
  handleSubmit,
  onSubmit,
  images,
  setValue,
  isSubmitting,
  hasError
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const imageList = images?.map((item) => URL.createObjectURL(item));

  const onError: SubmitErrorHandler<DetectionRequest> = (errors): void => {
    if (errors.yoloIds?.message) {
      callToast.error(errors.yoloIds?.message);
      return;
    }

    if (errors.images?.message) {
      callToast.error(errors.images?.message);
      return;
    }

    callToast.error('Erro ao validar formulário');
  };

  return (
    <form
      className={
        'laptop:sticky laptop:top-[102px] flex flex-col gap-3 justify-between laptop:pl-6 laptop:order-3 laptop:w-[20%] h-min border-l border-gray-200 dark:border-gray-500'
      }
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className={'flex flex-col'}>
        <Title label={'Imagens'} />
        <p className={'flex text-[15px]'}>Arquivos para detecção</p>
      </div>

      <FileDrop
        isMultiple
        hasError={hasError}
        onChange={(newFiles) => {
          const merged = [...(images ?? []), ...(newFiles ?? [])];
          const limited = merged.slice(0, 20);

          if (merged?.length > 20) callToast.error('Selecione no máximo 20 imagens');

          setValue('images', limited, { shouldValidate: true });
        }}
        accept={['image/*']}
      />

      <div className={'flex justify-between'}>
        {images?.length > 0 ? (
          <>
            <p
              onClick={() => setValue('images', [])}
              className={'flex items-center text-[15px] cursor-pointer hover:font-medium'}
            >
              Limpar lista
            </p>
            <p>{images.length}</p>
          </>
        ) : (
          <p className={'flex text-[15px]'}>Nenhum arquivo selecionado</p>
        )}
      </div>

      <ImageModal
        openModalElement={null}
        imageList={imageList ?? []}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        updateIndex={(newIndex) => setActiveIndex(newIndex)}
      />

      <div
        className={
          'grid grid-cols-2 gap-2 content-start overflow-auto tablet:h-[calc(100dvh-398px)] pr-2'
        }
      >
        {imageList?.map((item, index) => {
          return (
            <div
              onClick={() => setActiveIndex(index)}
              id={`${item}-${index}`}
              className={'flex items-center justify-center relative cursor-pointer'}
            >
              <img
                src={item}
                className={'h-[100px] tablet:h-[85px] object-contain rounded-md dark:bg-white'}
              />
              <div
                className={
                  'flex p-0.5 justify-end rounded-md w-full h-full absolute bg-black/5 hover:bg-black/15'
                }
              >
                <Delete
                  className={'cursor-pointer'}
                  sx={{ color: colors.red }}
                  fontSize={'small'}
                  onClick={(event) => {
                    event.stopPropagation();
                    setValue('images', [...(images ?? []).filter((_, index2) => index2 !== index)]);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <FormButton
        label={'Enviar'}
        isSubmitting={isSubmitting}
        loadingText={'Enviar'}
        hideProgress
      />
    </form>
  );
};

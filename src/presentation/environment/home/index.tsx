import { useDetection } from 'data/use-case';
import type { DetectionCreation } from 'domain/models';
import {
  HomeDetectionList,
  HomeImagesPreview,
  HomeYoloList
} from 'presentation/atomic-component/organism/home';
import { useEffect, useState, type FC } from 'react';
import { useAppSelector } from 'store/index';

export const HomeContent: FC = () => {
  const [detectionsCreation, setDetectionsCreation] = useState<DetectionCreation[]>([]);

  const { yoloIdsSelected } = useAppSelector((state) => state.persist);

  const {
    handleSubmit,
    onSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors }
  } = useDetection({
    setDetectionsCreation
  });

  useEffect(() => {
    setValue('yoloIds', yoloIdsSelected, { shouldValidate: yoloIdsSelected?.length > 0 });
  }, [yoloIdsSelected, setValue]);

  const images = watch('images');

  return (
    <div
      className={
        'flex flex-col gap-8 laptop:flex-row laptop:gap-0 laptop:divi de-x divide-gray-200 dark:divide-gray-500'
      }
    >
      <HomeYoloList hasError={!!errors.yoloIds} />
      <HomeImagesPreview
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        setValue={setValue}
        images={images as File[]}
        isSubmitting={isSubmitting}
        hasError={!!errors.images}
      />
      <HomeDetectionList
        detectionsCreation={detectionsCreation}
        setDetectionsCreation={setDetectionsCreation}
      />
    </div>
  );
};

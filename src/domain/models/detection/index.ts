import type { Pagination } from 'domain/protocol';
import type { SelectValues } from 'presentation/atomic-component/atom/select';

interface DetectedObjects {
  class_id: number;
  class_name: string;
  confidence: number;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface DetectionResult {
  yolo_id: string;
  yolo_name: string;
  yolo_path: string;
  detected_objects: DetectedObjects[];
  speed: {
    preprocess_ms: number;
    inference_ms: number;
    postprocess_ms: number;
    total_ms: number;
  };
}

export interface Detection {
  id: string;
  image_path: string;
  image_result_path: string;
  success: boolean;
  user_id: string;
  yolo_id: string;

  result: DetectionResult;

  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface DetectionCreation {
  yolo_id: string;
  yolo_name: string;
  results: Detection[];
}

export interface FindDetectionQuery extends Pagination {
  content: Detection[];
}

export interface DetectionFilter {
  yolo_ids: SelectValues[];
  success: boolean | null;
}

export const detectionFilterInitialState: DetectionFilter = {
  yolo_ids: [],
  success: null
};

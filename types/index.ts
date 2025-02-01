/**
 * @deprecated
 */
export type ActionState = {
  success: boolean;
  error?: string;
  timestamp?: Date;
  content?: string;
};

export interface ActionResult {
  success: boolean;
  message: string;
}

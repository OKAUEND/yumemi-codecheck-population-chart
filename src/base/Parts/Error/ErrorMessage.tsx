import { useErrorState } from '@/src/base/Parts/Error/hook/useErrorState';
import { CallBackProps } from './type/ErrorMessage';
import style from '@/src/base/Parts/Error/style/ErrorMessage.module.scss';

/**
 * エラーコード及びエラーメッセージを表示するコンポーネント
 * @param status
 * @returns
 */
const ErrorMessage = ({ status }: CallBackProps) => {
  const message = useErrorState(status);
  return (
    <section className={style.error_message}>
      <h1>{status ? status : ''}</h1>
      <span>{message.message}</span>
      <span>{message.subMessage}</span>
    </section>
  );
};

/**
 * ErrorMessageを表示させるためのラッパーコンポーネント
 * @param status
 * @returns
 */
export const ErrorBoundaryFallBack = ({ status }: CallBackProps) => {
  return (
    <>
      <ErrorMessage status={status} />
    </>
  );
};

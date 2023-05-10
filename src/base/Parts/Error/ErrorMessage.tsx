import { useErrorState } from '@/src/base/Parts/Error/hook/useErrorState';
import { CallBackProps } from './type/ErrorMessage';
import styles from '@/src/base/Parts/Error/style/ErrorMessage.module.scss';

/**
 * エラーコードによってメッセージを表示させる
 * @param status
 * @returns
 */
const ErrorMessage = ({ status }: CallBackProps) => {
  const message = useErrorState(status);
  return (
    <section className={styles.errorMessage}>
      <h1>{status}</h1>
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

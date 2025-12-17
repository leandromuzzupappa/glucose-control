import styles from "./TrackerError.module.css";
import classNames from "classnames";
import { ReactElement } from "react";
import { TrackerErrorProps } from "./TrackerError.types";
import { useTrackerError } from "./TrackerError.hooks";

export const TrackerError = ({
  className,
}: TrackerErrorProps): ReactElement => {
  const { onRestartApp } = useTrackerError();

  return (
    <div className={classNames(styles.trackerError, className)}>
      <h2>Hubo un error al guardar el nivel de glucosa</h2>
      <h3>Desayuno 133 mg/dL</h3>

      <div className={styles.wrapper}>
        <p>Por favor, cerrá la aplicación e intentá nuevamente.</p>
        <button onClick={onRestartApp}>Volver a cargar</button>
      </div>
    </div>
  );
};

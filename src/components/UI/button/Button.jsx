import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ children, styleBtn, onClick, disabled, loading, icon, size, color, danger }) => {
  const renderChildren = () => {
    if (loading && children) {
      return (
        <span className={styles.loading}>
          <span className={styles.spinner}></span>
          {children}
        </span>
      );
    }

    if (icon && !children && loading) {
      return <span className={styles.spinner}></span>;
    }

    if (icon && !children && !loading) {
      return <>{icon}</>;
    }

    if (icon && children && !loading) {
      return (
        <span className={styles.withIcon}>
          <span className={styles.icon}>{icon}</span>
          <span>{children}</span>
        </span>
      );
    }

    return <>{children}</>;
  };

  return (
    <button
      onClick={!disabled && !loading ? onClick : undefined}
      className={`${styles.button} ${styles[styleBtn]} ${styles[size]} ${styles[color]} ${danger ? styles.danger : ""} ${disabled ? styles.disabled : ""}`}
      disabled={disabled}
    >
      {renderChildren()}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  styleBtn: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.string,
  danger: PropTypes.bool,
};

Button.defaultProps = {
  styleBtn: "styleBtn",
  disabled: false,
  loading: false,
  size: "medium",
  color: "primary",
  danger: false,
};

export default Button;

import css from './Container.module.css';

function Container({ children }) {
  return <div className={css.container}>{children}</div>;
}

export default Container;

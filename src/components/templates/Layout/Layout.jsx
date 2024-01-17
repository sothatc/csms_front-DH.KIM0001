import Footer from 'components/organisms/Footer/Footer';
import Header from 'components/organisms/Header/Header';
import styles from './Layout.module.scss';

const Layout = ({ children, loginCheck }) => {

  return (
    <div className={styles.layout}>
      {loginCheck
        ?
        <>
          <Header childrenElemant={children[1].props.children}/>
          <main>
            {children}
          </main>
        </>
        :
        <>
          <main className={styles.login}>
            {children}
          </main>
        </>
      }
      <Footer />
    </div>
  )
}

export { Layout };

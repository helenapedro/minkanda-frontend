import { Container, Row } from "react-bootstrap";
import styles from "../styles/MainScreen.module.css"

const MainScreen = ({title, children}) => {
     return (
          <div className={styles.main}>
               <Container>
                    <Row>
                         <div className={styles.page}>
                              {title && (
                                   <>
                                        <h1 className={styles.heading}>{title}</h1>
                                        <hr />
                                   </>
                              )}
                              {children}
                         </div>
                    </Row>
               </Container>
          </div>
     )

}

export default MainScreen
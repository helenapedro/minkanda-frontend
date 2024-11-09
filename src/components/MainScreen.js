import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/MainScreen.module.css"

const MainScreen = ({title, children}) => {
     return (
          <Container className={styles.main}>
               <Row className={styles.page}>
                    <Col>
                         {title && (
                              <>
                                   <h1 className={styles.heading}>{title}</h1>
                                   <hr />
                              </>
                         )}
                         {children}
                    </Col>
               </Row>
          </Container>
     )

}

export default MainScreen
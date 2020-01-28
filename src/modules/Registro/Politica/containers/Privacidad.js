import React, { Component } from 'react';
import { Container, Content, Form,Grid,Row, H1} from 'native-base';


class DatosPersonales extends Component{
    render() {
      return (
        <Container>
          <Content>
            <Form>
              <Grid>
                <Row style = {{marginTop: 80, marginBottom: 60, display: 'flex', justifyContent: 'center'}}><H1>Ingresa tu número de teléfono</H1></Row>
              </Grid>       
            </Form>
          </Content>
        </Container>
      );
    }
  }

  export default DatosPersonales
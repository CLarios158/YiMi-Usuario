import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Col, Row, ListItem, Left, Right, Icon} from 'native-base';


class Legal extends Component {
    InformacionPersonal = () =>{
        this.props.navigation.navigate('InformacionPersonal')
    }
    render() {
    return (
      <Container>
        <Content>
            <Grid>
                <Row>
                    <Col>
                    <ListItem>
                        <Left>
                            <Text>AVISO DE PRIVACIDAD</Text>
                        </Left>
                        <Right>
                            <Button transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                        </Right>
                    </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <ListItem>
                        <Left>
                            <Text>TÉRMINOS Y CONDICIONES</Text>
                        </Left>
                        <Right>
                            <Button transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                        </Right>
                    </ListItem>
                    </Col>
                </Row>
            </Grid>
        </Content>
      </Container>
    );
  }
}

export default Legal
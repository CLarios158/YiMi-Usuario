import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Col, Row, Icon, ListItem, Left, Right, Header, Body, Title, CardItem, Card} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'


class Pago extends Component {

    addCash = () =>{
        this.props.navigation.navigate('Efectivo')
    }

    backHome = () =>{
        this.props.navigation.navigate('Inicio')
    }

    addCard = () =>{
        this.props.navigation.navigate('Tarjeta');
    }

    aboutPay = () =>{
        this.props.navigation.navigate('InformacionPago');
    }

    render() {
        return (
            <Container>
                <Content>
                    <Header style={{marginTop:24, backgroundColor: 'white', borderBottomColor:'lightgray' ,borderBottomWidth:0.5}}>
                        <Left>
                            <Button transparent style={{width:40, height:40}}>
                                <FontAwesome5 onPress={this.backHome} name='times' size={20} style={{color:'black'}}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{color:'black'}}>Métodos de Pago</Title>
                        </Body>
                    </Header>
                    <Grid>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row style={{marginLeft:18}}>
                                                <Col style={{width:130, marginTop:11}}>
                                                    <Text style={{fontWeight: 'bold'}}>Métodos de pago</Text>
                                                </Col>
                                                <Col>
                                                    <Button onPress={this.aboutPay} transparent><FontAwesome5 name='question-circle' size={15} style={{color:'#ff8834'}} /></Button>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <ListItem>
                                                        <Left>
                                                            <FontAwesome5 name='money-bill-alt' size={25} style={{color:'#ff8834'}}/>
                                                            <Text>   Efectivo</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.addCash} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0}}>
                                                        <Left>
                                                            <Button transparent><FontAwesome5 name='plus' size={25} style={{color:'#ff8834'}}/></Button>
                                                            <Text>   Agrega método de pago {"\n"}<Text style={{color:'gray'}}>   Tarjeta crédito / débito</Text></Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.addCard} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row style={{marginLeft:18, marginTop:15}}>
                                                <Col>
                                                    <Text style={{fontWeight: 'bold'}}>Promoción</Text>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0}}>
                                                        <Left>
                                                            <FontAwesome5 name='ticket-alt' size={25} style={{color:'#ff8834'}}/>
                                                            <Text>   Cupones</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default Pago;



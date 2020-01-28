import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {ListItem, Left, Body, Thumbnail, Icon} from 'native-base';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      id_usuario: global.ID,
      array:[],
      nombre:'',
      telefono: ''
      
    };
  }

  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
        axios.post('http://35.203.42.33:3000/consultar_contacto_confianza',{id_usuario: this.state.id_usuario})
        .then(response =>  {
            response.data.data.forEach(element => {
                console.log('entro')
                this.state.array.push({'nombre': element['nombre_contacto_out'],"telefono":element['telefono_out']});
                this.setState({isLoading: true})
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    });
  }

  addContact = () =>{
    this.setState({array: []});
    this.props.navigation.navigate('AgregarContacto');
  }

  componentWillUnmount(){
    this.focusListener.remove();
  }

  renderItem = ({ item:{nombre, telefono}}) => (
    <View style={{flex:1}}>
        <ListItem avatar>
            <Left>
                <Thumbnail source={{ uri: 'https://www.webespacio.com/wp-content/uploads/2010/12/perfil-facebook.jpg' }} />
            </Left>
            <Body>
                <Text style={{fontWeight:'bold'}}>{nombre}</Text>
                <Text note>{`${telefono}`}</Text>
            </Body>
        </ListItem>
    </View>
  );


  render() {
    if(this.state.isLoading == true){
        return (
            <View>
                <FlatList
                    data={this.state.array}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => (
                    <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10}}>
                        <ActivityIndicator size={45} color="#ff8834" />
                    </View>
                    )}
                    ListFooterComponent={() => (
                        <View>
                            <ListItem>
                                <Left>
                                    <Icon name='md-person-add' style={{ fontSize: 20 }} /> 
                                    <Text onPress={this.addContact} style={{fontSize:15, fontWeight:'bold'}}>   Agregar Contactos de Confianza</Text>
                                </Left>
                            </ListItem> 
                        </View>
                    )}
                />  
            </View>
        );
    }else{
        return(
            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10}}>
                 <ActivityIndicator size={80} color="#ff8834" />
            </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

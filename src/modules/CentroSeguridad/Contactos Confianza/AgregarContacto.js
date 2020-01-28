import React from 'react';
import {StyleSheet, Text, View, TextInput,SafeAreaView,FlatList, ActivityIndicator} from 'react-native';
import {Root, ListItem, Left, Body, Right, Thumbnail, Radio, ActionSheet} from 'native-base';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

var BUTTONS = [{text: "Agregar Contacto", icon: "md-add-circle-outline", iconColor: "green"}];
var nombreC = '';
var phoneC='';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      id_usuario: global.ID,
      selected: -1,
      nombre: '',
      telefono: '',
      contacts: []
    };
  }

  loadContacts = async () => {
    const permission = await Permissions.askAsync(
      Permissions.CONTACTS
    );

    if (permission.status !== 'granted') {
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
    });

    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadContacts();
  }

  handleClick (index, name, phone){ 
    this.setState({selected: index});
    nombreC = name;
    phoneC = phone.replace(/ /g, "");
  }

  addContact  = () =>{
    axios.post('http://35.203.42.33:3000/registrar_contacto_confianza',
    {nombre_contacto:nombreC, num_telefono: phoneC, id_usuario: this.state.id_usuario})
    .then(response =>  {
        this.setState({selected:-1});
        this.props.navigation.navigate('ListaContacto');
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
  }

  renderItem = ({ item:{firstName, phoneNumbers}, index}) => (
    <Root>
      <View style={{flex:1}}>
        <ListItem avatar>
          <Left>
            <Thumbnail source={{ uri: 'https://www.webespacio.com/wp-content/uploads/2010/12/perfil-facebook.jpg' }} />
          </Left>
          <Body>
            <Text style={{fontWeight:'bold'}}>{firstName}</Text>
            <Text note>{`${phoneNumbers ? phoneNumbers.map(entry => entry.number)[0] : "" }`}</Text>
          </Body>
          <Right style={{alignSelf:'center'}}>
              <Radio onPress={() => {this.handleClick(index, firstName, phoneNumbers ? phoneNumbers.map(entry => entry.number)[0] : "");
              ActionSheet.show(
              {
                  options: BUTTONS
              },
              buttonIndex => {
                  if(buttonIndex == 0){
                    this.addContact();
                  }
              }
              );}}  selected={this.state.selected == index} style={{paddingRight: 5, marginTop:15}} />
          </Right>
        </ListItem>
      </View>
    </Root>
  );

  searchContacts = value => {
    const filteredContacts = this.state.inMemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.firstName +
        ' ' +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: 'white' }} />
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="gray"
          style={{
            marginTop:2,
            backgroundColor: 'white',
            height: 50,
            fontSize: 20,
            padding: 10,
            color: 'black',
            borderBottomWidth: 0.5,
            borderBottomColor: '#7d90a0'
          }}
          onChangeText={value => this.searchContacts(value)}
        />
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ActivityIndicator size="large" color="#ff8834" />
            </View>
          ) : null}
          <View>
            <FlatList
                data={this.state.contacts}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                <View
                    style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50
                    }}
                >
                    <Text>No Contacts Found</Text>
                </View>
                )}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
